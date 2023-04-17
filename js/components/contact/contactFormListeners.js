import { sendMessage } from "../../api/contact/create.js";
import { validateInput, addEventListenersForm } from "../../utilities/inputValidation.js";
import renderMessage from "../common/renderMessage.js";

export default function addContactListeners() {
    const allInputs = document.querySelectorAll("#contact__form input, #contact__form textarea");
    const form = document.querySelector("#contact__form");
    const submit = document.querySelector(".submit");

    // adds event listnerers to form inputs
    allInputs.forEach((input) => {
        addEventListenersForm(input);
    });

    // adds event listner to submit button
    submit.addEventListener("click", (e) => {
        e.preventDefault();

        const formEl = form;

        let dataObj = new FormData(formEl);

        // Passes through validation for all inputs
        allInputs.forEach((input) => {
            validateInput(input);
        });

        const allErrors = document.querySelectorAll(".error");

        if (allErrors.length === 0) {
            sendMessage(dataObj);

            allInputs.forEach((input) => {
                input.value = "";
            });

            renderMessage("Your message was sent!", "success", "#contact__form");
        } else {
            // Can add message box with all errors
        }
    });
}
