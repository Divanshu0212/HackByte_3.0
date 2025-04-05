import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const plantCommunities = [
  {
    id: 'apple',
    name: 'Apple',
    description: 'Join the apple growing community to share tips and get advice on cultivating healthy apple trees.',
    members: 328,
    posts: 124
  },
  {
    id: 'corn',
    name: 'Corn',
    description: 'Connect with corn farmers and enthusiasts to exchange knowledge about growing this versatile crop.',
    members: 245,
    posts: 98
  },
  {
    id: 'rice',
    name: 'Rice',
    description: 'Learn about paddy farming techniques and water management for successful rice cultivation.',
    members: 412,
    posts: 156
  },
  {
    id: 'wheat',
    name: 'Wheat',
    description: 'Share experiences about wheat varieties, seasonal planting strategies, and disease management.',
    members: 287,
    posts: 112
  },
  {
    id: 'tomato',
    name: 'Tomato',
    description: 'Exchange tips about growing flavorful tomatoes and solving common tomato plant problems.',
    members: 495,
    posts: 203
  }
];

const CommunityCard = ({ plant }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-32 bg-green-100 flex items-center justify-center">
        <span className="text-green-800 font-medium">
          {plant.name} Image Placeholder
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-green-800 mb-2">{plant.name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{plant.description}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{plant.members} members</span>
          <span>{plant.posts} tips</span>
        </div>
        <Link 
          to={`/community/${plant.id}`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition"
        >
          Join Community
        </Link>
      </div>
    </motion.div>
  );
};

const CommunityHub = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Plant Communities</h1>
        <p className="text-gray-600">
          Join our plant-specific communities to share your experiences, learn from others, 
          and contribute to our collective knowledge about plant care.
        </p>
      </div>
      
      {/* Featured community banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Help Us Grow!</h2>
        <p className="mb-4">
          Our community pages are built on shared knowledge. By contributing your tips and 
          experiences, you help ensure everyone can grow healthy plants sustainably.
        </p>
        <Link 
          to="/community/tomato"
          className="inline-block bg-white text-green-700 px-4 py-2 rounded-lg font-medium"
        >
          Visit Featured Community: Tomatoes
        </Link>
      </div>
      
      {/* Community cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantCommunities.map(plant => (
          <CommunityCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default CommunityHub;