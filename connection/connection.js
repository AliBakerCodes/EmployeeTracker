const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password123!",
    database: "employee",
  },
  console.log(`Connected to the employee database.`)
);

const ALL_DEPTS = "SELECT * FROM department;";
const ALL_ROLES = "SELECT * FROM role;";
const ALL_EMPLOYEES = `SELECT e.id, e.first_name as "First Name", e.last_name as "LAST NAME", r.title as "Title", d.name as 'DEPT', r.salary as "Salary", concat_ws(" ", m.first_name, m.last_name) as "Manager Name"
FROM employee e
join role r on e.role_id = r.id
left join (SELECT 
id, first_name, last_name, manager_id 
		from employee 
        where manager_id is not null) as m
		on e.id = m.manager_id
join department d on d.id = r.department_id;`;
const ALL_EMPLOYEES2= `SELECT CONCAT_WS(" ", first_name, last_name) AS name FROM employee`
const ALL_MANAGERS='SELECT concat_ws(" ", first_name, last_name) AS name FROM employee WHERE manager_id IS NOT NULL;'
const ONE_MANAGER='SELECT manager_id FROM employee WHERE CONCAT_WS(" ", first_name, last_name) = ? LIMIT 1;'
const ONE_DEPT = "SELECT id FROM department WHERE name = ? LIMIT 1"
const ONE_ROLE = "SELECT id FROM role WHERE title = ? LIMIT 1"
const ADD_DEPT = "INSERT INTO department (`name`) VALUES (?);";
const ADD_ROLE =
  "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";

  module.exports= {
    db,
    ALL_DEPTS,
    ALL_ROLES,
    ALL_EMPLOYEES,
    ALL_EMPLOYEES2,
    ADD_DEPT,
    ADD_ROLE,
    ONE_DEPT,
    ALL_MANAGERS,
    ONE_MANAGER,
    ONE_ROLE,
  }