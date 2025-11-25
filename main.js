

// تأكد من تحميل النافبار والفوتير في كل الصفحات
document.addEventListener('DOMContentLoaded', function() {
    // تحميل النافبار
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            initNavbar(); // تشغيل النافبار الريسبونسيف
        });

    // تحميل الفوتير
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;

            // زر العودة للأعلى
            const backToTop = document.getElementById("backToTop");
            if (backToTop) {
                backToTop.addEventListener("click", () => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
            }
        });
});




// دالة للتحقق من صحة التوكن
function isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // هنا يمكن إضافة تحقق من انتهاء الصلاحية
    return true;
}

// دالة لإضافة التوكن للطلبات
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// تحديث واجهة المستخدم حسب حالة التسجيل
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const authElements = document.querySelectorAll('.auth-status');
    
    authElements.forEach(element => {
        if (user) {
            element.innerHTML = `
                <a href="profile.html" class="user-welcome">
                    <i class="fas fa-user"></i> ${user.username || user.email}
                </a>
                <a href="#" onclick="logout()" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            `;
        } else {
            element.innerHTML = `
                <a href="login.html" class="login-btn">Login</a>
                <a href="register.html" class="register-btn">Register</a>
            `;
        }
    });
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// نستدعي التحديث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
});



// زر الرجوع للأعلى
function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    if (backToTopBtn) {
        // إظهار الزر عند التمرير لأسفل 200px
        window.onscroll = function() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        // عند النقر على الزر، التمرير بسلاسة للأعلى
        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
});