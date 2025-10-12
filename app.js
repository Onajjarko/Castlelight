// الثوابت لربط عناصر HTML
const neonElement = document.getElementById('customNeon');
const textInput = document.getElementById('neonText');
const colorSelect = document.getElementById('neonColor');
const sizeInput = document.getElementById('neonSize');
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
    // إزالة المسافات وحساب عدد الأحرف
    const charCount = text.replace(/\s/g, '').length; 
    
    // حساب سعر التكلفة: السعر الأساسي + (عدد الأحرف * سعر الحرف)
    let total = BASE_PRICE + (charCount * PRICE_PER_CHAR);
    
    // تعديل السعر حسب الحجم
    const sizeValue = parseInt(sizeInput.value); 
    const sizeFactor = 1 + ((sizeValue - 40) / 100); 
    
    total = total * sizeFactor;

    // عرض السعر بالدينار الأردني (JOD) مع رقمين عشريين
    priceDisplay.textContent = `${total.toFixed(2)} JOD`;
}

// -----------------------------------------------------------------
// 2. تحديث مكون النيون (ربط الإدخالات بفئات CSS)
// -----------------------------------------------------------------

function updateNeonSign() {
    const text = textInput.value.trim() || "اكتب هنا";
    const color = colorSelect.value;
    const size = sizeInput.value;

    // 1. تحديث النص المعروض
    neonElement.textContent = text; 
    
    // 2. تغيير اللون عبر فئة CSS
    // أولاً: نحذف جميع فئات الألوان القديمة (مثال: neon-red)
    availableColors.forEach(c => neonElement.classList.remove(`neon-${c}`));
    
    // ثانياً: نضيف الفئة اللونية الجديدة
    neonElement.classList.add(`neon-${color}`); 

    // 3. تحديث الحجم (بالـ CSS)
    neonElement.style.fontSize = `${size}px`; 
    
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

// تشغيل الدالة عند تحميل الصفحة لأول مرة
window.onload = () => {
    updateNeonSign(); 
};
