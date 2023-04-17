import createApiOptions from "../createApiOptions.js";
import callApi from "../callApi.js";
import { POST, APPLICATION_JSON, BASE_URL } from "../constants.js";

// Sends comment to the wordpress API
export async function sendComment(data) {
    const url = new URL(`${BASE_URL}comments`);

    const options = createApiOptions(POST, APPLICATION_JSON, {}, data);
    const response = await callApi(url, options);

    return response;
}
