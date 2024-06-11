document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    
    if (usernameInput) {
        usernameInput.oninvalid = function(event) {
            (event.target as HTMLInputElement).setCustomValidity('Please enter your username.');
        }
    
        usernameInput.oninput = function(event) {
            (event.target as HTMLInputElement).setCustomValidity('');
        }
    }
    
    if (passwordInput) {
        passwordInput.oninvalid = function(event) {
            (event.target as HTMLInputElement).setCustomValidity('Please enter your password.');
        }
    }
});