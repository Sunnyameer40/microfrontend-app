import React, { useState } from 'react';
import ParentComponent from './ParentComponent';

const App = () => {
  const [flyoutHtml, setFlyoutHtml] = useState(null);
  const [showFlyout, setShowFlyout] = useState(false);

  const handleButtonClick = async (url) => {
    if (url) {
      try {
        if (showFlyout) {
          setShowFlyout(false);
        } else {
          const response = await fetch(url);
          if (response.ok) {
            const htmlString = await response.text();
            setFlyoutHtml(htmlString);
            setShowFlyout(true);
          } else {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };

  const handleFlyoutToggle = () => {
    setShowFlyout(!showFlyout);
  };

  return (
    <div className="App">
      <header className="therasphere-header">
        <div className="header-container">
          <div className="ts-flyout-section">
            {/* Pass handleFlyoutToggle to ParentComponent */}
            <ParentComponent 
              handleButtonClick={handleButtonClick} 
              handleFlyoutToggle={handleFlyoutToggle}
              showFlyout={showFlyout}
              flyoutHtml={flyoutHtml}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
