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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get current count from KV storage
    const count = await kv.get('waitlist:count') || 0;

    // Cache response for 1 minute to reduce KV requests
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json({ 
      success: true,
      count: count,
      // Add some marketing copy
      message: count > 0 ? `Join ${count.toLocaleString()} others on the waitlist` : 'Be the first to join!'
    });

  } catch (error) {
    console.error('Count error:', error);
    // Return a default count on error to not break the UI
    return res.status(200).json({ 
      success: false,
      count: 0,
      message: 'Join our waitlist'
    });
  }
}