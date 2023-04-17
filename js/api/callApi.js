// Call API function
export default async function callApi(url, options = {}) {
    let data, error;

    if (!url) {
        return (error = "No URL supplied");
    }

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            data = await response.json();
        } else {
            error = `Unsuccessful API request. Status: ${response.status}`;
        }
    } catch (err) {
        error = err;
    }

    return { data: data, error: error };
}
