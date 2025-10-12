// الثوابت لربط عناصر HTML
const neonElement = document.getElementById('customNeon');
const textInput = document.getElementById('neonText');
const colorSelect = document.getElementById('neonColor');
const sizeInput = document.getElementById('neonSize');
const fontSelect = document.getElementById('neonFont'); 
// تم حذف const priceDisplay;

// قائمة الألوان المتاحة لتسهيل حذف الفئات القديمة
const availableColors = ['red', 'blue', 'green', 'pink', 'yellow'];

// -----------------------------------------------------------------
// دالة حساب السعر تم حذفها بالكامل
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// 1. تحديث مكون النيون (ربط الإدخالات بفئات CSS)
// -----------------------------------------------------------------

function updateNeonSign() {
    const text = textInput.value.trim() || "اكتب هنا";
    const color = colorSelect.value;
    const size = sizeInput.value;
    const font = fontSelect.value; 

    // 1. تحديث النص المعروض
    neonElement.textContent = text; 
    
    // 2. تغيير اللون عبر فئة CSS
    availableColors.forEach(c => neonElement.classList.remove(`neon-${c}`));
    neonElement.classList.add(`neon-${color}`); 

    // 3. تحديث الحجم (بالـ CSS)
    neonElement.style.fontSize = `${size}px`; 
    
    // 4. تحديث الخط
    neonElement.style.fontFamily = `'${font}', sans-serif`; 
    
    // تم حذف استدعاء calculatePrice()
}

// -----------------------------------------------------------------
// 2. الاستماع لأحداث المستخدم (Listeners)
// -----------------------------------------------------------------

// عند إدخال نص جديد
textInput.addEventListener('input', updateNeonSign);

// عند تغيير اللون
colorSelect.addEventListener('change', updateNeonSign);

// عند تغيير الحجم (Range Slider)
sizeInput.addEventListener('input', updateNeonSign);

// عند تغيير الخط
fontSelect.addEventListener('change', updateNeonSign);

// تشغيل الدالة عند تحميل الصفحة لأول مرة
window.onload = () => {
    updateNeonSign(); 
};
