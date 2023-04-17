import postList from "./postList.js";
import renderMessage from "../common/renderMessage.js";

// Creates functionality for search bar
export default function searchPosts() {
    const searchButton = document.querySelector(".searchbar__button");

    searchButton.addEventListener("click", (e) => {
        e.preventDefault();

        const messageContainer = document.querySelector(".searchbar__message");
        messageContainer.innerHTML = "";

        const searchInput = document.querySelector("#searchPostsInput");

        const searchTerm = searchInput.value;

        const categoriesArray = Array.from(document.querySelectorAll(".category__radio"));
        const checkedCategory = categoriesArray.find((element) => element.checked === true);

        if (checkedCategory.value === "Uncategorized") {
            return (checkedCategory.value = "All");
        }

        postList(checkedCategory.id, ".blogs__container", 1, searchTerm);
        if (searchTerm) {
            renderMessage(`Results for: ${searchTerm}`, "warning", ".searchbar__message");
            renderMessage(`In category: ${checkedCategory.value}`, "warning", ".searchbar__message");
        }

        searchInput.value = "";
    });
}
