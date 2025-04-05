import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the rewards context
export const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
  // State for managing user rewards
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState([]);
  const [availableVouchers, setAvailableVouchers] = useState([
    {
      id: 'v1',
      sponsor: 'GreenThumb',
      description: '10% off any plant purchase',
      image: '/api/placeholder/80/80',
      pointsCost: 100,
    },
    {
      id: 'v2',
      sponsor: 'EcoPlanter',
      description: 'Free organic fertilizer sample',
      image: '/api/placeholder/80/80',
      pointsCost: 50,
    },
    {
      id: 'v3',
      sponsor: 'Terrarium World',
      description: '$5 off your next purchase',
      image: '/api/placeholder/80/80',
      pointsCost: 75,
    }
  ]);
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);
  
  // Load rewards data from localStorage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('rewardPoints');
    const savedLevel = localStorage.getItem('rewardLevel');
    const savedHistory = localStorage.getItem('rewardHistory');
    const savedRedeemed = localStorage.getItem('redeemedVouchers');
    
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedRedeemed) setRedeemedVouchers(JSON.parse(savedRedeemed));
  }, []);
  
  // Save rewards data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('rewardPoints', points);
    localStorage.setItem('rewardLevel', level);
    localStorage.setItem('rewardHistory', JSON.stringify(history));
    localStorage.setItem('redeemedVouchers', JSON.stringify(redeemedVouchers));
  }, [points, level, history, redeemedVouchers]);
  
  // Calculate level based on points
  useEffect(() => {
    const newLevel = Math.floor(points / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      addToHistory({
        type: 'LEVEL_UP',
        points: 0,
        description: `Reached Level ${newLevel}!`,
        timestamp: new Date()
      });
    }
  }, [points, level]);
  
  // Add points and update history
  const addPoints = (amount, actionType, description = '') => {
    setPoints(prev => prev + amount);
    addToHistory({
      type: actionType,
      points: amount,
      description: description || `Earned ${amount} points`,
      timestamp: new Date()
    });
  };
  
  // Add entry to history
  const addToHistory = (entry) => {
    setHistory(prev => [entry, ...prev].slice(0, 50)); // Keep last 50 entries
  };
  
  // Redeem a voucher
  const redeemVoucher = (voucherId) => {
    const voucher = availableVouchers.find(v => v.id === voucherId);
    
    if (!voucher) return false;
    if (points < voucher.pointsCost) return false;
    
    setPoints(prev => prev - voucher.pointsCost);
    
    const redeemedVoucher = {
      ...voucher,
      redeemDate: new Date(),
      code: generateVoucherCode()
    };
    
    setRedeemedVouchers(prev => [redeemedVoucher, ...prev]);
    
    addToHistory({
      type: 'REDEEM',
      points: -voucher.pointsCost,
      description: `Redeemed ${voucher.description}`,
      timestamp: new Date()
    });
    
    return redeemedVoucher;
  };
  
  // Generate a random voucher code
  const generateVoucherCode = () => {
    return 'GREEN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  // Context value
  const value = {
    points,
    level,
    history,
    availableVouchers,
    redeemedVouchers,
    addPoints,
    redeemVoucher
  };
  
  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
};