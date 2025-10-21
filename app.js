// ===================================
// 1. الثوابت الأساسية (Elements)
// ===================================
const neonText = document.getElementById('neonText');
const fontOptions = document.querySelectorAll('#fontSelectionGrid .font-option'); // أزرار الخطوط
const colorOptions = document.querySelectorAll('#color-body .color-option'); // أزرار الألوان
const neonSize = document.getElementById('neonSize');
const neonElement = document.getElementById('customNeon'); // العنصر المستهدف للنص النيوني
const toggleButton = document.getElementById('toggleButton');
const accordionHeaders = document.querySelectorAll('.accordion-header'); // رؤوس الأكورديون

// عناصر الخلفية الجديدة
const neonDisplay = neonElement.parentElement; // الحاوية الأبوية لعرض النيون
const backgroundOptions = document.querySelectorAll('#backgroundSelection .color-option');

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
    const sizeValue = neonSize.value;

    // 1. الحصول على الخط المختار حاليًا
    const activeFontElement = document.querySelector('.font-option.active');
    const fontValue = activeFontElement ? activeFontElement.getAttribute('data-font') : 'NeonClip'; 
    
    // 2. الحصول على اللون المختار حاليًا
    const activeColorElement = document.querySelector('#color-body .color-option.active');
    const colorValue = activeColorElement ? activeColorElement.getAttribute('data-color') : 'CustomRed'; 

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
 */
function handleFontClick(event) {
    if (event.target.classList.contains('font-option')) {
        
        const currentActiveFont = document.querySelector('.font-option.active');
        if (currentActiveFont) {
            currentActiveFont.classList.remove('active');
        }

        event.target.classList.add('active');
        updateNeonSign(); 
        
        neonElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }
}

/**
 * معالج النقر على أزرار الألوان 
 */
function handleColorClick(event) {
    if (event.target.classList.contains('color-option')) {
        
        const currentColorOptions = document.querySelectorAll('#color-body .color-option');
        currentColorOptions.forEach(option => option.classList.remove('active'));
        
        event.target.classList.add('active');
        updateNeonSign();
        
        neonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


/**
 * معالج النقر على أزرار الخلفية 
 */
function handleBackgroundClick(event) {
    const clickedOption = event.currentTarget;
    const selectedBg = clickedOption.getAttribute('data-bg');
    
    backgroundOptions.forEach(opt => opt.classList.remove('active'));
    clickedOption.classList.add('active');
    
    neonDisplay.classList.remove('bg-black', 'bg-brick-wall', 'bg-concrete');
    neonDisplay.classList.add(selectedBg);
    
    neonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ===================================
// 3. ربط الأحداث (Listeners)
// ===================================

// ربط إدخال النص والحجم
neonText.addEventListener('input', updateNeonSign);
neonSize.addEventListener('input', updateNeonSign);
toggleButton.addEventListener('click', toggleNeon);

// ربط مستمع لشبكة الخطوط 
fontOptions.forEach(option => {
    // تطبيق الخط مباشرة على الزر (للعرض في الواجهة)
    const fontName = option.getAttribute('data-font');
    option.style.fontFamily = `'${fontName}', sans-serif`;
    option.addEventListener('click', handleFontClick);
});

// ربط مستمع لشبكة الألوان 
document.querySelectorAll('#color-body .color-option').forEach(option => {
    option.addEventListener('click', handleColorClick);
});

// ربط مستمع لأزرار الخلفية 
backgroundOptions.forEach(option => {
    option.addEventListener('click', handleBackgroundClick);
});


// ربط منطق الأكورديون 
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-target');
        const targetBody = document.getElementById(targetId);
        
        // إغلاق كل الأقسام الأخرى وإزالة التحديد النشط
        accordionHeaders.forEach(h => {
            const body = document.getElementById(h.getAttribute('data-target'));
            h.classList.remove('active');
            body.classList.remove('expanded');
        });
        
        // فتح/إغلاق القسم الحالي
        header.classList.toggle('active');
        targetBody.classList.toggle('expanded');
    });
});


// تشغيل التحديث الأولي عند تحميل الصفحة
window.addEventListener('load', updateNeonSign);


