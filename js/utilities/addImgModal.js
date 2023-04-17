//add modal HTML for an image
export default function addModal(image) {
    const modal = document.querySelector("#modal");
    const modalImage = document.querySelector("#modal-image");

    if (image) {
        image.addEventListener("click", function () {
            modal.style.display = "block";
            modalImage.src = image.src;
        });
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}
