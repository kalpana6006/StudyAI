// ================= LOGIN =================

function openLogin() {
    document.getElementById("loginModal").classList.add("show");
}

function closeLogin() {
    document.getElementById("loginModal").classList.remove("show");
}


// Close modal when clicking outside

document
    .getElementById("loginModal")
    .addEventListener("click", function (event) {

        if (event.target === this) {
            closeLogin();
        }

    });


// ================= GET STARTED =================

function getStarted() {

    alert(
        "Welcome to StudyAI! 🚀\n\nRegistration system will be connected in the next step."
    );

}


// ================= LOGIN =================

function login(event) {

    event.preventDefault();

    alert(
        "Login functionality will be connected to the backend soon."
    );

}


// ================= DEMO =================

function watchDemo() {

    alert(
        "StudyAI Demo coming soon 🎬"
    );

}


// ================= MOBILE MENU =================

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    nav.classList.toggle("mobile-open");

}