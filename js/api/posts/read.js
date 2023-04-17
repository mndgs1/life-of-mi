import createApiOptions from "../createApiOptions.js";
import callApi from "../callApi.js";
import { BASE_URL, GET, APPLICATION_JSON } from "../constants.js";

// get posts from API with different parameters
export async function getPosts(category = "", page = 1, search) {
    const params = { per_page: 12, page };

    if (category === "1") {
        category = "";
    }

    if (category) {
        params.categories = category;
    }

    if (search) {
        params.search = search;
    }

    const options = createApiOptions(GET, APPLICATION_JSON, {});

    // Create a new URL object with the base URL
    const url = new URL(`${BASE_URL}posts?_embed`);

    // Append the URL parameters to the URL object
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    const response = await callApi(url, options);

    return response;
}

// gets categories names from API
export async function getCategories() {
    const options = createApiOptions(GET, APPLICATION_JSON, {});

    const url = `${BASE_URL}categories`;
    const response = await callApi(url, options);

    return response;
}

// gets post by ID from API
export async function getPost(id) {
    const options = createApiOptions(GET, APPLICATION_JSON);
    const url = `${BASE_URL}posts/${id}`;
    const response = await callApi(url, options);

    return response;
}
