# Resume Maker

A professional resume builder application with MongoDB backend, featuring multiple templates, real-time preview, and PDF export.

## Features

✨ **Professional Templates** - Choose from 3 beautifully designed templates:
- Modern Blue - Clean and modern with blue accents
- Minimal Black - Elegant minimalist design
- Classic Left - Traditional layout with sidebar

📝 **Easy Input** - Intuitive form-based input with collapsible sections

🚫 **Smart "NA" Handling** - Enter "NA" in any field to exclude it from the final resume

👁️ **Live Preview** - See changes in real-time as you type

📱 **Responsive Design** - Works on desktop and mobile devices

🔐 **User Authentication** - Secure login/register with JWT

💾 **Auto-Save** - Changes are automatically saved after 2 seconds of inactivity

📄 **PDF Export** - Download your resume as a PDF file

## Tech Stack

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

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   cd resume-maker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment**
   
   Edit `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resume_maker
   JWT_SECRET=your_secure_secret_key
   NODE_ENV=development
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser** at `http://localhost:5173`

## Usage

1. **Create Account** - Sign up with email and password
2. **Create Resume** - Click "Create New Resume" on the dashboard
3. **Fill Details** - Enter your information in the form sections
4. **Choose Template** - Select a template that fits your style
5. **Preview** - Toggle preview mode to see the final result
6. **Download** - Click "Download PDF" to save your resume

### NA Field Handling

To exclude any field from your resume:
- Type "NA" in the field
- The field will appear grayed out with strikethrough
- It will be automatically hidden in the final resume

## Project Structure

```
resume-maker/
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── User.js         # User model
│   │   └── Resume.js       # Resume model
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── resumes.js      # Resume CRUD routes
│   │   └── templates.js    # Template routes
│   ├── uploads/            # Uploaded photos
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Express server
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── AuthForm.jsx       # Login/Register modal
    │   │   ├── LivePreview.jsx    # Resume preview
    │   │   ├── ResumeForm.jsx     # Input form
    │   │   └── TemplateSelector.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx      # Resume list
    │   │   ├── Editor.jsx         # Resume editor
    │   │   └── Home.jsx           # Landing page
    │   ├── services/
    │   │   └── api.js             # API client
    │   ├── styles/
    │   │   ├── index.css          # Global styles
    │   │   └── templates.css      # Template styles
    │   ├── templates/             # Template configs
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## API Endpoints

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

## License

MIT License - feel free to use this project for personal or commercial purposes.
