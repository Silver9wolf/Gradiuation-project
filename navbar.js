function initNavbar() {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    if (toggleBtn) {
        toggleBtn.onclick = function () {
            dropDownMenu.classList.toggle('open');
            const isOpen = dropDownMenu.classList.contains('open');
            toggleBtnIcon.classList = isOpen
                ? 'fa-solid fa-xmark'
                : 'fa-solid fa-bars';
        };
    }

    // إضافة active class للصفحة الحالية
    highlightCurrentPage();
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();
    
    // البحث في النافبار العادي
    document.querySelectorAll(".navbar .links a").forEach(link => {
        if(link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
        if (currentPage === "" || currentPage === "index.html") {
  document.querySelector('a[href="index.html"]').classList.add("active");
}

    });
    
    // البحث في القائمة المنسدلة
    document.querySelectorAll(".dropdown_menu a").forEach(link => {
        if(link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}