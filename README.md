# HackByte_3.0
# 🌱 PlantCare - Interactive Plant Healthcare App: Democratizing Plant Care

## Project Overview
PlantCare is an interactive application designed to **break the red tape** of plant care. We provide users with personalized, engaging guidance through expressive plant avatars that communicate care needs, an intuitive dashboard for monitoring multiple plants, and a **Gemini API-powered conversational interface** for natural language interactions. Our aim is to make plant care accessible to everyone, regardless of their experience level, by simplifying complex information and providing tailored support.

## ✅ Current Progress (Checkpoint 3)

This checkpoint marks significant advancements across the application, focusing on enhanced functionality, user experience, and future scalability, all while keeping commercialization in mind.

### Backend Integration & Enhancement
- **Extensive Backend Integration and Debugging:** Significant effort was dedicated to integrating various backend components and rigorously debugging to ensure a stable and reliable platform.
- **Implemented Flow of Control Across Features:** A cohesive flow of control has been established across several key features, ensuring seamless interaction and data management within the application.
- **Enhanced Plant Details and Chat Handling:** The backend logic for managing plant details and handling chat interactions with the Gemini API has been significantly enhanced for improved performance and functionality.
- **Voucher - Sponsor System for Commercialization and Scaling:** A foundational **Voucher and Sponsor system** has been developed, strategically designed with future commercialization and scaling in mind. This system aims to address potential economic barriers for users while creating opportunities for partnerships and revenue generation.

### Language Barrier Feature Implementation (In Progress)
- **Initiated Language Barrier Feature Integration:** We have begun the implementation of features to address language barriers, laying the groundwork for a more inclusive user experience. This aligns with our goal of democratizing plant care globally.

### Collaborative Development & Github Flow
- **Clean Github Flow Implementation:** A well-structured and collaborative development process has been implemented using **branches and pull requests**, adhering to a clean Github Flow. **This demonstrates a commitment to organized development practices, crucial for maintainability and attracting potential sponsors by showcasing clear contribution tracking.**

### Robust Database Setup (MongoDB)
- **Good Database Setup on MongoDB:** A robust and well-structured database schema has been established using **MongoDB**, chosen for its flexibility and scalability. **This highlights our focus on leveraging NoSQL databases, a key area of interest for MongoDB sponsorship, ensuring efficient data management for a growing user base.** Future scope includes exploring DB encryption setup for a safe and reliable user experience.

## ✅ Previous Progress (Checkpoint 2)

### Authentication System
- **Secure MERN Stack Authentication** implemented with **JSON Web Tokens (JWT)** for stateless session management.
- **Cloudflare Turnstile Captcha** integration to mitigate bot attacks and enhance security.
- Robust user registration and login flows with asynchronous email verification for enhanced security and user validation.

### Frontend Development
- **Comprehensive and Themed Design System**
    - Custom, plant-inspired color palette leveraging **CSS Variables** for easy theming.
    - Typography system employing friendly, rounded **Google Fonts** for improved readability and a welcoming aesthetic.
    - Reusable React components styled with **Tailwind CSS** and clear animation guidelines using **Framer Motion**.

- **Responsive and Intuitive Layout & Navigation**
    - Adaptive layout containers ensuring seamless experience across various screen sizes.
    - Desktop navigation featuring a persistent sidebar for easy access to key sections.
    - Mobile-optimized bottom navigation bar providing quick access to core functionalities.
    - Fluid and engaging page transitions implemented with **Framer Motion** for a smooth user experience.

- **Engaging Dashboard Implementation**
    - Responsive **CSS Grid** layout for displaying plant cards effectively on different devices.
    - Clear status indicators reflecting plant health and immediate needs.
    - Client-side filtering and sorting capabilities for efficient plant management.


- **Intuitive Add Plant System**
    - Step-by-step form utilizing React components to guide users through adding new plants.
    - Backend integration for persistent storage of user plant data using **Mongodb**.
    - **Cloudinary** integration for efficient and secure image uploads of user's plants.
    - Creation of user-specific plant profiles, setting the stage for personalized care interactions.

- **Gemini API-Powered Plant Care Assistant**
    - **API Integration:** Connected to **Google's Gemini AI (specifically the `gemini-1.5-flash-8b-exp` model via its API)** to power an intelligent plant care assistant.
    - **Specialized AI Agent:** Implemented a system prompt fine-tuning the AI to provide expert-level assistance in:
        - Houseplant identification based on descriptions.
        - Accurate diagnosis of plant health problems based on user input.
        - Tailored watering and optimal lighting recommendations.
        - Guidance on appropriate soil preferences for various plant species.
        - Advice on effective propagation techniques.
        - Recommendations for seasonal care adjustments.
    - **Conversational Interface:** Developed a chat endpoint enabling natural language interaction, featuring:
        - Persistent conversation history management per user session to maintain context.
        - Asynchronous handling of user messages and real-time generation of AI responses.
        - Implementation of history length limitations to optimize token usage and prevent API errors.
    - **Addressing Language Barriers (Future):** We plan to leverage the **multilingual capabilities of the Gemini API** to provide plant care guidance in the user's preferred language. This will involve dynamically adjusting the system prompt and user input processing to support diverse linguistic inputs, effectively **breaking down language barriers** in accessing plant care knowledge.

### Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB,Cloudinary
- **Authentication**: JWT, Cloudflare Turnstile
- **State Management**: React Context API
- **AI Integration**: Google Gemini API


## 🚀 Next Steps

### Frontend
- Plant detail/interaction page with enhanced avatar visualizations.
- Richer chat interface with features like quick replies and visual aids.
- Streamlined "Add New Plant" flow with potential for AI-assisted identification.
- Comprehensive notification components for timely care reminders and alerts.
- User-friendly settings and profile page for personalization.

### Backend (Planned)
- Robust plant data models and well-defined **RESTful API** endpoints.
- Real-time notification system leveraging technologies like WebSockets.
- Secure storage of user preferences and plant-specific care schedules.
- Detailed care history tracking for user reference and potential AI analysis.
- Further development and refinement of the **Voucher-Sponsor system** for enhanced commercialization potential.
- Continued implementation and expansion of **language support** leveraging the Gemini API.
- Implementation of **user input filtering and authentication (crowdsourcing)** mechanisms to validate community-contributed plant care tips, ensuring data integrity and security.
- Exploration of **database encryption** techniques to further enhance the security and reliability of user data stored in **MongoDB**.

### ML Components (Planned)
- Advanced plant identification from uploaded images using **Convolutional Neural Networks (CNNs)**.
- Sophisticated personalized care recommendations based on plant type, environment, and user history.
- AI-powered health analysis from plant photos, providing early detection of potential issues.

### AI Component: Plant Disease Diagnosis

🌿 **AI-Powered Plant Health Monitoring: Democratizing Expertise**

PlantCare integrates an **AI-driven Convolutional Neural Network (CNN) model** to diagnose plant diseases, **breaking down the barrier of needing expert knowledge**. Users can easily upload or scan images of their plants and receive instant, AI-powered feedback on potential diseases and evidence-based treatment suggestions.

📊 **Ensure Healthy Plants: Accessible Diagnostics**
Diagnose plant diseases in home gardens, balconies, or indoor spaces with high accuracy using **deep learning-based image analysis**. Provide actionable, real-time recommendations, empowering users to proactively maintain their plants' health and prevent further issues.

📈 **Leverage Data for Continuous Improvement: Community-Driven Enhancement**
Anonymized plant health data collected from users will be utilized to continuously refine and improve the disease identification accuracy of our AI model. User feedback and aggregated historical plant health trends will further optimize personalized care tips, creating a **crowdsourced knowledge base** that benefits all users.

📂 Dataset
Currently utilizing a curated dataset for initial model training.
Training Images: 70,029
Testing Images: 17,572

Source: Plant Disease Classification - Merged Dataset

🛠 **Preprocessing Pipeline**

- **Image Filtering:** Application of techniques to reduce noise and enhance crucial image features for improved model input.
- **Segmentation:** Employing image segmentation algorithms to focus the model's attention on potentially affected plant regions, increasing diagnostic precision.
- **Labeling:** Rigorous organization of data into distinct categories representing specific plant diseases and healthy states.

🔄 **Data Augmentation Strategies**

Implementation of various augmentation techniques (rotation, cropping, brightness adjustments) to artificially increase the training dataset size and improve the model's generalization capabilities to real-world variations.

🔧 **Frameworks and Tools**

- **Machine Learning**: TensorFlow & Scikit-learn for model development and evaluation.
- **Data Manipulation**: NumPy, SciPy & Pandas for efficient data handling and analysis.

🧠 **Algorithm Architecture**

- **Model**: Implementation of state-of-the-art Convolutional Neural Networks (CNNs) utilizing Keras or TensorFlow for robust feature extraction and classification.

🔍 **Intelligent Workflow**

- **Feature Extraction:** Automated identification of salient visual patterns indicative of plant health issues, such as discoloration, lesions, or fungal growth, through the CNN layers.
- **Model Training:** End-to-end training of the CNN-based model on the preprocessed and augmented dataset to achieve high accuracy in plant disease classification.
- **Prediction & Recommendation:** Providing users with probabilistic disease analysis and contextually relevant care suggestions based on the model's output.

📊 **Performance Metrics**

- **Accuracy**: 0.98
- **Macro Average**: 0.98 (Precision: 0.98, Recall: 0.98, F1-score: 0.98)
- **Weighted Average**: 0.98 (Precision: 0.98, Recall: 0.98, F1-score: 0.98)

🚀 **Future Enhancements: Further Breaking the Red Tape**

- **Automated Watering Reminders:** Intelligent, AI-driven reminders based on predicted plant health trends and environmental factors, reducing the burden on users.
- **Seamless Integration with Smart Plant Sensors:** Direct connectivity for real-time environmental monitoring (moisture, light, temperature), providing richer data for AI-powered recommendations and **removing the need for manual data input**.
- **Thriving Community Feature:** A platform to connect plant enthusiasts, share knowledge, and collaboratively troubleshoot plant care issues, fostering a **peer-to-peer support network**.
- **Empowering Farmers & Providing Resources:**
    - **Breaking Red Tape:** Tackles socioeconomic and language barriers for farmers with AI-powered crop-specific advice in local languages.
    - **Voucher System:** Addresses economic barriers by connecting users with sponsored discounts and essential gardening resources, fostering a sustainable ecosystem.

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone [https://github.com/Divanshu0212/HackByte_3.0](https://github.com/Divanshu0212/HackByte_3.0)

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