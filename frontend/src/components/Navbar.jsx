import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
<div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-transparent backdrop-blur-md'> {/* Add backdrop blur */}
      <div
        className='text-2xl sm:text-4xl font-primary'
        style={{ fontFamily: 'Pacifico, cursive', color: '#4CAF50' }} // Adjust color as needed
        aria-label="Website Name"
      >
        PlantCare
      </div>

      {userData ? (
        <div className='w-16 h-16 flex justify-center items-center rounded-full bg-plant-green-dark text-white relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-text-primary rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-card-bg text-sm rounded shadow'>
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                  Verify email
                </li>
              )}
              <li onClick={logout} className='py-1 px-2 hover:bg-earth-light cursor-pointer'>
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-earth-medium rounded-full px-6 py-2 text-text-primary hover:bg-earth-light transition-all'
          aria-label="Login"
        >
          Login <img src={assets.arrow_icon} alt="Arrow" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Navbar;