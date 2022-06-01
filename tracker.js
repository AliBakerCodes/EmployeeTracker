const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const {
    db,
    ALL_DEPTS,
    ALL_ROLES,
    ALL_EMPLOYEES,
    ADD_DEPT,
    ADD_ROLE
  } = require('./connection/connection');
// const { async } = require('rxjs');
// const { allDepts, allRoles, allEmployees } =require('./sqls');



    init = () => {
        mainMenu();
    }

async function mainMenu() {
    console.clear();
    await inquirer.prompt(
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
                sendDB(ALL_DEPTS);
                break;
            case 2: 
                sendDB(ALL_ROLES);
                break;
            case 3: 
                sendDB(ALL_EMPLOYEES);
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

async function sendDB(sql, arg1,arg2,arg3) {
    const result = await db.promise().query(sql,arg1,arg2,arg3);
    if(sql.includes('SELECT')){
    console.log(cTable.getTable(result[0]));
    }
    goBack();
    
}

async function selectDb(sql) {
    try {
      return await db.promise().query(sql);
    } catch (err) {
      console.log(err);
    }
  }

async function insertDB(table, values) {
    try {
        return await db.promise().query(sql, values);
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
    sendDB(ADD_DEPT, answers.dept_name);
    console.log(`Added ${answers.dept_name} to Database`);
});
}

async function roleAdd () {
    console.clear();
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
    
    sendDB(ADD_DEPT, answers.role_name, answers.role_salary, answers.dept_name.id);
    sendDB(ALL_DEPTS)
    console.log("DB Updated");
});
}

init();