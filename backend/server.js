require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    user: { type: String, required: true },
    interest: { type: [String], required: true },
    age: { type: Number, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Create User
app.post('/users', [
    body('user').isString(),
    body('interest').isArray(),
    body('age').isInt(),
    body('mobile').isNumeric(),
    body('email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
});

// Read Users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Read Single User
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Update User
app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

// Delete User
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

app.listen(PORT, () => console.log('Server running on port 5000'));
