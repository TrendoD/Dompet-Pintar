# Waitlist Feature Documentation

## Overview
This feature implements a waitlist signup system for DompetPintar without using a traditional database. It uses Vercel KV (Key-Value storage) to store user signups and provides an admin panel to view registrations.

## Setup Instructions

### 1. Enable Vercel KV Storage
1. Go to your Vercel dashboard
2. Select your DompetPintar project
3. Navigate to the "Storage" tab
4. Click "Create Database" and select "KV"
5. Follow the setup wizard
6. Vercel will automatically add the required environment variables

### 2. Set Admin Password
Add the following environment variable in Vercel:
```
ADMIN_PASSWORD=your-secure-password-here
```

### 3. Deploy
Push your changes to trigger a new deployment. The serverless functions in the `/api` directory will be automatically deployed.

## Features

### User-Facing Features
- **Waitlist Modal**: Clean signup form with email validation
- **Live Counter**: Shows current waitlist count on landing page
- **Anti-Spam**: Honeypot field and rate limiting (5 signups per IP per hour)
- **Responsive Design**: Works on all devices

### Admin Features
- **Admin Panel**: Access at `/admin` with password protection
- **Dashboard**: View total signups, today's count, and growth rate
- **Daily Analytics**: Simple bar chart showing last 7 days
- **Export**: Download all signups as CSV
- **Auto-Refresh**: Data updates every 30 seconds

## API Endpoints

### `/api/signup` (POST)
Handles new waitlist registrations
- Validates email format
- Prevents duplicates
- Rate limiting per IP
- Returns position in waitlist

### `/api/count` (GET)
Returns current waitlist count
- Cached for 1 minute
- Fallback on errors

### `/api/admin` (POST)
Admin operations:
- `action: "getSignups"` - Get all signup data
- `action: "exportCSV"` - Export as CSV
- `action: "clearWaitlist"` - Clear all data (use carefully!)

## Local Development

### Without Vercel KV
For local development without KV, you can:
1. Mock the API responses in the frontend
2. Use a local JSON file to store signups
3. Set up a local Redis instance

### With Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull

# Run development server
vercel dev
```

## Security Considerations
- Admin password stored as environment variable
- Rate limiting prevents spam
- Honeypot field catches bots
- Email validation on both client and server
- CORS headers configured

## Data Structure
```
waitlist:count -> number
waitlist:email:{email} -> timestamp
waitlist:list -> [{
  email: string,
  timestamp: string,
  source: string,
  userAgent: string
}]
```

## Monitoring
- Check Vercel Functions logs for errors
- Monitor KV usage in Vercel dashboard
- Admin panel shows real-time metrics

## Future Enhancements
- Email confirmation system
- Referral tracking
- A/B testing different CTAs
- Integration with email marketing tools
- Webhook notifications for new signups