    // تابع تشخیص تم سیستم
    function systemThemeIsDark() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // تابع دریافت تم ذخیره شده یا سیستم
    function getSavedTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return systemThemeIsDark() ? 'dark' : 'light';
    }

    // تابع اعمال تم
    function applyTheme(theme) {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
        document.getElementById('sun-icon').classList.add('hidden');
        document.getElementById('moon-icon').classList.remove('hidden');
      } else {
        root.classList.remove('dark');
        document.getElementById('sun-icon').classList.remove('hidden');
        document.getElementById('moon-icon').classList.add('hidden');
      }
      
      // ذخیره تم در localStorage
      localStorage.setItem('theme', theme);
    }

    // تابع تغییر تم
    function toggleTheme() {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    }

    // راه‌اندازی اولیه
    document.addEventListener('DOMContentLoaded', () => {
      // اعمال تم ذخیره شده یا تم سیستم
      applyTheme(getSavedTheme());
      
      // اضافه کردن رویداد کلیک به دکمه تغییر تم
      document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
      
      // تغییر تم هنگام تغییر تنظیمات سیستم
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // فقط اگر کاربر تمی را انتخاب نکرده باشد
        if (!localStorage.getItem('theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    });
