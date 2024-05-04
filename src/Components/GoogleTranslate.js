import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = 'function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, "google_translate_element"); }';
    document.body.appendChild(script);

    const translateScript = document.createElement('script');
    translateScript.type = 'text/javascript';
    translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(translateScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(translateScript);
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;
