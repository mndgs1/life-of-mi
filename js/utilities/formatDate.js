// Format post date
export default function formatDate(dateArg) {
    const date = new Date(dateArg);
    const time = date.toTimeString();
    const timeAltered = time.substring(0, time.lastIndexOf(":"));
    const formattedDate = date.toLocaleDateString() + ", " + timeAltered;
    return formattedDate;
}
