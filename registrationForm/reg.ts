document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm") as HTMLFormElement;
    const closeButton = document.getElementById("closeButton") as HTMLButtonElement;
    const successMessage = document.getElementById("successMessage") as HTMLDivElement;

    // Close button functionality
    closeButton.addEventListener("click", () => {
        if (registrationForm) {
            registrationForm.reset();
        }
    });

    // Form submission functionality
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
            if (registrationForm) {
                registrationForm.reset();
            }
        }, 3000); 
    });
});
