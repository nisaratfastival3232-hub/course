let selectedCourse = '';

// ฟังก์ชันสำหรับเลือกคอร์สและซ่อน/แสดงส่วน
function selectCourse(courseName) {
    selectedCourse = courseName;
    
    // 1. อัปเดตชื่อคอร์สที่เลือกในส่วนที่ 2
    document.getElementById('selected-course-display').textContent = selectedCourse;

    // 2. ซ่อนส่วนเลือกคอร์ส
    document.getElementById('course-selection').style.display = 'none';

    // 3. แสดงส่วนรายละเอียดการจอง
    document.getElementById('booking-details').style.display = 'block';

    // เลื่อนหน้าจอไปที่ส่วนฟอร์ม
    document.getElementById('booking-details').scrollIntoView({ behavior: 'smooth' });
}

// ฟังก์ชันจัดการการแสดงข้อมูลการชำระเงิน
document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const bankInfo = document.getElementById('bank-info');
        const qrInfo = document.getElementById('qr-info');
        
        // ซ่อนทั้งหมดก่อน
        bankInfo.style.display = 'none';
        qrInfo.style.display = 'none';

        // แสดงตามที่เลือก
        if (this.value === 'Bank_Transfer') {
            bankInfo.style.display = 'block';
        } else if (this.value === 'QR_Code') {
            qrInfo.style.display = 'block';
        }
    });
});


// ฟังก์ชันจัดการการส่งฟอร์ม
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มจริง (เพราะไม่มี Backend)

    // ดึงข้อมูล
    const diningDate = document.getElementById('dining-date').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // แปลงชื่อช่องทางชำระเงินให้เป็นข้อความที่อ่านง่าย
    let paymentText = '';
    if (paymentMethod === 'QR_Code') {
        paymentText = 'QR Code';
    } else if (paymentMethod === 'Bank_Transfer') {
        paymentText = 'โอนเงินผ่านธนาคาร (Double Chic Hotel: 1234567890)';
    }

    // แสดงผลลัพธ์การยืนยัน
    document.getElementById('confirmed-course').textContent = selectedCourse;
    document.getElementById('confirmed-date').textContent = diningDate;
    document.getElementById('confirmed-email').textContent = email;
    document.getElementById('confirmed-payment').textContent = paymentText;

    // ซ่อนส่วนรายละเอียดการจอง
    document.getElementById('booking-details').style.display = 'none';
    
    // แสดงส่วนยืนยันการจอง
    const confirmationSection = document.getElementById('confirmation');
    confirmationSection.style.display = 'block';

    // เลื่อนหน้าจอไปที่ส่วนยืนยัน
    confirmationSection.scrollIntoView({ behavior: 'smooth' });

    alert('การจองคอร์สอาหารเสร็จสมบูรณ์! โปรดตรวจสอบอีเมลของคุณ');
});