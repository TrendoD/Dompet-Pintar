import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, honeypot } = req.body;

    // Check honeypot field (anti-bot measure)
    if (honeypot) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate
    const existingSignup = await kv.get(`waitlist:email:${normalizedEmail}`);
    if (existingSignup) {
      return res.status(400).json({ error: 'Email already on waitlist' });
    }

    // Get client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const rateLimitKey = `ratelimit:${clientIp}`;
    const currentHour = new Date().getHours();
    
    // Check rate limit (5 signups per IP per hour)
    const rateLimitData = await kv.get(rateLimitKey);
    if (rateLimitData && rateLimitData.hour === currentHour && rateLimitData.count >= 5) {
      return res.status(429).json({ error: 'Too many signups. Please try again later.' });
    }

    // Store signup
    const timestamp = new Date().toISOString();
    const signupData = {
      email: normalizedEmail,
      timestamp,
      source: req.headers.referer || 'direct',
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    // Store email to prevent duplicates
    await kv.set(`waitlist:email:${normalizedEmail}`, timestamp);

    // Get current waitlist
    const currentList = await kv.get('waitlist:list') || [];
    currentList.push(signupData);
    await kv.set('waitlist:list', currentList);

    // Increment counter
    const currentCount = await kv.get('waitlist:count') || 0;
    await kv.set('waitlist:count', currentCount + 1);

    // Update rate limit
    if (!rateLimitData || rateLimitData.hour !== currentHour) {
      await kv.set(rateLimitKey, { hour: currentHour, count: 1 }, { ex: 3600 });
    } else {
      await kv.set(rateLimitKey, { hour: currentHour, count: rateLimitData.count + 1 }, { ex: 3600 });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully joined waitlist',
      position: currentCount + 1
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Failed to process signup' });
  }
}