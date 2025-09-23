# RecommendX 🎬📚

A modern React-based recommendation platform for discovering Indian movies and literature across multiple regional languages.

## 🌟 Features

### 🎬 Movie Discovery
- **Indian Cinema Focus**: Comprehensive collection of movies across regional languages
- **Smart Recommendations**: Personalized suggestions based on viewing history
- **Language Filtering**: Support for 12+ Indian languages including Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, and more
- **Rich Movie Details**: Ratings, trailers, cast information, and user reviews
- **Search & Discovery**: Advanced search functionality with filters

### 📚 Book Recommendations
- **Indian Literature**: Curated collection of books in various Indian languages
- **Genre-based Discovery**: Fiction, non-fiction, poetry, and regional literature
- **Book Details**: Author information, ratings, descriptions, and preview links
- **Reading History**: Track your reading journey

### 🎨 User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Recently Viewed**: Keep track of your browsing history
- **Multi-language Support**: Content discovery in your preferred language
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🚀 Live Demo

Visit the live application: [RecommendX](https://pavansury.github.io/RecommendX/)

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast build tooling and development
- **React Router v6** for client-side routing
- **Framer Motion** for smooth animations and transitions
- **Tailwind CSS** for responsive styling
- **Lucide React** for modern iconography

### APIs & Data
- **TMDB API** - Comprehensive movie database
- **Google Books API** - Extensive book catalog
- **Axios** for HTTP client functionality

### Development Tools
- **TypeScript** for static type checking
- **ESLint** for code quality and consistency
- **PostCSS** with Autoprefixer for CSS processing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pavansury/RecommendX.git
   cd RecommendX
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Add your API keys (optional - demo keys included)
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages
The project is configured for GitHub Pages deployment:
```bash
npm run build
# The built files will be in the 'docs' folder
# Push to main branch to trigger GitHub Pages deployment
```

## 🗂️ Project Structure

```
RecommendX/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── books/         # Book-specific components
│   │   ├── movies/        # Movie-specific components
│   │   ├── common/        # Shared components
│   │   └── layout/        # Layout components
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route components
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── docs/                  # Built files for GitHub Pages
├── package.json
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🌍 Supported Languages

RecommendX supports content discovery in the following Indian languages:

- **Hindi** (हिन्दी)
- **Tamil** (தமிழ்)
- **Telugu** (తెలుగు)
- **Kannada** (ಕನ್ನಡ)
- **Malayalam** (മലയാളം)
- **Bengali** (বাংলা)
- **Marathi** (मराठी)
- **Gujarati** (ગુજરાતી)
- **Punjabi** (ਪੰਜਾਬੀ)
- **Odia** (ଓଡ଼ିଆ)
- **Assamese** (অসমীয়া)
- **English**

## 🔧 Configuration

### API Keys
The application uses two main APIs:
- **TMDB API**: For movie data and recommendations
- **Google Books API**: For book information and search

### Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and TypeScript conventions
- Add proper type definitions for new features
- Test your changes across different screen sizes
- Ensure all language filters work correctly
- Add appropriate error handling

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB** for providing comprehensive movie data
- **Google Books** for extensive book catalog
- **The React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Contact

**Pavan Sury** - [@pavansury](https://github.com/pavansury)

Project Link: [https://github.com/pavansury/RecommendX](https://github.com/pavansury/RecommendX)

---

⭐ **Star this repository if you found it helpful!**
