import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const useRecaptcha = () => {
  const [isReady, setIsReady] = useState(false);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      // If no site key is configured, we assume recaptcha is disabled
      setIsReady(true);
      return;
    }

    if (window.grecaptcha && window.grecaptcha.execute) {
      setIsReady(true);
      return;
    }

    const scriptId = 'google-recaptcha-v3';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      };
      
      document.head.appendChild(script);
    } else {
      // Script already exists, wait for grecaptcha to be ready
      const checkReady = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.execute) {
          clearInterval(checkReady);
          setIsReady(true);
        }
      }, 100);
    }
  }, [siteKey]);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | undefined> => {
    if (!siteKey) {
      return undefined;
    }
    
    if (!isReady || !window.grecaptcha) {
      console.warn('reCAPTCHA is not ready yet');
      return undefined;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return undefined;
    }
  }, [isReady, siteKey]);

  return { isReady, executeRecaptcha };
};
