import database from "#config/database.js";
try {
   await database.query(`
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    status ENUM('online', 'offline') DEFAULT 'offline',
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);
    console.log("sucessfuly create users ✅");
} catch (error) {
    console.log("❌create users table error : ", error.message);
}
try {
   await database.query(`
  CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    contact_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (contact_id) REFERENCES users(id),
    UNIQUE KEY unique_contact (user_id, contact_id)
);

  `);
    console.log("sucessfuly create content ✅");
} catch (error) {
    console.log("❌create content table error : ", error.message);
}
try {
   await database.query(`
  CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    UNIQUE KEY unique_conversation (user1_id, user2_id)
);
  `);
    console.log("sucessfuly create cpnvertsatoin ✅");
} catch (error) {
    console.log("❌create cpnvertsatoin table error : ", error.message);
}


try {
   await database.query(`
  CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);
  `);
    console.log("sucessfuly create message ✅");
} catch (error) {
    console.log("❌create message table error : ", error.message);
}


process.exit();
