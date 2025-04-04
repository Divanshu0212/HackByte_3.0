// Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Plant Health Care</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-green-200 transition-colors">About</a>
                        <a href="#" className="hover:text-green-200 transition-colors">Contact</a>
                        <a href="#" className="hover:text-green-200 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-green-200 transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;