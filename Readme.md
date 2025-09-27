# NotesApp

A full-stack note-taking application built with React, Node.js, Express, and MongoDB. This application allows users to create, manage, and organize their notes with features like authentication, real-time updates, and organization-based access.

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication with refresh tokens
  - Role-based access control

- **Note Management**
  - Create and edit notes
  - Rich text content
  - Status management (active, archived, deleted)
  - Real-time updates

- **Organization Features**
  - Organization-based note sharing
  - User management within organizations
  - Collaborative note access

- **Modern UI/UX**
  - Responsive design
  - Interactive card-based interface
  - Clean and intuitive layout
  - Toast notifications for actions

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Cookie-based token management
- Express middleware for route protection

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/chetansahu25/NotesApp.git
cd NotesApp
```

2. **Set up environment variables**

Create `.env` files in both client and server directories:

For server (`/server/.env`):
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:5173
```

For client (`/client/.env`):
```env
VITE_BACKEND_URL=http://localhost:3000
```

3. **Install dependencies**

For backend:
```bash
cd server
npm install
```

For frontend:
```bash
cd client
npm install
```

4. **Start the application**

Start the backend server:
```bash
cd server
npm run dev
```

Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Project Structure

```
NotesApp/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── dao/          # Data Access Objects
│   │   ├── middlewares/  # Express middlewares
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── index.js          # Entry point
```

## API Documentation

For detailed API documentation, please refer to [API Documentation](./API%20Documentation.md).

## Core Functionality

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Automatic token refresh
- Protected routes and API endpoints

### Notes Management
- Create new notes with title and content
- Edit existing notes
- Change note status (active/archived/deleted)
- View note history and metadata
- Delete notes (soft delete)

### Organization Features
- Create and join organizations
- Share notes within organizations
- Manage organization members
- Role-based permissions

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- HTTP-only cookies for refresh tokens
- CORS protection
- Rate limiting
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Chetan Kumar Sahu - [@chetansahu25](https://github.com/chetansahu25)

Project Link: [https://github.com/chetansahu25/NotesApp](https://github.com/chetansahu25/NotesApp)

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
