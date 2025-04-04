import React, { useState } from 'react';
import leafImage from '../../public/leaf.png'; // Import your image
import CustomizableCharacter from '../components/CustomizableCharacter';

function Emotion() {
  return (
    <div className="relative">
      <CustomizableCharacter />
    </div>
  );
}

export default Emotion;