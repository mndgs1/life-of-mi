import createApiOptions from "../createApiOptions.js";
import callApi from "../callApi.js";
import { GET, APPLICATION_JSON, BASE_URL } from "../constants.js";

// gets 12 comments, most recent up top
export async function getComments(id, page = 1) {
    const params = { per_page: 12, post: id, page, order: "desc" };

    const options = createApiOptions(GET, APPLICATION_JSON, {});

    // Create a new URL object with the base URL
    const url = new URL(`${BASE_URL}comments`);

    // Append the URL parameters to the URL object
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    const response = await callApi(url, options);

    return response;
}
