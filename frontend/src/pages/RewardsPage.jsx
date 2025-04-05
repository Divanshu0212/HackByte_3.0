import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRewards } from '../context/RewardsContext';

const RewardsPage = () => {
  const { points, level, history, availableVouchers, redeemedVouchers, redeemVoucher } = useRewards();
  const [activeTab, setActiveTab] = useState('overview');
  const [redeemSuccess, setRedeemSuccess] = useState(null);
  
  const handleRedeem = (voucherId) => {
    const result = redeemVoucher(voucherId);
    if (result) {
      setRedeemSuccess(result);
      setTimeout(() => {
        setRedeemSuccess(null);
      }, 3000);
    }
  };
  
  // Calculate progress to next level
  const nextLevelPoints = level * 100;
  const progress = ((points % 100) / 100) * 100;
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Plant Rewards</h1>
      
      {/* Success notification */}
      {redeemSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
        >
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">You've redeemed a voucher for {redeemSuccess.sponsor}.</span>
          <p className="mt-1">Your code: <span className="font-mono font-bold">{redeemSuccess.code}</span></p>
        </motion.div>
      )}
      
      {/* User Level Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-green-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-green-800">Level {level}</h2>
          <div className="bg-green-100 px-3 py-1 rounded-full text-green-800 font-medium">
            {points} points
          </div>
        </div>
        
        <div className="mb-2 flex justify-between text-sm text-gray-600">
          <span>{points % 100} / 100 points to next level</span>
          <span>Level {level + 1}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-green-500 text-green-700 font-medium' : 'text-gray-500'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('vouchers')}
          className={`px-4 py-2 ${activeTab === 'vouchers' ? 'border-b-2 border-green-500 text-green-700 font-medium' : 'text-gray-500'}`}
        >
          Redeem Vouchers
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-green-500 text-green-700 font-medium' : 'text-gray-500'}`}
        >
          Activity History
        </button>
        <button 
          onClick={() => setActiveTab('redeemed')}
          className={`px-4 py-2 ${activeTab === 'redeemed' ? 'border-b-2 border-green-500 text-green-700 font-medium' : 'text-gray-500'}`}
        >
          My Vouchers
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">How to Earn Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Add a New Plant</h4>
                  <p className="text-sm text-gray-600">+10 points</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Check Plant Status</h4>
                  <p className="text-sm text-gray-600">+2 points</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Log Care Activity</h4>
                  <p className="text-sm text-gray-600">+5 points</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Chat with Plant</h4>
                  <p className="text-sm text-gray-600">+3 points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'vouchers' && (
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">Redeem Your Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableVouchers.map(voucher => (
              <div key={voucher.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img src={voucher.image} alt={voucher.sponsor} className="w-12 h-12 rounded-full mr-3" />
                    <h4 className="font-medium">{voucher.sponsor}</h4>
                  </div>
                  <p className="text-gray-700 mb-4">{voucher.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-700">{voucher.pointsCost} points</span>
                    <button
                      onClick={() => handleRedeem(voucher.id)}
                      disabled={points < voucher.pointsCost}
                      className={`px-4 py-2 rounded-full text-white font-medium ${points >= voucher.pointsCost ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'history' && (
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">Activity History</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {history.length === 0 ? (
              <p className="p-4 text-gray-500">No activity yet. Start interacting with your plants to earn points!</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {history.map((item, index) => (
                  <li key={index} className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className={`font-bold ${item.points >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {item.points >= 0 ? '+' : ''}{item.points} pts
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'redeemed' && (
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">My Vouchers</h3>
          {redeemedVouchers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500 mb-4">You haven't redeemed any vouchers yet</p>
              <button 
                onClick={() => setActiveTab('vouchers')}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Browse Available Vouchers
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redeemedVouchers.map((voucher, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center mb-3">
                    <img src={voucher.image} alt={voucher.sponsor} className="w-12 h-12 rounded-full mr-3" />
                    <div>
                      <h4 className="font-medium">{voucher.sponsor}</h4>
                      <p className="text-sm text-gray-500">Redeemed on {new Date(voucher.redeemDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{voucher.description}</p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-500 mb-1">Voucher Code:</p>
                    <p className="font-mono font-bold text-green-800">{voucher.code}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RewardsPage;