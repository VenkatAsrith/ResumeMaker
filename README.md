# Resume Maker

A professional resume builder application with MongoDB backend, featuring multiple templates, real-time preview, and PDF export.

![Resume Maker](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

- **Professional Templates** - Choose from 3 beautifully designed templates:
  - Modern Blue - Clean and modern with blue accents
  - Minimal Black - Elegant minimalist design
  - Classic Left - Traditional layout with sidebar

- **Easy Input** - Intuitive form-based input with collapsible sections
- **Smart "NA" Handling** - Enter "NA" in any field to exclude it from the final resume
- **Live Preview** - See changes in real-time as you type
- **Responsive Design** - Works on desktop and mobile devices
- **User Authentication** - Secure login/register with JWT
- **Auto-Save** - Changes are automatically saved after 2 seconds
- **PDF Export** - Download your resume as a PDF file

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads

### Frontend
- **React 18** with Vite
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **react-to-print** for PDF export

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/resume_maker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

> ⚠️ If your password contains special characters like `@`, URL-encode them (e.g., `@` → `%40`)

### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Open Browser
Navigate to **http://localhost:5173**

---

## 📦 Deployment

### Option 1: Render.com (Recommended - Free Tier)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/resume-maker.git
   git push -u origin main
   ```

2. **Deploy Backend**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Settings:
     - **Name**: resume-maker-api
     - **Root Directory**: backend
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add Environment Variables:
     - `NODE_ENV` = production
     - `MONGODB_URI` = your MongoDB Atlas connection string
     - `JWT_SECRET` = your secret key
     - `FRONTEND_URL` = your frontend URL (add after deploying frontend)

3. **Deploy Frontend**
   - Click "New" → "Static Site"
   - Connect same repo
   - Settings:
     - **Name**: resume-maker-frontend
     - **Root Directory**: frontend
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: dist
   - Add Environment Variable:
     - `VITE_API_URL` = your backend URL + /api (e.g., https://resume-maker-api.onrender.com/api)

### Option 2: Railway.app

1. **Create New Project** on [Railway](https://railway.app)
2. **Add MongoDB** service from Railway's plugin marketplace
3. **Deploy from GitHub**
4. Set environment variables in Railway dashboard

### Option 3: Heroku

1. Install Heroku CLI
2. Deploy:
   ```bash
   heroku create resume-maker-app
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   git push heroku main
   ```

### Option 4: Docker

```bash
# Build image
docker build -t resume-maker .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=your_mongodb_uri \
  -e JWT_SECRET=your_secret \
  -e NODE_ENV=production \
  resume-maker
```

### Option 5: VPS (DigitalOcean, AWS, etc.)

```bash
# On your server
git clone https://github.com/yourusername/resume-maker.git
cd resume-maker

# Install dependencies
cd backend && npm install
cd ../frontend && npm install && npm run build

# Create .env file
cp backend/.env.example backend/.env
# Edit .env with your values

# Start with PM2 (recommended)
npm install -g pm2
cd backend
pm2 start server.js --name resume-maker
pm2 save
```

---

## 📁 Project Structure

```
resume-maker/
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── models/
│   │   ├── User.js         # User model
│   │   └── Resume.js       # Resume model
│   ├── routes/
│   │   ├── auth.js         # Auth endpoints
│   │   ├── resumes.js      # Resume CRUD
│   │   └── templates.js    # Template endpoints
│   ├── uploads/            # Uploaded photos
│   ├── .env                # Environment variables
│   ├── .env.example        # Environment template
│   ├── package.json
│   └── server.js           # Express server
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── templates/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── .dockerignore
├── Dockerfile
├── Procfile              # Heroku
├── render.yaml           # Render.com
├── vercel.json           # Vercel
└── README.md
```

## 🔒 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | No (uses /api if not set) |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resumes` - Get all user's resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/photo` - Upload profile photo

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get single template

### Health Check
- `GET /api/health` - Check API status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas (Network Access → Add IP Address → Add Current IP)
- Check if the password is URL-encoded if it contains special characters
- Verify the connection string format

### CORS Errors
- Set `FRONTEND_URL` environment variable in backend
- Ensure the frontend URL matches exactly (including http/https)

### Build Failures
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 18+

---

Made with ❤️ by Resume Maker Team
