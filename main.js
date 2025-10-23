

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