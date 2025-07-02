# JIT-SIS (Student Information System)

A modern Student Information System built with Next.js, designed to manage student data, courses, and academic records.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later (comes with Node.js)
- Git
- (Optional) Docker (for containerized development)

### 🛠 Installation

#### macOS / Linux

```bash
# Clone the repository
git clone https://github.com/your-org/jit-sis.git
cd jit-sis

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Start the development server
npm run dev
```

#### Windows

```powershell
# Clone the repository
git clone https://github.com/your-org/jit-sis.git
cd jit-sis

# Install dependencies
npm install

# Set up environment variables
copy .env.local.example .env.local

# Start the development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL=your-database-connection-string
```

## 🚀 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
jit-sis/
├── .github/           # GitHub workflows and templates
├── components/        # Reusable UI components
├── lib/               # Utility functions and configurations
├── pages/             # Application routes and pages
├── prisma/            # Database schema and migrations
├── public/            # Static files
├── styles/            # Global styles
├── tests/             # Test files
├── .env.local         # Local environment variables
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Git ignore file
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## 🐛 Troubleshooting

### Common Issues

1. **Node.js Version Mismatch**
   - Ensure you're using Node.js 18.0.0 or later
   - Use `node -v` to check your version
   - Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions

2. **Dependency Installation Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm cache clean --force`
   - Run `npm install` again

3. **Environment Variables Not Loading**
   - Ensure `.env.local` exists in the root directory
   - Make sure variable names in `.env.local` match those in the code
   - Restart your development server after making changes

4. **Database Connection Issues**
   - Verify your database is running
   - Check the connection string in `.env.local`
   - Run database migrations if needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by JIT Team
</div>