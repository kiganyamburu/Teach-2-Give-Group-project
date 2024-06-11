document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container') as HTMLElement;
    const signUpBtn = document.getElementById('signUp') as HTMLElement;
    const signInBtn = document.getElementById('signIn') as HTMLElement;
    const signUpForm = document.getElementById('signUpForm') as HTMLFormElement;
    const signInForm = document.getElementById('signInForm') as HTMLFormElement;

    if (signUpBtn && signInBtn && signUpForm && signInForm) {
        signUpBtn.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInBtn.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });

        signUpForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(signUpForm);
            const data: { [key: string]: string } = {};
            formData.forEach((value, key) => {
                data[key] = value.toString();
            });

            console.log('Sign Up Form Data:', data); // Log form data before sending

            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error:', error);
            }
        });

        signInForm.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const formData = new FormData(signInForm);
            const data: { [key: string]: string } = {};
            formData.forEach((value, key) => {
                data[key] = value.toString();
            });
        
            console.log('Sign In Form Data:', data); // Log form data before sending
        
            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                const result = await response.json();
                console.log(result);
        
                // Check if login was successful
                if (response.ok) {
                    // Save the token to local storage or cookies
                    localStorage.setItem('token', result.token);
        
                    // Redirect based on user role
                    if (result.role === 'superadmin') {
                        window.location.href = 'http://localhost:3001/admin-dashboard.html';
                    } else {
                        window.location.href = 'http://localhost:3001/user-dashboard.html';
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});