const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password123!',
      database: 'employee'
    },
    console.log(`Connected to the employee database.`)
  );
  