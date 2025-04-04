import React from 'react';
import Turnstile from 'react-turnstile';

const TurnstileWidget = ({ onVerify, onExpire, onError, onLoad }) => {
    return (
        <Turnstile
            sitekey="YOUR_SITE_KEY" // Replace with your actual site key
            onVerify={onVerify}
            onExpire={onExpire}
            onError={onError}
            onLoad={onLoad}
            theme="light" // or "dark" based on your theme
            size="normal" // or "compact"
        />
    );
};

export default TurnstileWidget;