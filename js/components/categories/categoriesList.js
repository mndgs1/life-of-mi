import renderMessage from "../common/renderMessage.js";
import { getCategories } from "../../api/posts/index.js";
import postList from "../posts/postList.js";
import postCarousel from "../posts/postCarousel.js";

export let categories;
// posts categories to HTML
export default async function postCategories() {
    const { data, error } = await getCategories();

    if (error) {
        return renderMessage(error, "error", ".categories");
    }
    categories = data;
    displayCategories(data);
}

// displays category list
function displayCategories(categories) {
    if (!Array.isArray(categories) || categories.length === 0) {
        return renderMessage("There are no categories to display", "warning", ".categories");
    }

    createCategoryList(categories);
}

// creates category list
function createCategoryList(categories, container = ".categories") {
    const parent = document.querySelector(container);
    parent.innerHTML = "";
    const categoryElements = categories.map((category) => createCategoryElement(category));
    for (let i = categoryElements.length - 1; i >= 0; i--) {
        parent.appendChild(categoryElements[i]);
    }
}

// creates category element
function createCategoryElement(category) {
    const categoryInput = document.createElement("input");
    categoryInput.classList.add("category__radio");
    categoryInput.setAttribute("type", "radio");
    categoryInput.setAttribute("id", category.id);
    categoryInput.setAttribute("value", category.name);
    categoryInput.setAttribute("name", "categories");

    const categoryLabel = document.createElement("label");
    categoryLabel.classList.add("category__label");
    categoryLabel.setAttribute("for", category.id);

    categoryLabel.innerHTML = category.name;

    addCategoryEventListener(categoryInput);

    const listItem = document.createElement("li");
    listItem.appendChild(categoryInput);
    listItem.appendChild(categoryLabel);

    if (category.name === "Uncategorized") {
        categoryInput.checked = "true";
        categoryLabel.innerHTML = "All";
    }
    return listItem;
}

// adds event listener to category element
function addCategoryEventListener(categoryInput) {
    categoryInput.addEventListener("change", (e) => {
        e.preventDefault();

        const searchMessage = document.querySelector(".searchbar__message");
        if (searchMessage) {
            searchMessage.innerHTML = "";
        }
        const path = window.location.pathname;
        if (path === "/index.html") {
            postCarousel(categoryInput.id);
        } else {
            postList(categoryInput.id);
        }
    });
}
