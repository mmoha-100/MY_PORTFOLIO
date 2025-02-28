// Start Navigation
const homeSection = document.querySelector(".landing");
const aboutSection = document.querySelector(".about");
const skillsSection = document.querySelector(".skills");
const projectsSection = document.querySelector(".projects");
const educationSection = document.querySelector(".education");
const contactSection = document.querySelector(".contact");

const navbar = document.querySelector(".header > ul");
const showNav = document.querySelector(".show-nav-btn");

document.body.addEventListener("click", (el) => {
    if (el.target == showNav) {
        navbar.classList.add("enabled");
        showNav.style.pointerEvents = "none";
    } else {
        navbar.classList.remove("enabled");
        showNav.style.pointerEvents = "initial";
    }
});
const navLinks = document.querySelectorAll(".header ul li a");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        whoActiveLink(link);
    });
});
function whoActiveLink(link) {
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });
    link.classList.add("active");
}
// Cant Use On Scroll 2 Times:
window.addEventListener("scroll", () => {
    if (scrollY >= homeSection.offsetTop && scrollY < aboutSection.offsetTop) {
        whoActiveLink(navLinks[0]);
    } else if (
        scrollY >= aboutSection.offsetTop &&
        scrollY < skillsSection.offsetTop
    ) {
        whoActiveLink(navLinks[1]);
    } else if (
        scrollY >= skillsSection.offsetTop &&
        scrollY < projectsSection.offsetTop
    ) {
        fillProgress(); // Two In One \\
        whoActiveLink(navLinks[2]);
    } else if (
        scrollY >= projectsSection.offsetTop &&
        scrollY < educationSection.offsetTop
    ) {
        whoActiveLink(navLinks[3]);
    } else if (
        scrollY >= educationSection.offsetTop &&
        scrollY < contactSection.offsetTop
    ) {
        whoActiveLink(navLinks[4]);
    } else if (scrollY >= contactSection.offsetTop) {
        whoActiveLink(navLinks[5]);
    }
    if (
        scrollY ==
        document.documentElement.offsetHeight -
            document.documentElement.clientHeight
    ) {
        whoActiveLink(navLinks[5]);
    }
});
// End Navigation

// Start Skills
const skillProgress = document.querySelectorAll(
    ".skills .skill .progress span"
);
function fillProgress() {
    skillProgress.forEach((progress) => {
        progress.style.width = progress.dataset.progress;
        progress.innerHTML = progress.dataset.progress;
    });
}
// End Skills

// Start Projects
const projectsContainer = document.querySelector(
    "#projects .projects-container"
);
const projects = document.querySelectorAll("#projects .project");
const filterBtns = document.querySelectorAll("#projects > .fields li");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        handleClick(btn);
    });
});
const handleClick = debounce((btn) => {
    disableSpecificBtn(btn);
    showSpecificField(btn.dataset.field);
}, 250);
function showSpecificField(field) {
    projects.forEach((project) => {
        project.classList.remove("d-none");
        if (project.dataset.field != field && field != "all") {
            project.classList.add("d-none");
        }
    });
}
function disableSpecificBtn(btn) {
    filterBtns.forEach((btn) => {
        btn.classList.remove("disabled-btn");
    });
    btn.classList.add("disabled-btn");
}
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
// End Projects

// Start Settings
const lightThemeBtn = document.querySelector(".settings .light-btn");
const darkThemeBtn = document.querySelector(".settings .dark-btn");

document.addEventListener("click", (e) => {
    if (e.target == lightThemeBtn) {
        chooseTheme("light");
    }
    if (e.target == darkThemeBtn) {
        chooseTheme("dark");
    }
});
function btnByTheme(theme) {
    if (theme == "light") {
        lightThemeBtn.classList.add("d-none");
        darkThemeBtn.classList.remove("d-none");
    } else {
        lightThemeBtn.classList.remove("d-none");
        darkThemeBtn.classList.add("d-none");
    }
}
function chooseTheme(theme) {
    if (theme == "light") {
        btnByTheme("light");
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        addTheeToLocalStorage("light");
    } else {
        btnByTheme("dark");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        addTheeToLocalStorage("dark");
    }
}
function addTheeToLocalStorage(theme) {
    localStorage.setItem("theme", theme);
}
function loadThemeFromLocalStorage() {
    let theme = localStorage.getItem("theme");
    if (theme == "light") {
        document.body.classList.remove("dark");
        document.body.classList.add(theme);
        btnByTheme("light");
    } else btnByTheme("dark");
}
loadThemeFromLocalStorage();
// End Settings
