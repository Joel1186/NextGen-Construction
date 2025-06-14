# NextGen Construction Management Platform

A comprehensive Next.js application for construction project management, featuring user authentication, project tracking, estimate generation, and client management.

## Features

- **User Authentication**: Secure registration, login, and logout with JWT tokens
- **Project Management**: Track construction projects from start to finish
- **Estimate Generation**: Create professional estimates with itemized pricing
- **Client Management**: Manage client information and communication
- **Responsive Design**: Modern, mobile-friendly interface
- **Database Integration**: PostgreSQL database with Neon serverless
- **Dashboard Analytics**: Overview of projects, revenue, and key metrics

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: JWT tokens with HTTP-only cookies
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Vercel account (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd nextgen-construction-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your actual values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `NEXTAUTH_URL`: Your application URL

4. Initialize the database:
\`\`\`bash
# Run the SQL scripts in the scripts folder
# You can execute these directly in your database console
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## Database Setup

The application uses PostgreSQL with the following tables:
- `users`: User accounts and authentication
- `projects`: Construction projects
- `estimates`: Project estimates and quotes
- `estimate_items`: Itemized estimate details

Run the SQL scripts in the `scripts/` folder to set up your database:
1. `init-database.sql` - Creates tables and indexes
2. `seed-data.sql` - Adds sample data for testing

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXTAUTH_URL`
4. Deploy

The application is configured for Vercel deployment with:
- Automatic builds on push
- Environment variable management
- Serverless function optimization

## Project Structure

\`\`\`
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── dashboard-layout.tsx
├── lib/
│   └── utils.ts           # Utility functions
├── scripts/
│   ├── init-database.sql  # Database initialization
│   └── seed-data.sql      # Sample data
├── middleware.ts          # Route protection
└── package.json
\`\`\`

## Running Tests

The project uses [Vitest](https://vitest.dev/) for unit testing. Make sure
dependencies are installed with `npm install` (or `pnpm install`) and then run:

```bash
npm test
```

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

## Security Features

- Password hashing with bcrypt
- JWT tokens with HTTP-only cookies
- Route protection with middleware
- Input validation and sanitization
- CSRF protection
- Secure headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact [your-email@example.com]
