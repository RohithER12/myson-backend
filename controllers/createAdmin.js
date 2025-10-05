const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import your Admin model
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const username = 'admin@123';
    const plainPassword = 'Admin@123';

    // Generate hashed password
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);

    // Create admin user
    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();
    //console.log('Admin user created successfully!');
    //console.log('Username:', username);
    //console.log('Hashed Password:', hashedPassword);

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
