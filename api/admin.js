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
    const { password, action } = req.body;

    // Check admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured');
      return res.status(500).json({ error: 'Admin access not configured' });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid admin password' });
    }

    // Handle different admin actions
    switch (action) {
      case 'getSignups': {
        const signups = await kv.get('waitlist:list') || [];
        const count = await kv.get('waitlist:count') || 0;

        // Calculate daily stats
        const today = new Date().toISOString().split('T')[0];
        const todaySignups = signups.filter(s => s.timestamp.startsWith(today)).length;

        // Group by date for analytics
        const signupsByDate = {};
        signups.forEach(signup => {
          const date = signup.timestamp.split('T')[0];
          signupsByDate[date] = (signupsByDate[date] || 0) + 1;
        });

        return res.status(200).json({
          success: true,
          data: {
            totalCount: count,
            todayCount: todaySignups,
            signups: signups.sort((a, b) => 
              new Date(b.timestamp) - new Date(a.timestamp)
            ),
            dailyStats: signupsByDate
          }
        });
      }

      case 'exportCSV': {
        const signups = await kv.get('waitlist:list') || [];
        
        // Create CSV content
        const csvHeader = 'Email,Signup Date,Time,Source\n';
        const csvRows = signups.map(s => {
          const date = new Date(s.timestamp);
          return `"${s.email}","${date.toLocaleDateString()}","${date.toLocaleTimeString()}","${s.source}"`;
        }).join('\n');

        const csvContent = csvHeader + csvRows;

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="waitlist-export.csv"');
        return res.status(200).send(csvContent);
      }

      case 'clearWaitlist': {
        // Optional: Clear waitlist (use with caution!)
        if (req.body.confirmClear === true) {
          const signups = await kv.get('waitlist:list') || [];
          
          // Clear all email keys
          for (const signup of signups) {
            await kv.del(`waitlist:email:${signup.email}`);
          }
          
          // Clear list and reset counter
          await kv.set('waitlist:list', []);
          await kv.set('waitlist:count', 0);

          return res.status(200).json({ 
            success: true, 
            message: 'Waitlist cleared successfully' 
          });
        }
        return res.status(400).json({ 
          error: 'Please confirm clear action' 
        });
      }

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

  } catch (error) {
    console.error('Admin error:', error);
    return res.status(500).json({ error: 'Failed to process admin request' });
  }
}