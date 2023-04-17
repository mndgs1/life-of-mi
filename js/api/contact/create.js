import callApi from "../callApi.js";

// Send Contact Us message
export async function sendMessage(data) {
    const url = new URL(`http://www.mindb.no/life-of-mi/wp-json/contact-form-7/v1/contact-forms/483/feedback`);

    const options = {
        method: "POST",
        body: data,
    };

    const response = await callApi(url, options);

    return response;
}
