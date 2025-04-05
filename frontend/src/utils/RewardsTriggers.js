import { useRewards } from '../context/RewardsContext';

export const useRewardsTriggers = () => {
  const { addPoints } = useRewards();
  
  // Reward functions for various actions
  const rewardActions = {
    // Plant management
    addPlant: () => {
      addPoints(10, 'ADD_PLANT', 'Added a new plant to your collection');
    },
    
    updatePlant: () => {
      addPoints(3, 'UPDATE_PLANT', 'Updated plant information');
    },
    
    // Care activities
    logWatering: () => {
      addPoints(5, 'WATER_PLANT', 'Watered your plant');
    },
    
    logFertilizing: () => {
      addPoints(5, 'FERTILIZE_PLANT', 'Fertilized your plant');
    },
    
    logRepotting: () => {
      addPoints(7, 'REPOT_PLANT', 'Repotted your plant');
    },
    
    // Engagement
    checkPlant: () => {
      addPoints(2, 'CHECK_PLANT', 'Checked on your plant');
    },
    
    chatWithPlant: () => {
      addPoints(3, 'CHAT', 'Chatted with your plant');
    },
    
    uploadPhoto: () => {
      addPoints(5, 'UPLOAD_PHOTO', 'Uploaded a plant photo');
    },
    
    // Profile and system
    completeProfile: () => {
      addPoints(15, 'COMPLETE_PROFILE', 'Completed your user profile');
    },
    
    enableNotifications: () => {
      addPoints(5, 'ENABLE_NOTIFICATIONS', 'Enabled plant care notifications');
    },
    
    // Daily and streak rewards
    dailyLogin: (dayCount) => {
      const streakBonus = Math.min(dayCount, 7); // Cap streak bonus at 7
      addPoints(2 + streakBonus, 'DAILY_LOGIN', `Daily login streak: ${dayCount} ${dayCount > 1 ? 'days' : 'day'}`);
    },
    
    // Social
    sharePlant: () => {
      addPoints(8, 'SHARE_PLANT', 'Shared a plant on social media');
    }
  };
  
  return rewardActions;
};