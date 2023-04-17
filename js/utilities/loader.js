// create loader HTML
export default function createLoaderHTML(container) {
    const parent = document.querySelector(container);
    const loader = document.createElement("span");
    loader.classList.add("loader");
    parent.appendChild(loader);
}
