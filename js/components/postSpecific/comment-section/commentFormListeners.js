import { validateInput, addEventListenersForm } from "../../../utilities/inputValidation.js";
import { sendComment } from "../../../api/comments/create.js";
import fetchParams from "../../../utilities/fetchParams.js";
import renderMessage from "../../common/renderMessage.js";
import postComments from "./postComments.js";

// packages all event listeners
export default function commentFormListeners() {
    inputsEventListeners();
    submitEventListener();
    moreCommentsEventListener();
}

// adds event listnerers to form inputs
function inputsEventListeners() {
    const allInputs = document.querySelectorAll("#comment__form input, #comment__form textarea");

    allInputs.forEach((input) => {
        addEventListenersForm(input);
    });
}

// adds event listner to submit button
function submitEventListener() {
    const submit = document.querySelector(".submit-comment");
    const allInputs = document.querySelectorAll("#comment__form input, #comment__form textarea");

    submit.addEventListener("click", (e) => {
        e.preventDefault();

        // validates if all inputs have errors
        allInputs.forEach((input) => {
            validateInput(input);
        });

        const allErrors = document.querySelectorAll(".error");

        if (allErrors.length === 0) {
            const data = inputDataToJSON(allInputs);
            sendComment(data);
            allInputs.forEach((input) => {
                input.value = "";
            });

            renderMessage("Thank you for your comment!", "success", "#comment__form");
            setTimeout(postComments, 500);
        } else {
            // can make a message box for errors
        }
    });
}

// get all input data from Comments, structure it for API, return JSON
function inputDataToJSON(allInputs) {
    const data = {
        post: null,
        author_name: null,
        author_email: null,
        content: null,
    };

    const id = fetchParams();

    data.post = parseInt(id);

    allInputs.forEach((input) => {
        if (input.id === "name") {
            data.author_name = input.value;
        }
        if (input.id === "email") {
            data.author_email = input.value;
        }
        if (input.id === "comment") {
            data.content = input.value;
        }
    });

    return JSON.stringify(data);
}

// load first 12 comments
function moreCommentsEventListener() {
    const moreComments = document.querySelector(".more-comments");

    moreComments.addEventListener("click", async (e) => {
        if (moreComments.innerHTML === "View All Comments") {
            // can create comments page where you can view all comments
        } else {
            const commentsEl = document.querySelectorAll(".comment");

            commentsEl.forEach((comment) => {
                comment.style.display = "block";
            });
        }
    });
}
