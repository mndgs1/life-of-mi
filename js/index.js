import postComments from "./components/postSpecific/comment-section/postComments.js";
import commentFormListeners from "./components/postSpecific/comment-section/commentFormListeners.js";
import postDetailed from "./components/postSpecific/post.js";
import postList from "../js/components/posts/postList.js";
import postCategories from "./components/categories/categoriesList.js";
import menuToggle from "./components/common/menuBars.js";
import postCarousel from "./components/posts/postCarousel.js";
import addContactListeners from "./components/contact/contactFormListeners.js";
import searchPosts from "./components/posts/searchBar.js";

function router() {
    const path = window.location.pathname;

    menuToggle();

    switch (path) {
        case "/":
            postCategories();
            postCarousel();
            return;
        case "/index.html":
            postCategories();
            postCarousel();
            return;
        case "/blogs.html":
            postCategories();
            postList();
            searchPosts();
            return;
        case "/blog.html":
            postComments();
            postDetailed();
            commentFormListeners();
            return;
        case "/contact.html":
            addContactListeners();
            return;
    }
}

router();
