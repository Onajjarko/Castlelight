// الثوابت لربط عناصر HTML
const neonElement = document.getElementById('customNeon');
const textInput = document.getElementById('neonText');
const colorSelect = document.getElementById('neonColor');
const sizeInput = document.getElementById('neonSize');
const fontSelect = document.getElementById('neonFont'); 
const priceDisplay = document.getElementById('price');

// قائمة الألوان المتاحة لتسهيل حذف الفئات القديمة
const availableColors = ['red', 'blue', 'green', 'pink', 'yellow'];

// سعر القاعدة والتكلفة: يمكنك تعديلها حسب متطلباتك (بالدينار الأردني JOD)
const BASE_PRICE = 50; 
const PRICE_PER_CHAR = 5; 

// -----------------------------------------------------------------
// 1. الدالة الأساسية لحساب السعر
// -----------------------------------------------------------------

function calculatePrice() {
    const text = textInput.value.trim();
    const charCount = text.replace(/\s/g, '').length; 
    let total = BASE_PRICE + (charCount * PRICE_PER_CHAR);
    
    const sizeValue = parseInt(sizeInput.value); 
    const sizeFactor = 1 + ((sizeValue - 40) / 100); 
    
    total = total * sizeFactor;

    priceDisplay.textContent = `${total.toFixed(2)} JOD`;
}

// -----------------------------------------------------------------
// 2. تحديث مكون النيون (ربط الإدخالات بفئات CSS)
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
    
    // 4. تحديث الخط (الذي كان لا يعمل)
    neonElement.style.fontFamily = `'${font}', sans-serif`; 
    
    // بعد التحديث، يجب إعادة حساب السعر
    calculatePrice();
}

// -----------------------------------------------------------------
// 3. الاستماع لأحداث المستخدم (Listeners)
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
