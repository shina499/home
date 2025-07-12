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
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  updateTexts();
  document.dispatchEvent(new Event('langChanged'));
};

const setLanguage = (newLang) => {
  lang = newLang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  updateTexts();
  document.dispatchEvent(new Event('langChanged'));
};

const getCurrentLang = () => lang;

const initializeLanguage = () => {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
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

