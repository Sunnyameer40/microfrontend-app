import React, { useEffect } from 'react';
import { login } from './SignIn'; // Corrected import statement

const AuthCallback = () => {
  const handleSuccessState = () => {
    const initialReferer = localStorage.getItem('initialReferer');
    if (initialReferer) {
      localStorage.removeItem('initialReferer');
      localStorage.setItem('userLoggedIn', true);
      window.location.href = initialReferer;
    }
  };

  const handleErrorState = () => {
    const errorLoader = document.querySelector('#js-callback-error');
    const successLoader = document.querySelector('#js-callback-loading');
    if (errorLoader) {
      errorLoader.classList.remove('bs-hide');
      const signInBtn = errorLoader.querySelector('#error-links a[href="#"]');
      if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
          e.preventDefault();
          login(); // Corrected function call from imported module
        });
      }
    }
    if (successLoader) {
      successLoader.classList.add('bs-hide');
    }
  };

  const getAccessToken = async (authCode) => {
    try {
      const loginConfig = document.querySelector('.login-config');
      let userPath = '';
      if (loginConfig) {
        userPath = loginConfig.getAttribute('data-user-api-url');
      }
      const getAccessTokenUrl = `${userPath}/generateaccesstoken/${authCode}`;

      const response = await fetch(getAccessTokenUrl);
      if (response.ok) {
        handleSuccessState();
      } else {
        handleErrorState();
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
      handleErrorState();
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorState = localStorage.getItem('errorState');

    if (errorState) {
      handleErrorState();
    } else {
      const errorLoader = document.querySelector('#js-callback-error');
      if (errorLoader) {
        errorLoader.classList.add('bs-hide');
      }
      const authCode = urlParams.get('code');
      if (authCode) {
        getAccessToken(authCode);
      }
    }
  }, []);

  return (
    <div>
      <div id="js-callback-error" className="bs-hide">
        <div id="error-links">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            login(); // Corrected function call from imported module
          }}>Sign In</a>
        </div>
      </div>
      <div id="js-callback-loading">
        {/* Loading or error message */}
      </div>
    </div>
  );
};

export default AuthCallback;
