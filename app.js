// To run the server, use the command => node app.js

const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());


// Array to hold the users
const users = [];


// This route get all users
app.get('/users', (req, res) => {
    if (users.length > 0) {
        res.status(200).send(users); // If users exist, send the list of users
    } else {
        res.status(404).send('!You,don\'t have any users'); // If no users, return a message
    }
});


// This route add a new user
app.post('/users', (req, res) => {
    users.push(req.body); // Add a new user from the request body to the users array
    res.status(200).send('User has been created!'); // Respond with a success message
});


// This route get user information by their unique id
app.get('/users/:id', (req, res) => {
    const { id } = req.params; // Extract the id from the request parameters
    const FindUser = users.find((user) => user.id === id); // Find the user with the matching id

    if (FindUser) {
        res.status(200).send(FindUser) // If the user is found, send the user details
    } else {
        res.status(404).send('This user not found'); // If the user is not found, return an error
    }
});


// This route delete user information by their unique id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params; // Extract the id of the user to delete
    const NewUsers = users.filter((user) => user.id !== id); // Filter out the user with the matching id

    if (NewUsers.length !== users.length) {
        users.length = 0 // Clear the users array
        users.push(...NewUsers); // Re-add the remaining users after removal
        res.status(200).send('User Deleted!'); // Respond with a success message
    } else {
        res.status(404).send('User not found'); // If the user is not found, return an error
    }
});


// This route modify user information by their unique id
app.put('/users/:id', (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
    const NewInfo = req.body; // Get the new information from the request body
    const UserIndex = users.findIndex((user) => user.id === id); // Find the user index by matching the ID

    if (UserIndex !== -1) {
        // Merge the existing user data with the new information
        users[UserIndex] = { ...users[UserIndex], ...NewInfo };
        res.status(200).send('User Updated!'); // Respond with success
    } else {
        res.status(404).send('User not found'); // If the user is not found, send an error message
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})