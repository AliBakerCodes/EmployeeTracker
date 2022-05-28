const inquirer = require('inquirer');
const cTable = require('console.table');
const sql= require('./sqls');
    init = () => {
        whatDo();
    }

function whatDo() {
    inquirer.prompt(
      [
          {
              type: 'list',
              name: 'doWhat',
            message: 'What would you like to do?',
            choices: [
                {   
                    key: '1',
                    name:'(1) View All Departments',
                    value: 1
                },
                {
                    key: '2',
                    name:'(2)View All Roles', 
                    value: '2'
                },  
                {   
                    key: '3',
                    name:'(3) View All Employees',
                    value: '3'
                },  
                {
                    key: '4',
                    name:'(4) View All Roles', 
                    value: '4'
                },
                {
                    key: '5',
                    name:'(5) Add a Department',
                    value: '5'
                },  
                {
                    key: '6',
                    name:'(6) Add a role',
                    value: '6'
                },
                {
                    key: '7',
                    name:'(7) Add an employee',
                    value: '7'
                },
                {
                    key: '8',
                    name:'(8) Update an employee role',
                    value: '8'
                },
                
            ],
          }
      ]
  ).then((answers) => {
      const { doWhat } = answers;
    console.log(doWhat);
      //   switch (doWhat){
    //       case: 
    //   }
  })
};
init();