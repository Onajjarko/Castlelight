// ===================================
// 1. الثوابت الأساسية (Elements)
// ===================================
const neonText = document.getElementById('neonText');
const fontGrid = document.getElementById('fontSelectionGrid'); // شبكة الخطوط الجديدة
const neonColor = document.getElementById('neonColor');
const neonSize = document.getElementById('neonSize');
const neonElement = document.getElementById('customNeon');
const toggleButton = document.getElementById('toggleButton');
const fontOptions = document.querySelectorAll('.font-option'); // جميع أزرار الخطوط

// حالة التشغيل/الإيقاف الافتراضية
let isNeonOn = true; 

// ===================================
// 2. الدوال الرئيسية
// ===================================

/**
 * دالة تحديث توقيع النيون بناءً على الإدخالات
 */
function updateNeonSign() {
    const text = neonText.value;
    const colorValue = neonColor.value;
    const sizeValue = neonSize.value;

    // الحصول على الخط المختار حاليًا من الزر النشط في الشبكة
    const activeFontElement = document.querySelector('.font-option.active');
    // الخط الافتراضي هو 'NeonClip'
    const fontValue = activeFontElement ? activeFontElement.getAttribute('data-font') : 'NeonClip'; 

    // تحديث النص
    neonElement.textContent = text;
    
    // تحديث الخط
    neonElement.style.fontFamily = `'${fontValue}', sans-serif`;

    // تحديث الحجم
    neonElement.style.fontSize = `${sizeValue}px`;

    // تحديث اللون (إزالة جميع فئات الألوان السابقة وإضافة الفئة الجديدة)
    neonElement.className = 'neon-sign';
    neonElement.classList.add(`neon-${colorValue}`);
    
    // التأكد من تطبيق حالة التشغيل/الإيقاف
    if (!isNeonOn) {
        neonElement.classList.add('is-off');
    }
}

/**
 * دالة تبديل حالة التشغيل/الإيقاف للوحة النيون
 */
function toggleNeon() {
    isNeonOn = !isNeonOn; // عكس الحالة

    if (isNeonOn) {
        // حالة التشغيل (ON)
        neonElement.classList.remove('is-off');
        updateNeonSign(); 
        
        toggleButton.textContent = 'إيقاف';
        toggleButton.classList.remove('off');
        toggleButton.classList.add('on');
        
    } else {
        // حالة الإيقاف (OFF)
        neonElement.classList.add('is-off');
        
        toggleButton.textContent = 'تشغيل';
        toggleButton.classList.remove('on');
        toggleButton.classList.add('off');
    }
}

/**
 * معالج النقر على أزرار الخطوط
 * @param {Event} event - حدث النقر
 */
function handleFontClick(event) {
    // إزالة حالة النشاط من جميع الأزرار
    fontOptions.forEach(option => option.classList.remove('active'));
    
    // إضافة حالة النشاط للزر الذي تم النقر عليه
    event.target.classList.add('active');
    
    // تحديث لوحة النيون بالخط الجديد
    updateNeonSign();
}

// ===================================
// 3. ربط الأحداث (Listeners)
// ===================================

// ربط المستمعين لتحديث اللوحة في الوقت الفعلي
neonText.addEventListener('input', updateNeonSign);
neonColor.addEventListener('change', updateNeonSign);
neonSize.addEventListener('input', updateNeonSign);

// ربط مستمع لشبكة الخطوط
fontOptions.forEach(option => {
    // تطبيق الخط على الزر نفسه لعرض شكل الخط داخله
    const fontName = option.getAttribute('data-font');
    option.style.fontFamily = `'${fontName}', sans-serif`;
    
    // ربط مستمع النقر
    option.addEventListener('click', handleFontClick);
});


// ربط مستمع لزر التشغيل/الإيقاف
toggleButton.addEventListener('click', toggleNeon);

// تشغيل التحديث الأولي عند تحميل الصفحة
window.addEventListener('load', updateNeonSign);
