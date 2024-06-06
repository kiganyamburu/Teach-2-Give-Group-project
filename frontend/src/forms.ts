document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container') as HTMLElement;
    const signUpBtn = document.getElementById('signUp') as HTMLElement;
    const signInBtn = document.getElementById('signIn') as HTMLElement;
    const signUpContainer = document.querySelector('.sign-up-container') as HTMLElement;
    const signInContainer = document.querySelector('.sign-in-container') as HTMLElement;

    if (signUpBtn && signInBtn && signUpContainer && signInContainer) {
        signUpBtn.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInBtn.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }
});
