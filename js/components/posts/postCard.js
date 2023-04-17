import formatDate from "../../utilities/formatDate.js";
import { categories } from "../categories/categoriesList.js";

// creates a post card element
export default function createPostElement(post) {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.id = `${post.id}`;
    const link = document.createElement("a");
    link.href = "/blog.html?id=" + post.id;
    blogCard.appendChild(link);

    const img = document.createElement("img");
    img.src = post._embedded["wp:featuredmedia"]?.[0].source_url ?? "/images/Placeholder.webp";
    img.alt = post._embedded["wp:featuredmedia"]?.[0].alt_text ?? "Placeholder";
    link.appendChild(img);

    if (categories) {
        categories.forEach((category) => {
            if (post.categories.includes(category.id)) {
                const categoryEl = document.createElement("p");
                categoryEl.classList.add("post__category");
                categoryEl.innerHTML = category.name;

                if (category.name !== "Uncategorized") {
                    link.appendChild(categoryEl);
                }
            }
        });
    }

    const date = formatDate(post.date);
    const dateEl = document.createElement("p");
    dateEl.classList.add("date");
    dateEl.innerHTML = date;
    link.appendChild(dateEl);

    const heading = document.createElement("h3");
    heading.innerHTML = post.title.rendered;
    link.appendChild(heading);

    link.innerHTML += post.excerpt.rendered;

    return blogCard;
}
