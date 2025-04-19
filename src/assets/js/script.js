    // تابع تبدیل عدد به حروف فارسی
    function toPersianNum(num) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
      }
  
      // تابع محاسبه تاریخ شمسی
      function getPersianDate() {
        const today = new Date();
        const gregorianYear = today.getFullYear();
        const gregorianMonth = today.getMonth() + 1;
        const gregorianDay = today.getDate();
        const weekday = today.getDay();
  
        // تبدیل تاریخ میلادی به شمسی
        // محاسبه تعداد روزهای گذشته از مبدأ تقویم میلادی
        const daysSinceGregorian = Math.floor((today - new Date(1970, 0, 1)) / (1000 * 60 * 60 * 24));
  
        // محاسبه تقریبی سال شمسی
        let persianYear = gregorianYear - 621;
        let persianMonth, persianDay;
  
        // تعداد روزهای گذشته در سال میلادی
        const dayOfYear = Math.floor((today - new Date(gregorianYear, 0, 1)) / (1000 * 60 * 60 * 24)) + 1;
  
        // تبدیل روز به ماه و روز شمسی
        const daysInPersianMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]; // روزهای ماه‌های شمسی
        let days = dayOfYear - 79; // 79 روز اختلاف تقریبی شروع سال شمسی و میلادی
        if (days <= 0) {
          persianYear -= 1;
          days += 365; // سال قبل
        }
  
        // محاسبه ماه و روز
        let monthIndex = 0;
        while (days > daysInPersianMonth[monthIndex] && monthIndex < 12) {
          days -= daysInPersianMonth[monthIndex];
          monthIndex++;
        }
        persianMonth = monthIndex + 1;
        persianDay = days;
  
        // تنظیم سال کبیسه (ساده‌سازی شده)
        const isLeapYear = (persianYear % 33) % 4 === 0; // تقریب ساده برای سال کبیسه
        if (persianMonth === 12 && persianDay === 30 && isLeapYear) {
          persianDay = 29; // اصلاح برای سال کبیسه
        }
  
        // نام روزهای هفته به فارسی
        const persianWeekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  
        // نام ماه‌های شمسی
        const persianMonths = [
          'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
          'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
        ];
  
        // قالب‌بندی تاریخ
        return `${persianWeekdays[weekday]} ${toPersianNum(persianDay)} ${persianMonths[persianMonth - 1]}`;
      }
  
      // آپدیت تاریخ در DOM
      document.addEventListener('DOMContentLoaded', () => {
        const dateElement = document.getElementById('persianDate');
        if (dateElement) {
          dateElement.textContent = getPersianDate();
        }
      });