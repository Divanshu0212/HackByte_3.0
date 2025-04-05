import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plantType: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  condition: {
    type: String,
    enum: ['healthy', 'needsAttention', 'struggling'],
    default: 'healthy'
  },
  location: {
    type: String,
    enum: ['indoor', 'outdoor', 'balcony', 'patio'],
    default: 'indoor'
  },
  potSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  acquisitionDate: {
    type: Date,
    default: Date.now
  },
  avatar: {
    variant: {
      type: Number,
      default: 1
    },
    expression: {
      type: String,
      default: 'happy'
    },
    color: {
      type: String,
      default: 'default'
    },
    url: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Plant', PlantSchema);