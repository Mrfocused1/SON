# SON Networks Website

A modern, animated Next.js website for SON Networks - a digital production house creating internet entertainment.

## Features

- Responsive design with custom animations using GSAP
- Custom cursor effects
- Video modal for YouTube content
- Functional contact and pitch forms (via Resend)
- Page preloader and transitions
- Tailwind CSS styling

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Icons**: Lucide React
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/son-networks.git
cd son-networks
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Add your environment variables:
```env
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
PITCH_EMAIL=your-pitch-email@example.com
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In your Vercel project settings, add:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key from [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Email address to receive contact form submissions |
| `PITCH_EMAIL` | Email address to receive pitch submissions |

### Step 4: Deploy

Click "Deploy" and Vercel will build and deploy your site.

## Setting Up Email (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. (Optional) Add and verify your custom domain for branded emails
4. Add the API key to your environment variables

**Note**: Without a verified domain, emails will be sent from `onboarding@resend.dev`. To use your own domain (e.g., `hello@sonnetworks.com`), verify it in Resend's dashboard.

## Connecting a Custom Domain

1. In Vercel, go to your project → Settings → Domains
2. Add your domain (e.g., `sonnetworks.com`)
3. Update your DNS settings:
   - For apex domain: Add an `A` record pointing to `76.76.21.21`
   - For `www` subdomain: Add a `CNAME` record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (usually 1-48 hours)

## Project Structure

```
son-networks/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   └── pitch/route.ts
│   │   ├── contact/page.tsx
│   │   ├── join/page.tsx
│   │   ├── shows/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── Marquee.tsx
│   │   ├── Navbar.tsx
│   │   ├── Preloader.tsx
│   │   ├── VideoCard.tsx
│   │   └── VideoModal.tsx
│   └── context/
│       └── VideoModalContext.tsx
├── .env.example
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

© 2025 SON Networks LLC. All Rights Reserved.
