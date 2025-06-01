import database from "#config/database.js";

try {
   await database.query(`
  CREATE TABLE users (
      id INT(11) NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      PRIMARY KEY (id)
  );
  `);
    console.log("sucessfuly create users ✅");
} catch (error) {
    console.log("❌create users table error : ", error.message);
}
process.exit();
