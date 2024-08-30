import React, { useState } from 'react';

const ParentComponent = () => {
  const [flyoutHtml, setFlyoutHtml] = useState(null);
  const [showFlyout, setShowFlyout] = useState(false);

  const handleButtonClick = async (url) => {
    if (url) {
      try {
        if (showFlyout) {
          setShowFlyout(false); // Close the flyout if it's already open
        } else {
          const response = await fetch(url); // Fetch HTML content from the URL
          if (response.ok) {
            const htmlString = await response.text(); // Convert response to HTML string
            setFlyoutHtml(htmlString); // Set the HTML content to show in flyout
            setShowFlyout(true); // Display the flyout
          } else {
            throw new Error(`Failed to fetch: ${response.status}`); // Handle fetch errors
          }
        }
      } catch (error) {
        console.error('Fetch error:', error); // Log any fetch errors
      }
    }
  };

  return (
    <div>
      <div className="header-nav">
        <div className="brand">TheraSphere 360</div>
        <button 
          className="js-my-account btn-my-account" 
          onClick={() => handleButtonClick('https://therasphere360-dev.bsciewp.com/content/experience-fragments/ewp/customer-portals/therasphere/us/en/site/flyout-xf/master.noclientlib.html')}
        >
          <span className="ts-icon"><span className="icon-person"></span></span>
          <span>My Account</span>
        </button>
      </div>
      {showFlyout && (
        <div id="bs-flyout-container" dangerouslySetInnerHTML={{ __html: flyoutHtml }} />
      )}
    </div>
  );
};

export default ParentComponent;
