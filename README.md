# Vibe2APK - Web to Android APK Converter SaaS

A premium SaaS platform that converts web applications into native Android APK/AAB files in minutes. Built with Next.js 14, Supabase, and a modern cyber-industrial design system.

## 🚀 Features

### Core Functionality
- **Multiple Input Methods**: Convert from URL, GitHub repository, or ZIP file upload
- **Dual Format Output**: Generate both APK and AAB files for Play Store submission
- **Real-time Build Tracking**: Monitor build progress with live status updates and detailed logs
- **Build History**: Complete history of all builds with filtering and detailed information
- **Plan-based Limits**: Free tier with 5 builds/day, Pro tier with 50 builds/day, Business tier with unlimited builds

### User Experience
- **Premium Design System**: Cyber-industrial aesthetic with glassmorphism, gradient meshes, and smooth animations
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Intuitive Dashboard**: Clean dashboard with stats overview and quick actions
- **Authentication**: Email/password authentication with Supabase
- **Custom Permissions**: Fine-tune Android permissions for your specific use case

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter, Space Grotesk, JetBrains Mono

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Real-time subscriptions
- **Server Actions**: Next.js Server Actions

### Design System
- **Primary Color**: Electric Violet (#8b5cf6)
- **Secondary Color**: Cyan Pulse (#06b6d4)
- **Background**: Deep Obsidian (#0a0a0f)
- **Effects**: Glassmorphism 2.0, gradient meshes, grid patterns
- **Animations**: Reveal, float, pulse, and magnetic effects

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/fahad-mumtaz/Web-to-Apk-Build.git
cd Web-to-Apk-Build
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up Supabase database**
Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor.

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
├── app/                      # Next.js app directory
│   ├── (public)/            # Public routes
│   │   ├── page.tsx         # Landing page
│   │   ├── login/           # Login page
│   │   └── pricing/         # Pricing page
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── page.tsx         # Dashboard overview
│   │   ├── new-build/       # Create new build
│   │   ├── history/         # Build history
│   │   └── builds/[id]/     # Build details
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── animations/         # Animation components
│   ├── landing/            # Landing page sections
│   └── ...
├── lib/                     # Utility libraries
│   ├── supabaseClient.ts   # Client-side Supabase
│   ├── supabaseServer.ts   # Server-side Supabase
│   ├── actions/            # Server actions
│   └── types.ts            # TypeScript types
├── supabase/               # Supabase configuration
│   └── schema.sql          # Database schema
└── middleware.ts           # Next.js middleware
```

## 🎨 Design System

### Color Palette
- **Primary**: Electric Violet (#8b5cf6)
- **Secondary**: Cyan Pulse (#06b6d4)
- **Success**: Emerald (#10b981)
- **Warning**: Amber Glow (#f59e0b)
- **Background**: Deep Obsidian (#0a0a0f)

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- **Code**: JetBrains Mono

### Components
- **Glass Cards**: Frosted glass effect with noise texture
- **Gradient Text**: Smooth gradient text effects
- **Magnetic Buttons**: Interactive buttons that follow cursor
- **3D Cards**: Cards with 3D perspective effects
- **Reveal Animations**: Scroll-triggered reveal animations

## 📄 Pages

### Public Pages
- **Landing Page**: Premium landing page with 8 unique sections
- **Login**: Email/password authentication
- **Pricing**: Three-tier pricing structure

### Dashboard Pages
- **Dashboard**: Overview with stats and recent builds
- **New Build**: Create new APK build with multiple input methods
- **Build History**: View and filter all builds
- **Build Details**: Detailed build information and logs

## 🔐 Authentication

Currently supports email/password authentication via Supabase. Google OAuth integration is planned for future updates.

## 🗄️ Database Schema

### Tables
- **profiles**: User profiles and plan information
- **builds**: Build records with status and metadata
- **build_logs**: Build process logs

### Row Level Security (RLS)
All tables are protected with RLS policies to ensure data security.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify
- Railway
- Render
- Any Node.js hosting platform

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the excellent backend services
- shadcn/ui for the beautiful UI components
- Vercel for the hosting platform

## 📞 Support

For support, email fahadmumtaz042@gmail.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**
