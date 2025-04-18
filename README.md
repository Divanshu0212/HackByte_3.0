# 🌱 Plant Z - Interactive Plant Healthcare App

> **Democratizing Plant Care Through AI**

## 📝 Table of Contents
- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Key Features](#key-features)
- [Technical Architecture](#technical-architecture)
- [Implementation Details](#implementation-details)
  - [Frontend Development](#frontend-development)
  - [Backend Implementation](#backend-implementation)
  - [AI & ML Components](#ai--ml-components)
  - [Authentication & Security](#authentication--security)
  - [Database Structure](#database-structure)
- [Installation & Setup](#️-installation--setup)
- [Future Roadmap](#-future-roadmap)
- [Team](#-team)

## Problem Statement

Many people struggle with plant care due to:
- Lack of specialized knowledge about different plant species
- Difficulty in identifying plant diseases and health issues
- Inconsistent care routines leading to plant deterioration
- Language barriers in accessing plant care information
- Economic barriers to acquiring quality gardening resources

These barriers create significant "red tape" that prevents many from successfully caring for plants, leading to frustration and plant loss.

## Solution Overview

PlantZ is an interactive application designed to break down these barriers by providing personalized, engaging guidance through:

- Expressive plant avatars that visually communicate care needs
- An intuitive dashboard for monitoring multiple plants
- A fully implemented Gemini API-powered conversational interface for natural language plant care advice
- Community-driven knowledge sharing and support
- A voucher-sponsor system to address economic barriers

Our aim is to make plant care accessible to everyone, regardless of their experience level, by simplifying complex information and providing tailored support.

![PlantZ System Overview]

## Key Features

### 🌿 Interactive Plant Avatars
- Personalized plant profiles with expressive avatars
- Visual indicators of plant health and care needs
- Customizable care schedules and notifications

### 📊 Intuitive Dashboard
- At-a-glance view of all plants and their status
- Filter and sort capabilities for efficient management
- Clear care indicators and reminders

### 💬 AI-Powered Plant Care Assistant
- **Fully implemented Gemini API integration** using the `gemini-1.5-flash` model
- Natural language interactions for plant care advice
- Expert-level assistance for identification, diagnosis, and care recommendations
- Persistent conversation history for contextual advice

### 🔍 Plant Disease Diagnosis
- AI-powered disease detection using Convolutional Neural Networks
- Evidence-based treatment suggestions
- High accuracy (98%) in identifying common plant diseases

### 🌍 Breaking Language Barriers
- Multilingual support leveraging Gemini API capabilities
- Language-agnostic plant care information
- Accessible interface design for global users

### 💰 Voucher-Sponsor System
- Economic barrier reduction through sponsored resources
- Partnership opportunities with gardening suppliers
- Sustainable ecosystem for both users and sponsors

## Technical Architecture

Our application follows a modern MERN stack architecture with AI integration:

```
                      ┌────────────────┐
                      │    Frontend    │
                      │    (React)     │
                      └────────┬───────┘
                               │
                               ▼
┌───────────────┐      ┌────────────────┐      ┌───────────────┐
│  Gemini API   │◄────►│    Backend     │◄────►│   MongoDB     │
│  Integration  │      │   (Node.js)    │      │   Database    │
└───────────────┘      └────────┬───────┘      └───────────────┘
                               │
                               ▼
                      ┌────────────────┐
                      │  CNN Model for │
                      │Disease Detection│
                      └────────────────┘
```

## Implementation Details

### Frontend Development

#### Design System
- Custom plant-inspired color palette using CSS Variables
- Typography system with Google Fonts for improved readability
- Reusable React components styled with Tailwind CSS
- Animation guidelines using Framer Motion

#### Responsive Layout & Navigation
- Adaptive layout containers for cross-device compatibility
- Desktop navigation with persistent sidebar
- Mobile-optimized bottom navigation bar
- Fluid page transitions with Framer Motion

#### Dashboard Implementation
- Responsive CSS Grid layout for plant cards
- Clear status indicators for plant health
- Client-side filtering and sorting capabilities

#### Add Plant System
- Step-by-step form with React components
- Cloudinary integration for image uploads
- Creation of personalized plant profiles

### Backend Implementation

#### Core API Endpoints
- RESTful API architecture following best practices
- Robust error handling and validation
- Efficient data management with MongoDB

#### Gemini API Integration
- **Complete implementation** of Google's Gemini AI for plant care assistance
- System prompt engineering for specialized plant knowledge
- Technical specifications:
  - Model: `gemini-1.5-flash`
  - Context window: 128k tokens
  - Response streaming for real-time interactions
  - Contextual memory management to maintain conversation history
  - Optimized token usage through history length limitations
  - Error handling and fallback mechanisms

#### Conversational Interface
- Asynchronous message handling
- Real-time generation of AI responses
- Session-based conversation history
- Multi-turn dialogue capabilities

#### Voucher-Sponsor System
- Secure voucher generation and validation
- Sponsor management backend
- Integration with user profiles

### AI & ML Components

#### Plant Disease Diagnosis Model
- CNN-based image analysis for disease detection
- Preprocessing pipeline for image enhancement
- High-performance metrics:
  - Accuracy: 0.98
  - Macro Average: 0.98 (Precision: 0.98, Recall: 0.98, F1-score: 0.98)
  - Weighted Average: 0.98 (Precision: 0.98, Recall: 0.98, F1-score: 0.98)

#### Dataset Details
- Training Images: 70,029
- Testing Images: 17,572
- Source: Plant Disease Classification - Merged Dataset

#### Technical Implementation
- TensorFlow & Scikit-learn for model development
- NumPy, SciPy & Pandas for data manipulation
- Feature extraction through CNN layers
- End-to-end training with augmentation techniques

### Authentication & Security

- Secure MERN Stack Authentication with JSON Web Tokens (JWT)
- Cloudflare Turnstile Captcha integration
- Asynchronous email verification
- Input sanitization and validation

### Database Structure

- MongoDB NoSQL database with flexible schema design
- Robust data models for users, plants, and care history
- Efficient indexing for performance optimization
- Foundation for future encryption implementation

![Database Schema]

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Divanshu0212/HackByte_3.0

# Navigate to the project directory
cd HackByte_3.0

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..

# Start development servers concurrently
# (Ensure you have concurrently installed: npm install -g concurrently)
npm run dev
```

## 🚀 Future Roadmap

### Enhanced User Experience
- Richer chat interface with quick replies and visual aids
- AI-assisted plant identification from photos
- Comprehensive notification system for timely care reminders

### Advanced AI Features
- Personalized care recommendations based on user history
- Early detection of potential plant issues
- Seasonal care adjustments

### Community Platform
- Peer-to-peer knowledge sharing
- Expert verification of community tips
- Crowdsourced plant care database

### Smart Home Integration
- Connectivity with plant sensors for real-time monitoring
- Automated care systems integration
- Environmental data collection and analysis

### Farmer Empowerment
- Crop-specific advice in local languages
- Resource connection through expanded voucher system
- Economic barrier reduction initiatives

## 👥 Team

Meet the passionate developers behind PlantZ:
- [**Aryan Kesarwani**] - FullStack Developer
- [**Salugu Harshita Bhanu**] - CyberSec & Frontend Developer
- [**Prakriti Das**] - AI/ML Specialist
- [**Divanshu Bhargava**] - AI/ML Specialist

---

*PlantZ - Breaking down the red tape of plant care, one leaf at a time.*