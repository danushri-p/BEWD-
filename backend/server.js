const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { username:"alice", age:25, email:"alice@example.com", password:"securedpass" },
    { username:"bob", age:30, email: "bob@example.com", password: "securepass" },
    { username:"charlie", age:28, email: "charlie@example.com", password: "moresecuredpass" }
];

app.get('/get-user',(req,res)=>{
    const username = req.query.username;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
            }
            
})


app.put('/update-user', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
    }

    users[userIndex].password = password;
    res.json({ message: "User data updated successfully.", user: users[userIndex] });
});

app.delete('/delete-user', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
    }

    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully." });
});

app.get('/get-user', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User found.", user });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ message: "Login successful.", user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
