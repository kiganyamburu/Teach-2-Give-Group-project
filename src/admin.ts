document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboard-link');
    const customersLink = document.getElementById('customers-link');
    const newCustomersCard = document.getElementById('new-customers-card');
    const dashboardCards = document.getElementById('dashboard-cards');
    const dashboardContent = document.getElementById('dashboard-content');

    const createProjectCard = document.getElementById('create-project-card');
    const newProjectForm = document.getElementById('new-project-form') as HTMLElement;
    const createProjectForm = document.getElementById('create-project') as HTMLFormElement;
    const yourProjectsTable = (document.getElementById('your-projects-table') as HTMLTableElement).getElementsByTagName('tbody')[0];
    const overlay = document.getElementById('overlay') as HTMLElement;
    const closeFormBtn = document.getElementById('close-form') as HTMLElement;

    if (dashboardLink && customersLink && newCustomersCard && dashboardCards && dashboardContent) {
        customersLink.addEventListener('click', (event) => {
            event.preventDefault();

            
            newCustomersCard.style.display = 'block';
            dashboardContent.classList.add('hidden');
        });

        dashboardLink.addEventListener('click', (event) => {
            event.preventDefault();

            
            newCustomersCard.style.display = 'none';
            dashboardContent.classList.remove('hidden');
        });
    }

    if (createProjectCard && newProjectForm && createProjectForm && yourProjectsTable && overlay && closeFormBtn) {
        createProjectCard.addEventListener('click', () => {
            newProjectForm.classList.add('show');
            overlay.classList.add('show');
        });

        closeFormBtn.addEventListener('click', () => {
            newProjectForm.classList.remove('show');
            overlay.classList.remove('show');
        });

        overlay.addEventListener('click', () => {
            newProjectForm.classList.remove('show');
            overlay.classList.remove('show');
        });

        createProjectForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const projectName = (document.getElementById('project-name') as HTMLInputElement).value;
            const projectDate = (document.getElementById('project-date') as HTMLInputElement).value;
            const projectTeam = (document.getElementById('project-team') as HTMLInputElement).value;
            const projectStatus = (document.getElementById('project-status') as HTMLInputElement).value;

            const newRow = yourProjectsTable.insertRow();

            newRow.innerHTML = `
                <td>${projectName}</td>
                <td>${projectDate}</td>
                <td>${projectTeam}</td>
                <td>${projectStatus}</td>
                <td>
                    <span class="fas fa-edit" style="cursor: pointer; color: #35a6f7;"></span>
                    <span class="fas fa-trash" style="cursor: pointer; margin-left: 0.5rem; color:red;"></span>
                </td>
            `;

            
            createProjectForm.reset();
            newProjectForm.classList.remove('show');
            overlay.classList.remove('show');
        });
    }
});
