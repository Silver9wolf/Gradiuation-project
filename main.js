fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav ul li a").forEach(link => {
      if(link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });

console.log("Main script loaded");
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

