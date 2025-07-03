// language.js
let lang = localStorage.getItem('language') || 'fa';

const updateTexts = () => {
  const currentLang = lang;
  const elements = document.querySelectorAll('[data-fa][data-en]');
  elements.forEach(el => {
    el.textContent = currentLang === 'fa' 
      ? el.getAttribute('data-fa') 
      : el.getAttribute('data-en');
  });
};

const toggleLanguage = () => {
  lang = lang === 'fa' ? 'en' : 'fa';
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  updateTexts();
};

const setLanguage = (newLang) => {
  lang = newLang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  updateTexts();
};

const getCurrentLang = () => lang;

const initializeLanguage = () => {
  document.documentElement.lang = lang;
  updateTexts();
};

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeLanguage);

// Expose functions to global scope
window.toggleLanguage = toggleLanguage;
window.setLanguage = setLanguage;
window.getCurrentLang = getCurrentLang;

    // نمایش کد زبان فعلی
    document.addEventListener('DOMContentLoaded', () => {
      const updateLangCode = () => {
        document.getElementById('lang-code').textContent = getCurrentLang();
      };
      
      // مقدار اولیه
      updateLangCode();
      
      // برای به‌روزرسانی پس از تغییر زبان
      document.addEventListener('langChanged', updateLangCode);
    });
