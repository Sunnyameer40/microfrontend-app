import React, { useState, useEffect, useRef } from 'react';
import './login'
const ParentComponent = () => {
  const [flyoutHtml, setFlyoutHtml] = useState(null);
  const [showFlyout, setShowFlyout] = useState(false);
  const flyoutContainerRef = useRef(null);

  const handleButtonClick = async (url) => {
    if (url) {
      try {
        if (showFlyout) {
          setShowFlyout(false);
        } else {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const htmlString = await response.text();
          setFlyoutHtml(htmlString);
          setShowFlyout(true);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };

  const handleCloseClick = () => {
    setShowFlyout(false);
  };

  useEffect(() => {
    if (flyoutHtml && showFlyout && flyoutContainerRef.current) {
      const closeButton = flyoutContainerRef.current.querySelector('.bs-flyout-close');
      if (closeButton) {
        closeButton.addEventListener('click', handleCloseClick);
      }
  
      // Call window.bscLogin.attachHandlers here
      if (window.bscLogin && typeof window.bscLogin.attachHandlers === 'function') {
        window.bscLogin.attachHandlers();
      }


      
  
      return () => {
        if (closeButton) {
          closeButton.removeEventListener('click', handleCloseClick);
        }
      };
    }
  }, [flyoutHtml, showFlyout]);
  
  return (
    <div>
      <div className="header-nav">
        <div className="brand">BSC 360</div>
        <button 
          className="js-my-account btn-my-account" 
          onClick={() => handleButtonClick('https://therasphere360-dev.bsciewp.com/content/experience-fragments/ewp/customer-portals/therasphere/us/en/site/flyout-xf/master.noclientlib.html')}
        >
          <span className="ts-icon"><span className="icon-person"></span></span>
          <span>My Account</span>
        </button>
      </div>
      
      {showFlyout && (
        <div id="bs-flyout-container" ref={flyoutContainerRef} dangerouslySetInnerHTML={{ __html: flyoutHtml }} />
      )}
    </div>
  );
};

export default ParentComponent;

