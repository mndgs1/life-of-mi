import { getComments } from "../../../api/comments/read.js";
import fetchParams from "../../../utilities/fetchParams.js";
import formatDate from "../../../utilities/formatDate.js";
import renderMessage from "../../common/renderMessage.js";

// posts comments to the page
export default async function postComments(id = fetchParams(), container = ".comment-list", page) {
    const { data, error } = await getComments(id, page);

    if (error) {
        return renderMessage(error, "error", ".comment-list");
    }

    displayComments(data, container);
}

// displays comments if there are any, if not adds a message
function displayComments(comments, container) {
    if (!Array.isArray(comments) || comments.length === 0) {
        return renderMessage("Be the first one to comment!", "warning", ".comment-list");
    }

    createCommentsList(comments, container);
}

// creates a list of comments shows first 3 if there are more adds a button to view first 12
function createCommentsList(comments, container) {
    const list = document.querySelector(container);
    list.innerHTML = "";

    const commentElements = comments.map((comment) => createCommentElement(comment));
    commentElements.forEach((element) => list.appendChild(element));

    if (comments.length > 3) {
        const moreCommentsButton = document.querySelector(".more-comments");
        moreCommentsButton.style.visibility = "visible";

        moreCommentsButton.addEventListener("click", (e) => {
            const comments = document.querySelectorAll(".comment");

            comments.forEach((comment) => {
                comment.style.display = "block";
                moreCommentsButton.innerHTML = "";
            });
        });
    }

    if (comments.length === 12) {
        moreCommentsButton.innerHTML = "All Comments &#187;";
        // add code for new HTML page with all comments for the selected blog
    }
}

// creates comment element
function createCommentElement(comment) {
    const commentEl = document.createElement("li");
    commentEl.classList.add("comment");

    const commentHeaderEl = document.createElement("div");
    commentHeaderEl.classList.add("comment-header");
    commentEl.appendChild(commentHeaderEl);

    const commentMeta = document.createElement("div");
    commentMeta.classList.add("comment-meta");
    commentMeta.innerHTML = `<span class="comment-author">${comment.author_name}</span>
          <span class="comment-date">${formatDate(comment.date)}</span>`;
    commentHeaderEl.appendChild(commentMeta);

    const commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");
    commentBody.innerHTML = comment.content.rendered;
    commentEl.appendChild(commentBody);
    return commentEl;
}
