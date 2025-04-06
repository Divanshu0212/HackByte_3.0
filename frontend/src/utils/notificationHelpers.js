// src/utils/notificationHelpers.js
import { useNotifications } from '../components/Notifications/NotificationContext';
import PlantAvatar from '../components/PlantAvatar';

/**
 * Custom hook for plant-specific notifications
 * Makes it easier to create consistent notifications throughout the app
 */
export const usePlantNotifications = () => {
  const { addNotification } = useNotifications();
  
  const notifyWaterNeeded = (plant) => {
    addNotification({
      title: `${plant.name} needs water!`,
      message: `Your ${plant.type} is feeling thirsty. Water it soon!`,
      type: "warning",
      plantId: plant.id,
      plantName: plant.name,
      plantAvatar: <PlantAvatar 
        type={plant.type} 
        growthStage={plant.growthStage} 
        health="thirsty" 
        size="sm" 
      />,
      actionLabel: "Water Now",
      action: () => console.log("Water action for", plant.id)
    });
  };
  
  const notifyFertilizeNeeded = (plant) => {
    addNotification({
      title: `${plant.name} needs nutrients!`,
      message: `Your ${plant.type} would benefit from fertilizer now.`,
      type: "info",
      plantId: plant.id,
      plantName: plant.name,
      plantAvatar: <PlantAvatar 
        type={plant.type} 
        growthStage={plant.growthStage} 
        health="moderate" 
        size="sm" 
      />,
      actionLabel: "Fertilize",
      action: () => console.log("Fertilize action for", plant.id)
    });
  };
  
  const notifyLightAdjustment = (plant, tooMuch = false) => {
    addNotification({
      title: `${plant.name} ${tooMuch ? 'has too much' : 'needs more'} light!`,
      message: tooMuch 
        ? `Your ${plant.type} is getting too much direct sunlight.` 
        : `Your ${plant.type} would grow better with more light.`,
      type: "info",
      plantId: plant.id,
      plantName: plant.name,
      plantAvatar: <PlantAvatar 
        type={plant.type} 
        growthStage={plant.growthStage} 
        health={tooMuch ? "stressed" : "moderate"} 
        size="sm" 
      />,
      actionLabel: tooMuch ? "Move to Shade" : "Move to Light",
      action: () => console.log("Light adjustment for", plant.id)
    });
  };
  
  const notifyHealthIssue = (plant, issue) => {
    addNotification({
      title: `${plant.name} has health issues!`,
      message: `Your ${plant.type} may have ${issue}. Check it soon!`,
      type: "error",
      plantId: plant.id,
      plantName: plant.name,
      plantAvatar: <PlantAvatar 
        type={plant.type} 
        growthStage={plant.growthStage} 
        health="bad" 
        size="sm" 
      />,
      actionLabel: "View Details",
      action: () => console.log("Health issue for", plant.id)
    });
  };
  
  const notifyGrowthMilestone = (plant) => {
    addNotification({
      title: `${plant.name} reached a milestone!`,
      message: `Your ${plant.type} is thriving and has grown to a new stage!`,
      type: "success",
      plantId: plant.id,
      plantName: plant.name,
      plantAvatar: <PlantAvatar 
        type={plant.type} 
        growthStage={plant.growthStage} 
        health="good" 
        size="sm" 
      />,
      actionLabel: "Celebrate",
      action: () => console.log("Growth milestone for", plant.id)
    });
  };

  return {
    notifyWaterNeeded,
    notifyFertilizeNeeded,
    notifyLightAdjustment,
    notifyHealthIssue,
    notifyGrowthMilestone
  };
};

/**
 * Create system notifications (not related to specific plants)
 */
export const useSystemNotifications = () => {
  const { addNotification } = useNotifications();
  
  const notifyAppUpdate = (version) => {
    addNotification({
      title: "App Updated!",
      message: `Plant Z has been updated to version ${version} with new features!`,
      type: "info"
    });
  };
  
  const notifyWeatherWarning = (warning) => {
    addNotification({
      title: "Weather Alert",
      message: `${warning} - You may need to adjust your plant care.`,
      type: "warning"
    });
  };
  
  const notifyTip = (tip) => {
    addNotification({
      title: "Plant Care Tip",
      message: tip,
      type: "info"
    });
  };

  return {
    notifyAppUpdate,
    notifyWeatherWarning,
    notifyTip
  };
};