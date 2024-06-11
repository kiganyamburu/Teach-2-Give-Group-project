const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


const baseUrl = 'http://localhost:3000/api';


const registerUser = async (username, password, email, role) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/register`, {
            username,
            password,
            email,
            role
        });
        console.log(`User ${username} registered:`, response.data);
    } catch (error) {
        console.error(`Error in POST /auth/register for ${username}:`, error.response ? error.response.data : error.message);
    }
};


const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
            username,
            password
        });
        console.log(`User ${username} logged in:`, response.data);
        return response.data.token;
    } catch (error) {
        console.error(`Error in POST /auth/login for ${username}:`, error.response ? error.response.data : error.message);
    }
};


const createProject = async (token, name, description, status, assignedTo) => {
    try {
        const response = await axios.post(`${baseUrl}/projects`, {
            name,
            description,
            status,
            assignedTo
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Project created:', response.data);
    } catch (error) {
        console.error('Error in POST /projects:', error.response ? error.response.data : error.message);
    }
};


const getAllProjects = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/projects`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('All projects:', response.data);
    } catch (error) {
        console.error('Error in GET /projects:', error.response ? error.response.data : error.message);
    }
};


const updateProject = async (token, projectId, name, description, status, assignedTo) => {
    try {
        const response = await axios.put(`${baseUrl}/projects/${projectId}`, {
            name,
            description,
            status,
            assignedTo
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Project updated:', response.data);
    } catch (error) {
        console.error(`Error in PUT /projects/${projectId}:`, error.response ? error.response.data : error.message);
    }
};


const deleteProject = async (token, projectId) => {
    try {
        const response = await axios.delete(`${baseUrl}/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Project deleted:', response.data);
    } catch (error) {
        console.error(`Error in DELETE /projects/${projectId}:`, error.response ? error.response.data : error.message);
    }
};


const runTests = async () => {

    await registerUser('newadmin', 'newadminpass', 'newadmin@example.com', 'superadmin');
    const adminToken = await loginUser('newadmin', 'newadminpass');
    console.log(`Admin Token: ${adminToken}`);

    await registerUser('newuser', 'newuserpass', 'newuser@example.com', 'user');
    const userToken = await loginUser('newuser', 'newuserpass');
    console.log(`User Token: ${userToken}`);

    if (adminToken) {
        await createProject(adminToken, 'Admin Project 1', 'Description for Admin Project 1', 'In Progress', 1);
        await getAllProjects(adminToken);
        await updateProject(adminToken, 1, 'Updated Admin Project 1', 'Updated Description for Admin Project 1', 'Completed', 1);
        await deleteProject(adminToken, 1);
    }

    if (userToken) {
        await createProject(userToken, 'User Project 1', 'Description for User Project 1', 'In Progress', 2);
        await getAllProjects(userToken);
        await updateProject(userToken, 2, 'Updated User Project 1', 'Updated Description for User Project 1', 'Completed', 2);
        await deleteProject(userToken, 2);
    }
};

runTests();