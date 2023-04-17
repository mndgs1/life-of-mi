// Fetches parameters from url
export default function fetchParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    return id;
}
