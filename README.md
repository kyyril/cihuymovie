# 🎬 Cihuy Movie

A modern web application for discovering and organizing popular movies and TV shows, featuring trending content and personalized watchlists.

## 📋 Overview

Cihuy Movie is a comprehensive entertainment discovery platform that allows users to explore trending movies and TV shows, search for specific content, and maintain a personal watchlist. The application provides daily and weekly trending lists, detailed content information, and seamless user authentication.

## ✨ Features

- **📈 Trending Lists**: Daily and weekly popular movies and TV shows
- **🔍 Discovery Pages**: Browse extensive content catalog with pagination
- **🔎 Search Functionality**: Quickly find movies or TV shows
- **👤 User Authentication**: Secure Firebase Authentication
- **📚 Personal Watchlist**: Save and organize your favorite content
- **📱 Responsive Design**: Modern UI built with ChakraUI
- **🎥 Detailed Information**: View cast, crew, and video content

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router
- **State Management**: React Context API
- **Build Tool**: Vite
- **UI Library**: ChakraUI
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **HTTP Client**: Axios
- **API**: The Movie Database (TMDb)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDb API Key
- Firebase project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kyyril/cihuymovie.git
   cd cihuymovie
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_KEY=your_tmdb_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
cihuy-movie/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API services and Firebase config
│   ├── context/            # React Context providers
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json
└── README.md
```

## 🔧 API Services

### TMDb Integration

The application integrates with The Movie Database (TMDb) API to fetch:

- Trending movies and TV shows (daily/weekly)
- Movie and TV show details
- Cast and crew information
- Video trailers and clips
- Search results
- Discovery content with sorting options

### Firebase Integration

Utilizes Firebase services for:

- **Authentication**: User registration and login
- **Firestore**: Storing user watchlists

## 🎯 Key Features Detail

### Trending Content

- Daily and weekly trending movies and TV shows
- Real-time data from TMDb API
- Responsive grid layout with pagination

### Search & Discovery

- Multi-search functionality (movies, TV shows, people)
- Advanced filtering and sorting options
- Pagination for large result sets

### Watchlist Management

- Add/remove items from personal watchlist
- Persistent storage with Firebase Firestore
- Real-time synchronization across sessions

### User Authentication

- Secure Firebase Authentication
- User session management
- Protected routes for authenticated features

## 📱 Responsive Design

Built with ChakraUI for a consistent and responsive user experience across all devices:

- Mobile-first approach
- Flexible grid layouts
- Accessible UI components

## 🔒 Security

- Environment variables for sensitive data
- Firebase security rules
- Authenticated API requests
- Input validation and sanitization

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Firebase Hosting**: Use Firebase CLI for deployment

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie and TV show data
- [Firebase](https://firebase.google.com/) for authentication and database services
- [ChakraUI](https://chakra-ui.com/) for the component library
- [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) communities
