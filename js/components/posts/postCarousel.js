import renderMessage from "../common/renderMessage.js";
import { getPosts } from "../../api/posts/index.js";
import createPostElement from "./postCard.js";
let slideIndex = 1;

// posts carousel to the page
export default async function postCarousel(category = "", container = ".carousel") {
    const { data, error } = await getPosts(category);
    console.log(data);

    if (error) {
        console.log("fire");
        return renderMessage(error, "error", ".carousel");
    }
    slideIndex = 1;
    displayCarousel(data, container);
}

// displays carousel, adds load more button if needed, checks if there are any posts
function displayCarousel(posts, container) {
    if (!Array.isArray(posts) || posts.length === 0) {
        return renderMessage("There are no posts to display", "warning", ".carousel");
    }

    createCarousel(posts, container);
    loadPostsButton();
}

// creates carousel element
function createCarousel(posts, container) {
    const parent = document.querySelector(container);
    parent.innerHTML = "";

    const postElements = posts.map((post) => createPostElement(post));
    createSlides(postElements, parent);
}

// creates slide elements
function createSlides(posts, container) {
    let slide, slidePosts;

    for (let i = 0; i < posts.length; i += 3) {
        slide = document.createElement("div");
        slide.classList.add("slide");
        container.appendChild(slide);

        slidePosts = posts.slice(i, i + 3);
        slidePosts.forEach((post) => {
            slide.appendChild(post);
        });

        if (slidePosts.length < 3) {
        }
    }

    const slides = document.querySelectorAll(".slide");

    if (slides.length > 1) {
        createSlideButtons(container, "&#10094;", "prev", -1);
        createSlideButtons(container, "&#10095;", "next", 1);
    }
    currentSlide(slideIndex);
}

// creates slide buttons
function createSlideButtons(container, html, type, slideArg) {
    const slidePrev = document.createElement("a");
    slidePrev.classList.add("carousel__buttons");
    slidePrev.classList.add(type);
    slidePrev.innerHTML = html;
    slidePrev.onclick = function () {
        plusSlides(slideArg);
    };
    container.appendChild(slidePrev);
}

// slides index tracker functions
function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");

    let i;

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "grid";
}

// creates a load more posts button if needed, replaces to an anchor to blogs if after first page of posts is loaded
function loadPostsButton() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 1) {
    }
    const moreButton = document.querySelector(".load-more");

    moreButton.addEventListener("click", (e) => {
        const slides = document.querySelectorAll(".slide");
        slides.forEach((slide) => {
            slide.style.display = "block";
        });

        const anchorEl = document.createElement("a");
        anchorEl.classList.add("cta");
        anchorEl.innerText = "All posts";
        anchorEl.href = "/blogs.html";

        moreButton.replaceWith(anchorEl);
    });
}
