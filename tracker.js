const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const {
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
            case 6:
                employeeAdd()
                break;
            case 7:
                updateRole()
                break;
            case 8:
                process.exit()
                break;
            default:
                break;
      }
  })
};



  async function goBack() {
    console.log('-----------------------')
    await inquirer.prompt(
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

async function selectDb(sql, arg1) {
    try {
      return await db.promise().query(sql, arg1);
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

async function deptAdd () {
    console.clear();
    await inquirer.prompt(
      [
          {
              type: 'input',
              name: 'dept_name',
            message: 'What is the new department name?',
          }
      ]
).then(async answers => {
    await sendDB(ADD_DEPT, answers.dept_name);
    console.log(`Added ${answers.dept_name} to Database`);
});
}

async function roleAdd () {
    console.clear();
    const depts= await selectDb(ALL_DEPTS)
    await inquirer.prompt(
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
).then(async answers => {
    const dept_id = await selectDb(ONE_DEPT, answers.dept_name) 
    await sendDB(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.role_name}", ${answers.role_salary}, ${dept_id[0][0].id});`);
    console.log("\nRole Added to Database\n");
    await sendDB(ALL_ROLES);
});
}

async function employeeAdd () {
    console.clear();
    const managers= await selectDb(ALL_MANAGERS)
    const roles= await selectDb(ALL_ROLES)
    await inquirer.prompt(
      [
          {
              type: 'input',
              name: 'first_name',
            message: "What is the new employee's first name?",
          },
          {
            type: 'input',
              name: 'last_name',
            message: "What is the new employee's last name?",
        },
        {
            type: 'list',
            name: 'role_name',
          messsage: "What is the new employees's role?",
          choices: roles[0].map((item) => item.title),
        },
        {
            type: 'list',
            name: 'manager_name',
          message: "Who is the new employee's manager?",
          choices: managers[0].map((item) => item.name),
        },
      ]
).then(async answers => {
    const role_id = await selectDb(ONE_ROLE, answers.role_name) 
    const managerQry = await selectDb(ONE_MANAGER, answers.manager_name)
    const manager_id = managerQry[0].map((item) => item.manager_id);
    console.log(manager_id[0])
    await sendDB(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${role_id[0][0].id}, ${manager_id});`);
    console.log("\nRole Added to Database\n");
    await sendDB(ALL_EMPLOYEES);
});
}

async function updateRole () {
  console.clear();
  // const managers= await selectDb(ALL_MANAGERS)
  const employees= await selectDb(ALL_EMPLOYEES2)
  const roles= await selectDb(ALL_ROLES)
  console.clear();
  await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'employee_name',
      message: "Which employee to update?",
      choices: employees[0].map((item) => item.name),
    },
      {
          type: 'list',
          name: 'role_name',
        messsage: "What is the new role?",
        choices: roles[0].map((item) => item.title),
      },
    ]
).then(async answers => {
  const role_id = await selectDb(ONE_ROLE, answers.role_name) 
  await sendDB(`UPDATE employee SET role_id = ${role_id[0][0].id} WHERE CONCAT_WS(" ", first_name, last_name) = "${answers.employee_name}";`);
  console.log("\nRole Added to Database\n");
  await sendDB(ALL_EMPLOYEES);
});
}

init();