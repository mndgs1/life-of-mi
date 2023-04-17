import renderMessage from "../common/renderMessage.js";
import { getPosts } from "../../api/posts/index.js";
import createPostElement from "./postCard.js";

// Adds a list of posts to the page, checks for errors
export default async function postList(category = "", container = ".blogs__container", page = 1, search) {
    const { data, error } = await getPosts(category, page, search);

    if (error) {
        return renderMessage(error, "error", ".blogs__container");
    }

    if (page === 1) {
        const parent = document.querySelector(container);
        parent.innerHTML = "";
    }

    displayPosts(data, container, page, search);
}

// displays posts if there are any, adds a message if there are none, adds a load posts button if needed
function displayPosts(posts, container, page, search) {
    if (!Array.isArray(posts) || posts.length === 0) {
        loadPostsButton(posts, page);

        return renderMessage("There are no posts to display", "warning", ".blogs__container");
    }

    createPostList(posts, container);
    loadPostsButton(posts, page, search);
}

// creates all post elements
function createPostList(posts, container) {
    const parent = document.querySelector(container);
    const postElements = posts.map((post) => createPostElement(post));
    postElements.forEach((element) => parent.appendChild(element));
}

// displays load more posts button if needed
function loadPostsButton(posts, page, search) {
    const moreButton = document.querySelector(".load-more");

    moreButton.style.display = "none";
    const newPage = page + 1;
    if (posts.length === 12) {
        moreButton.style.display = "block";
        moreButton.onclick = (e) => {
            const categoryInputs = document.querySelectorAll(".category__radio");
            for (let i = 0; i < categoryInputs.length; i++) {
                if (categoryInputs[i].checked) {
                    postList(categoryInputs[i].id, ".blogs__container", newPage, search);
                    return;
                }
            }
        };
    }
}
