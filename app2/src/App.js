import React from 'react';
import './App.css';
import ParentComponent from './ParentComponent';


function App() {
  return (
    <div className="App">
        <div class="login-config bs-hide" data-user-api-url="bsc/api/v1/users" data-user-session-url="bsc/api/UMS/v1/SessionValidation" data-login-url="/us/en/login" data-refresh-token-flag="false">
    </div>
      <header className="therasphere-header">
        <div className="header-container">
          <div className="ts-flyout-section">
        
          </div>
        </div>
      </header>

      <main>
        <ParentComponent /> {/* Ensure ParentComponent is rendered */}
          </main>

      <footer>
             </footer>
    </div>
  );
}

export default App;

