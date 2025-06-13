// server.js (Debug Version)
import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';

const app = express();
const port = process.env.PORT || 4000;

// Environment variables with defaults for production
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Validate essential environment variables
const requiredEnvVars = [
  'MONGODB_URI', 
  'JWT_SECRET', 
  'CLOUDINARY_CLOUD_NAME', 
  'CLOUDINARY_API_KEY', 
  'CLOUDINARY_API_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

console.log(`🚀 Starting server in ${NODE_ENV} mode`);

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Enhanced CORS configuration for production
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'https://hackbyte-frontend.onrender.com',
    ];
    
    if (NODE_ENV === 'development' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  exposedHeaders: ['set-cookie'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Database connection
connectDB().then(() => {
  console.log('✅ Database connected successfully');
}).catch(err => {
  console.error('❌ Database connection failed:', err);
  process.exit(1);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

// API status endpoint
app.get('/', (req, res) => {
  res.json({
    message: "HackByte 3.0 API is running! 🌱",
    status: "active",
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// DEBUG: Load routes one by one to identify the problematic one
console.log('📝 Loading auth routes...');
try {
  const authRouter = await import('./routes/authRoutes.js');
  app.use('/api/auth', authRouter.default);
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
  process.exit(1);
}

console.log('📝 Loading user routes...');
try {
  const userRouter = await import('./routes/userRoutes.js');
  app.use('/api/user', userRouter.default);
  console.log('✅ User routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading user routes:', error.message);
  process.exit(1);
}

console.log('📝 Loading plant routes...');
try {
  const plantRouter = await import('./routes/plantRoutes.js');
  app.use('/api', plantRouter.default);
  console.log('✅ Plant routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading plant routes:', error.message);
  process.exit(1);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: NODE_ENV === 'development' ? err.message : undefined
  });
});

const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔗 Health check: http://localhost:${port}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;