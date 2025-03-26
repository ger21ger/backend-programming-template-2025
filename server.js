require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.gb15l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

app.post('/api/authentication/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: 'INVALID_PASSWORD' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({ message: 'INVALID_PASSWORD' });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY || 'secretkey',
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login success', token });
});

app.listen(3000, () => console.log('Server running on port 3000'));
