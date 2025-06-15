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


// INSERT INTO users (name, email, password, avatar, status, last_seen) VALUES
// ('John Smith', 'john.smith@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/men/1.jpg', 'online', '2025-06-08 14:30:00'),
// ('Sarah Johnson', 'sarah.j@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/women/2.jpg', 'offline', NULL),
// ('Michael Brown', 'michael.b@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/men/3.jpg', 'online', '2025-06-08 15:45:00'),
// ('Emily Davis', 'emily.d@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/women/4.jpg', 'offline', NULL),
// ('David Wilson', 'david.w@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/men/5.jpg', 'online', '2025-06-08 10:20:00'),
// ('Jessica Lee', 'jessica.l@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/women/6.jpg', 'offline', NULL),
// ('Robert Taylor', 'robert.t@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/men/7.jpg', 'online', '2025-06-08 09:15:00'),
// ('Olivia Martinez', 'olivia.m@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/women/8.jpg', 'offline', NULL),
// ('Daniel Clark', 'daniel.c@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/men/9.jpg', 'online', '2025-06-08 16:50:00'),
// ('Sophia Rodriguez', 'sophia.r@example.com', '$2b$10$TE86JKySaETidmSc0YJ7I.8PedBUKn0Cg44r7.wuzNopo.PL8eKuq', 'https://randomuser.me/api/portraits/women/10.jpg', 'offline', NULL);

// -- Create conversations between users
// INSERT INTO conversations (user1_id, user2_id) VALUES
// -- John Smith (1) conversations
// (1, 2),  -- John Smith and Sarah Johnson
// (1, 3),  -- John Smith and Michael Brown
// (1, 6),  -- John Smith and Jessica Lee

// -- Sarah Johnson (2) conversations
// (2, 4),  -- Sarah Johnson and Emily Davis
// (2, 7),  -- Sarah Johnson and Robert Taylor

// -- Michael Brown (3) conversations
// (3, 5),  -- Michael Brown and David Wilson
// (3, 8),  -- Michael Brown and Olivia Martinez

// -- Emily Davis (4) conversations
// (4, 9),  -- Emily Davis and Daniel Clark

// -- David Wilson (5) conversations
// (5, 10), -- David Wilson and Sophia Rodriguez

// -- Jessica Lee (6) conversations
// (6, 7),  -- Jessica Lee and Robert Taylor
// (6, 9),  -- Jessica Lee and Daniel Clark

// -- Robert Taylor (7) conversations
// (7, 10), -- Robert Taylor and Sophia Rodriguez

// -- Olivia Martinez (8) conversations
// (8, 9),  -- Olivia Martinez and Daniel Clark
// (8, 10), -- Olivia Martinez and Sophia Rodriguez

// -- Daniel Clark (9) conversations
// (9, 10); -- Daniel Clark and Sophia Rodriguez



// -- Messages for conversation between John Smith (1) and Sarah Johnson (2)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (1, 1, 'Hey Sarah, how are you doing?', TRUE),
// (1, 2, 'Hi John! I''m good, thanks for asking. How about you?', TRUE),
// (1, 1, 'Doing well! Just wanted to check if we''re still meeting tomorrow?', FALSE);

// -- Messages for conversation between John Smith (1) and Michael Brown (3)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (2, 1, 'Michael, did you get the project files I sent?', TRUE),
// (2, 3, 'Yes, got them. I''ll review tonight and send comments tomorrow', TRUE),
// (2, 1, 'Great, thanks! Let me know if you need anything else', FALSE);

// -- Messages for conversation between John Smith (1) and Jessica Lee (6)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (3, 1, 'Jessica, the design mockups look amazing!', TRUE),
// (3, 6, 'Thanks John! I''ll send you the final versions by EOD', FALSE);

// -- Messages for conversation between Sarah Johnson (2) and Emily Davis (4)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (4, 2, 'Emily, can you send me the meeting notes from yesterday?', TRUE),
// (4, 4, 'Sure thing! Just emailed them to you', FALSE);

// -- Messages for conversation between Sarah Johnson (2) and Robert Taylor (7)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (5, 2, 'Robert, are you joining us for lunch?', TRUE),
// (5, 7, 'Yes! I''ll meet you in the lobby at 12:30', FALSE);

// -- Messages for conversation between Michael Brown (3) and David Wilson (5)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (6, 3, 'Dave, the client loved your presentation!', TRUE),
// (6, 5, 'That''s great to hear! Thanks for the update', FALSE);

// -- Messages for conversation between Michael Brown (3) and Olivia Martinez (8)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (7, 3, 'Olivia, do you have the sales figures for Q2?', FALSE),
// (7, 8, 'I''ll pull those numbers and send them shortly', FALSE);

// -- Messages for conversation between Emily Davis (4) and Daniel Clark (9)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (8, 4, 'Daniel, can you review the contract draft?', TRUE),
// (8, 9, 'On it! Should have feedback by tomorrow morning', FALSE);

// -- Messages for conversation between David Wilson (5) and Sophia Rodriguez (10)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (9, 5, 'Sophia, thanks for helping with the event setup!', TRUE),
// (9, 10, 'My pleasure! It was a great success', FALSE);

// -- Messages for conversation between Jessica Lee (6) and Robert Taylor (7)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (10, 6, 'Robert, can you approve the budget request?', TRUE),
// (10, 7, 'Approved! Good to go', FALSE);

// -- Messages for conversation between Jessica Lee (6) and Daniel Clark (9)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (11, 6, 'Daniel, when are you free for a quick call?', FALSE);

// -- Messages for conversation between Robert Taylor (7) and Sophia Rodriguez (10)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (12, 7, 'Sophia, the board approved your proposal!', TRUE),
// (12, 10, 'That''s wonderful news! Thanks for the update', FALSE);

// -- Messages for conversation between Olivia Martinez (8) and Daniel Clark (9)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (13, 8, 'Daniel, can you cover my shift on Friday?', TRUE),
// (13, 9, 'Sure, no problem. I''ll take care of it', FALSE);

// -- Messages for conversation between Olivia Martinez (8) and Sophia Rodriguez (10)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (14, 8, 'Sophia, do you want to carpool to the conference?', FALSE);

// -- Messages for conversation between Daniel Clark (9) and Sophia Rodriguez (10)
// INSERT INTO messages (conversation_id, sender_id, content, is_read) VALUES
// (15, 9, 'Happy birthday Sophia! 🎉', TRUE),
// (15, 10, 'Thank you Daniel! 😊', FALSE);