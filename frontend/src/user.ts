document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();

            // Remove the token from local storage
            localStorage.removeItem('token');

            // Navigate back to the previous page
            window.history.back();
        });
    }
});