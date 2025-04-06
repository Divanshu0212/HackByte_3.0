import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'hi', 'te', 'bn'].includes(browserLang)) {
      setSelectedLanguage(browserLang);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    console.log(`Language selected: ${lang}`);
  };

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        welcome: 'Welcome to Plant Z',
        tagline: 'Your personal plant healthcare assistant.',
        subtitle: 'Track, nurture, and grow your plants with expert guidance.',
        getStarted: 'Get Started / Login',
        footer: '© 2025 Plant Z',
        english: 'English',
        hindi: 'Hindi',
        telugu: 'Telugu',
        bengali: 'Bengali',
        logoText: 'Plant Z',
        greeting: 'Hey Plant Enthusiast!',
        greetingSub: "Let's start your plant care journey. Discover tips and tricks to keep your plants thriving!",
        getStartedButton: 'Get Started',
      },
      hi: {
        welcome: 'प्लांटकेयर में आपका स्वागत है',
        tagline: 'आपका व्यक्तिगत पौधा स्वास्थ्य सेवा सहायक।',
        subtitle: 'विशेषज्ञ मार्गदर्शन के साथ अपने पौधों को ट्रैक करें, पोषण करें और बढ़ाएं।',
        getStarted: 'शुरू करें / लॉग इन करें',
        footer: '© 2025 प्लांटकेयर',
        english: 'अंग्रेजी',
        hindi: 'हिंदी',
        telugu: 'तेलुगु',
        bengali: 'बंगाली',
        logoText: 'प्लांटकेयर',
        greeting: 'नमस्ते प्लांट उत्साही!',
        greetingSub: 'आइए आपकी पौधे की देखभाल की यात्रा शुरू करें। अपने पौधों को फलते-फूलते रखने के लिए टिप्स और ट्रिक्स खोजें!',
        getStartedButton: 'शुरू करें',
      },
      te: {
        welcome: 'ప్లాంట్ కేర్‌కు స్వాగతం',
        tagline: 'మీ వ్యక్తిగత మొక్కల ఆరోగ్య సంరక్షణ సహాయకుడు.',
        subtitle: 'నిపుణుల మార్గదర్శకత్వంతో మీ మొక్కలను ట్రాక్ చేయండి, పెంచండి మరియు పెంచండి.',
        getStarted: 'ప్రారంభించండి / లాగిన్ చేయండి',
        footer: '© 2025 ప్లాంట్ కేర్',
        english: 'ఆంగ్లం',
        hindi: 'హిందీ',
        telugu: 'తెలుగు',
        bengali: 'బెంగాలీ',
        logoText: 'ప్లాంట్ కేర్',
        greeting: 'హే ప్లాంట్ ఔత్సాహికుడు!',
        greetingSub: 'మీ మొక్కల సంరక్షణ ప్రయాణాన్ని ప్రారంభిద్దాం. మీ మొక్కలు వృద్ధి చెందడానికి చిట్కాలు మరియు ఉపాయాలు తెలుసుకోండి!',
        getStartedButton: 'ప్రారంభించండి',
      },
      bn: {
        welcome: 'প্ল্যান্টকেয়ারে স্বাগতম',
        tagline: 'আপনার ব্যক্তিগত উদ্ভিদ স্বাস্থ্যসেবা সহকারী।',
        subtitle: 'বিশেষজ্ঞ নির্দেশনার সাথে আপনার গাছ ট্র্যাক করুন, লালন করুন এবং বাড়ান।',
        getStarted: 'শুরু করুন / লগইন করুন',
        footer: '© 2025 প্ল্যান্টকেয়ার',
        english: 'ইংরেজি',
        hindi: 'হিন্দি',
        telugu: 'তেলেগু',
        bengali: 'বাংলা',
        logoText: 'প্ল্যান্টকেয়ার',
        greeting: 'ওহে উদ্ভিদ উত্সাহী!',
        greetingSub: 'আসুন আপনার গাছের পরিচর্যা যাত্রা শুরু করি। আপনার গাছপালা সতেজ রাখতে টিপস এবং কৌশল আবিষ্কার করুন!',
        getStartedButton: 'শুরু করুন',
      },
    };
    return translations[selectedLanguage][key] || translations['en'][key];
  };

  return (
    <div className={`landing-page ${isAnimated ? 'animated' : ''}`}>
      <nav className="landing-nav">
        <div className="logo-container">
          <h2 className="logo-text">{getTranslatedText('logoText')}</h2>
        </div>
        <div className="language-selector">
          <button
            className={`language-button ${selectedLanguage === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            {getTranslatedText('english')}
          </button>
          <button
            className={`language-button ${selectedLanguage === 'hi' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('hi')}
          >
            {getTranslatedText('hindi')}
          </button>
          <button
            className={`language-button ${selectedLanguage === 'te' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('te')}
          >
            {getTranslatedText('telugu')}
          </button>
          <button
            className={`language-button ${selectedLanguage === 'bn' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('bn')}
          >
            {getTranslatedText('bengali')}
          </button>
        </div>
      </nav>

      <div className="content-container center-content"> {/* Added center-content class */}
        <div className='dashboard-greeting'> {/* New container for the header elements */}
          <img src={assets.header_img} alt="" className='greeting-image animate-header-image' />
          <h1 className='greeting-title animate-text-fade'>
            {getTranslatedText('greeting')} <img className='wave-hand-icon' src={assets.hand_wave} alt="" />
          </h1>
          <h2 className='greeting-subtitle animate-text-slide'>{getTranslatedText('welcome')}</h2>
          <p className='greeting-description'>{getTranslatedText('greetingSub')}</p>
          <Link to="/login" className="greeting-button plant-button plant-button-primary hover:scale-105 transition-transform duration-300">
            {getTranslatedText('getStartedButton')}
          </Link>
        </div>
      </div>

      <footer className="landing-footer">
        <div className="footer-content">
          <p>{getTranslatedText('footer')}</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;