const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { async } = require('rxjs');
// const { allDepts, allRoles, allEmployees } =require('./sqls');



    init = () => {
        mainMenu();
    }

function mainMenu() {
    console.clear();
    inquirer.prompt(
      [
          {
              type: 'rawlist',
              name: 'doWhat',
            message: 'What would you like to do?',
            choices: [
                {   
                  
                    name:'View All Departments',
                    value: 1
                },
                {
                  
                    name:'View All Roles', 
                    value: 2
                },  
                {   
                  
                    name:'View All Employees',
                    value: 3
                },  
                {
                 
                    name:'Add a Department',
                    value: 4
                },  
                {
                 
                    name:'Add a role',
                    value: 5
                },
                {
                 
                    name:'Add an employee',
                    value: 6
                },
                {
                    name:'Update an employee role',
                    value: 7
                },
                {
                    name:'Exit',
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
            case 4: 
                deptAdd();
                break;
            case 5: 
                roleAdd();
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

function sendDB(statement, arg1, arg2, arg3, arg4) {
db.query(statement,[arg1,arg2,arg3,arg4], (err, result) => {
    if (err) {
        console.log(err);
    }; 
    if (statement.includes('SELECT')){
    console.table(result);
    }; 
    goBack();
    });
}

async function viewData(sql) {
    try {
      return await db.promise().query(sql);
    } catch (err) {
      console.log(err);
    }
  }

function deptAdd () {
    console.clear();
    inquirer.prompt(
      [
          {
              type: 'input',
              name: 'dept_name',
            message: 'What is the new department name?',
          }
      ]
).then(answers => {
    sendDB(addDept, answers.dept_name);
    console.log("DB Updated");
});
}

async function roleAdd () {
    console.clear();
    let deptArry =[];
    const depts= await viewData(allDepts)
    console.log(depts);
    inquirer.prompt(
      [
          {
              type: 'input',
              name: 'role_name',
            message: 'What is the new role name?',
          },
          {
            type: 'input',
            name: 'role_salary',
          message: 'What is the new role salary?',
        },
        {
            type: 'list',
            name: 'dept_name',
          message: 'What is the new department name?',
          choices: depts[0].map((item) => item.name),
        },
      ]
).then(answers => {
    
    sendDB(addRole, answers.role_name, answers.role_salary, answers.dept_name.id);
    console.log("DB Updated");
});
}

init();