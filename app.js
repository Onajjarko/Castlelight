// ===================================
// 1. الثوابت الأساسية (Elements)
// ===================================
const neonText = document.getElementById('neonText');
const neonFont = document.getElementById('neonFont');
const neonColor = document.getElementById('neonColor');
const neonSize = document.getElementById('neonSize');
const neonElement = document.getElementById('customNeon');
const toggleButton = document.getElementById('toggleButton');

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
    const fontValue = neonFont.value;
    const colorValue = neonColor.value;
    const sizeValue = neonSize.value;

    // تحديث النص
    neonElement.textContent = text;
    
    // تحديث الخط (باستخدام قيمة font-family المعرفة في CSS)
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


// ===================================
// 3. ربط الأحداث (Listeners)
// ===================================

// ربط المستمعين لتحديث اللوحة في الوقت الفعلي
neonText.addEventListener('input', updateNeonSign);
neonFont.addEventListener('change', updateNeonSign);
neonColor.addEventListener('change', updateNeonSign);
neonSize.addEventListener('input', updateNeonSign);

// ربط مستمع لزر التشغيل/الإيقاف
toggleButton.addEventListener('click', toggleNeon);

// تشغيل التحديث الأولي عند تحميل الصفحة
window.addEventListener('load', updateNeonSign);
