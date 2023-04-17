// adds toggle states for menu bars
export default function menuBarsEvent() {
    const menuBars = document.querySelector(".bars");
    const menu = document.querySelector(".menu");

    menuBars.addEventListener("click", (e) => {
        menuToggle([menuBars, menu]);
    });
}

// toggles between menu states on mobile
function menuToggle(elementsArray) {
    const loadedEl = document.querySelector(".loaded");
    if (loadedEl) {
        loadedEl.classList.remove("loaded");
    }

    elementsArray.forEach((el) => {
        if (el.classList.contains("not-active")) {
            el.classList.replace("not-active", "active");
        } else {
            el.classList.replace("active", "not-active");
        }
    });
}
