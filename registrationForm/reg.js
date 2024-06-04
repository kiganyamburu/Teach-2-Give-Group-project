"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const closeButton = document.getElementById("closeButton");
    const successMessage = document.getElementById("successMessage");
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
        }, 3000); // Message displayed for 3 seconds
    });
});
