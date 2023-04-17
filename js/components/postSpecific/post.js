import fetchParams from "../../utilities/fetchParams.js";
import addModal from "../../utilities/addImgModal.js";
import { getPost } from "../../api/posts/read.js";
import renderMessage from "../common/renderMessage.js";

// fetches post data
export default async function postDetailed(id = fetchParams(), container = ".blog-container") {
    const { data, error } = await getPost(id);

    if (error) {
        return renderMessage(error, "error", ".blog-container");
    }

    displayPost(data, container);
}

// displays post elements, changes document title
function displayPost(post, container) {
    const parent = document.querySelector(container);
    parent.innerHTML = "";

    // document title and meta description
    document.title = post.title.rendered + "| Life of Mi";
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalString = post.excerpt.rendered;
    const cutString = originalString.substring(originalString.indexOf(">") + 1, originalString.indexOf(".") + 1);
    metaDescription.content = cutString;

    const postEl = createPostEl(post);
    parent.appendChild(postEl);
}

// creates post elements
function createPostEl(post) {
    const div = document.createElement("div");
    div.classList.add("blog-post");
    const headerContainer = document.createElement("h1");
    headerContainer.innerHTML = post.title.rendered;
    div.appendChild(headerContainer);

    div.innerHTML += post.content.rendered;

    const images = div.querySelectorAll("img");
    images.forEach((image) => {
        addModal(image);
    });
    return div;
}
