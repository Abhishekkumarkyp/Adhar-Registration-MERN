// utils/uidGenerator.js

function generateUID() {
    let uid = '';
    const characters = '0123456789';
    const length = 16;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uid += characters[randomIndex];
    }
  
    return uid;
  }
  
  module.exports = generateUID;
  