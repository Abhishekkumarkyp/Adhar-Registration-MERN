const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const cors = require('cors');


const app = express();
app.use(cors());

// const PORT = process.env.PORT || 3000;
const PORT = 3001;


// Helper function to generate a random numeric string of given length
function generateNumericUUID(length) {
  const digits = '0123456789';
  let numericString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    numericString += digits[randomIndex];
  }

  return numericString;
}

// Helper function to check if the numericUUID already exists in the database
async function isNumericUUIDExists(numericUUID) {
  const existingUser = await UserModel.findOne({ user_uuid: numericUUID });
  return !!existingUser; // Return true if user with this numericUUID exists, false otherwise
}

mongoose.connect('mongodb://localhost:27017/crud');

// const UserSchmea = new mongoose.Schema({
//  full_name:String,
//  date_of_birth:String,
//  address:String,
//  phone_no:String,
//  email:String,
//  age:Number,
//  user_uuid:Number,
// });

const UserSchmea = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true // Ensure email is unique across users
  },
  // age: {
  //   type: Number,
  //   required: true
  // },
  user_uuid: {
    type: String,
    required: true,
    unique: true // Ensure user_uuid is unique across users
  }
});

const UserModel = mongoose.model('users', UserSchmea);

app.use(express.json());

// Generate and store a unique UID for a new user
app.get('/getusers', async (req, res) => {
  try {
    UserModel.find({}).then(function (users) {
      res.json(users)

    }).catch(function (err) {
      console.log(err);
    })

  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

app.post('/makeuser', async (req, res) => {
  try {
    console.log(req.body);
    const user = req.body;

    let numericUUID;
    do {
      numericUUID = generateNumericUUID(16);
    } while (await isNumericUUIDExists(numericUUID));

    console.log("numericUUID :", numericUUID)

    const newUser = new UserModel({
      ...user,
      user_uuid: numericUUID // Assuming your UserModel has a field called user_uuid for this purpose
    });

    await newUser.save();
    res.json(user);
  }

  catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
