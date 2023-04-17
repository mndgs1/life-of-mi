import { GET } from "./constants.js";

// creates API options for different API calls
export default function createApiOptions(method = GET, contentType, headers = {}, body) {
    if (contentType) {
        headers["Content-Type"] = contentType;
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (body) {
        options.body = body;
    }
    return options;
}
