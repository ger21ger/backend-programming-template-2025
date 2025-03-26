const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model User
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

// Endpoint login
app.post('/api/authentication/login', async (req, res) => {
  const { email, password } = req.body;

  // Cari user di database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: 'INVALID_PASSWORD' });
  }

  // Verifikasi password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({ message: 'INVALID_PASSWORD' });
  }

  // Generate token
  const token = jwt.sign({ email: user.email }, 'secretkey', {
    expiresIn: '1h',
  });

  res.json({ message: 'Login success', token });
});

// Jalankan server
app.listen(3000, () => console.log('Server running on port 3000'));
