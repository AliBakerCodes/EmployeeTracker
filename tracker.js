const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
// const { allDepts, allRoles, allEmployees } =require('./sqls');

const allDepts = 'SELECT * FROM department';
const allRoles = 'SELECT * FROM role';
const allEmployees = `SELECT e.id, e.first_name as "First Name", e.last_name as "LAST NAME", r.title as "Title", d.name as 'DEPT', r.salary as "Salary", concat_ws(" ", m.first_name, m.last_name) as "Manager Name"
FROM employee e
join role r on e.role_id = r.id
left outer join (SELECT 
id, first_name, last_name, manager_id 
		from employee 
        where manager_id is not null) as m
		on e.id = m.manager_id
join department d on d.id = r.department_id` 

    init = () => {
        mainMenu();
    }

function mainMenu() {
    console.clear();
    inquirer.prompt(
      [
          {
              type: 'list',
              name: 'doWhat',
            message: 'What would you like to do?',
            choices: [
                {   
                  
                    name:'(1) View All Departments',
                    value: 1
                },
                {
                  
                    name:'(2) View All Roles', 
                    value: 2
                },  
                {   
                  
                    name:'(3) View All Employees',
                    value: 3
                },  
                {
                 
                    name:'(5) Add a Department',
                    value: 4
                },  
                {
                 
                    name:'(6) Add a role',
                    value: 5
                },
                {
                 
                    name:'(7) Add an employee',
                    value: 6
                },
                {
                    name:'(8) Update an employee role',
                    value: 7
                },
                {
                    name:'(8) Exit',
                    value: 8
                },
                
            ],
          }
      ]
  ).then((answers) => {
      const { doWhat } = answers;
      console.clear();
        switch (doWhat){
            case 9:
                process.exit();
                break;
            case 1: 
                sendDB(allDepts);
                break;
            case 2: 
            sendDB(allRoles);
                break;
            case 3: 
            sendDB(allEmployees);
                break;
            default:
                break;
      }
  })
};

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

  function goBack() {
    console.log('-----------------------')
    inquirer.prompt(
        [
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Press Enter to return',
                default: true,
              },
        ]).then((asnswers) => {
            mainMenu();
        });

};

function sendDB(statement, arg1, arg2) {
db.query(statement,[arg1,arg2], (err, result) => {
    if (err) {
        console.log(err);
    }
    console.table(result);
    goBack();
    });
}




init();