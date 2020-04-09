// require Dbfunctions file to access it's methods
const db = require("./Db.js");

// require npm package inquirer
const inquirer = require("inquirer");

// define constant questions for the inquirer prompt
const questions = [
  {
    type: "rawlist",
    message: "What would you like to do?",
    choices:
      [
        "View departments",
        "View roles",
        "View employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee",
        "Delete a department",
        "Delete a role",
        "Remove an employee",
        "Exit the program"
      ],
    name: "task"
  },
]

start();

// define a function called Start to start the program
function start() {
  // use inquirer
  inquirer
    // using inqirer's prompt method and feed in the the constant questions
    .prompt(questions)
    // use .then promise method with the answers parameter
    .then(function (answers) {
      //use a switch case function and feed in the answer received from the start function
      switch (answers.task) {
        case "View departments":
          db.viewDepartment()
            .then(function (data) {
              console.log("\n");
              console.table(data);
              start();
            })
            .catch(error => console.log(error))
          break

        case "View roles":
          db.viewRoles()
            .then(function (data) {
              console.log("\n");
              console.table(data);
              start();
            })
            .catch(error => console.log(error))
          break

        case "View employees":
          db.viewEmployees()
            .then(function (data) {
              console.log("\n");
              console.table(data);
              start();
            })
            .catch(error => console.log(error))
          break

        case "Add department":
          var addDept = [
            {
              type: "input",
              name: "deptId",
              message: "Enter a department id",
            },
            {
              type: "input",
              name: "deptName",
              message: "Enter the new department name",
            }
          ];
          inquirer
            .prompt(addDept)
            .then(function ({ deptId, deptName }) {
              db.addDepartment(deptId, deptName);
              console.log(`New department ${deptName} added`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Add role":
          var addRole = [
            {
              type: "input",
              name: "roleId",
              message: "Enter a role id",
            },
            {
              type: "input",
              name: "roleTitle",
              message: "Enter the title for the new role",
            },
            {
              type: "input",
              name: "roleSalary",
              message: "Enter the salary for the new role",
            },
            {
              type: "input",
              name: "roleDeptId",
              message: "Enter the department id for the new role",
            }
          ];
          inquirer
            .prompt(addRole)
            .then(function ({ roleId, roleTitle, roleSalary, roleDeptId }) {
              db.addRole(roleId, roleTitle, roleSalary, roleDeptId);
              console.log(`New role ${roleTitle} added`);
              start();
            })
            .catch(error => console.log(error))
          break

        case "Add employee":
          var employeeQuestions = [
            {
              type: "input",
              name: "empFirstName",
              message: "Enter the new employee's first name",
            },
            {
              type: "input",
              name: "empLastName",
              message: "Enter the new employee's last name",
            },
            {
              type: "input",
              name: "empRoleId",
              message: "Enter the new employee's role ID",
            },
            {
              type: "input",
              name: "empManagerId",
              message: "Enter the new employee's manager's ID",
            }
          ];
          inquirer
            .prompt(employeeQuestions)
            .then(function ({ empFirstName, empLastName, empRoleId, empManagerId }) {
              db.addEmployee(empFirstName, empLastName, empRoleId, empManagerId);
              console.log(`New employee ${empFirstName} ${empLastName} added`);
              start();
            })
            .catch(error => console.log(error))
          break

        case "Update employee":
          //db.viewEmployees()
          // .then(function (data) {
          //   console.log("\n");
          //   console.table(data);
          //   start();
          // })
          // .catch(error => console.log(error))
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'Select the id of the employee to update',
                name: 'employeeToUpdateId',
              },
              {
                type: 'list',
                message: 'Select what you want to UPDATE',
                name: 'columnToUpdate',
                choices: [
                  'first_name',
                  'last_name',
                  'role_id',
                  'manager_id'
                ]
              },
              {
                type: 'input',
                message: 'Enter the updated FIRST name',
                name: 'newValue',
                when: function (answer) {
                  return answer.columnToUpdate === 'first_name'
                }
              },
              {
                type: 'input',
                message: 'Enter the updated LAST name',
                name: 'newValue',
                when: function (answer) {
                  return answer.columnToUpdate === 'last_name';
                }
              },
              {
                type: 'input',
                message: 'Enter the update ROLE ID',
                name: 'newValue',
                when: function (answer) {
                  return answer.columnToUpdate === 'role_id';
                }
              },
              {
                type: 'input',
                message: 'Enter the updated MANAGER ID',
                name: 'newValue',
                when: function (answer) {
                  return answer.columnToUpdate === 'manager_id';
                }
              }
            ]).then(function ({ columnToUpdate, newValue, employeeToUpdateId }) {
              console.log('col: ' + columnToUpdate + "  newV: " + newValue + "  id: " + employeeToUpdateId)
              db.employeeToUpdate(columnToUpdate, newValue, employeeToUpdateId);
              console.log('Employee information updated');
              start();
            })
            .catch(error => console.log(error))
          break

        case "Delete a department":
          var deleteDept = [
            {
              type: "input",
              name: "deptName",
              message: "Enter the name of the department to delete",
            }
          ];
          inquirer
            .prompt(deleteDept)
            .then(function ({ deptName }) {
              db.deleteDepartment(deptName);
              console.log(`${deptName} department deleted`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Delete a role":
          var deleteRole = [
            {
              type: "input",
              name: "roleToRemove",
              message: "Enter the name of the role to delete",
            }
          ];
          inquirer
            .prompt(deleteRole)
            .then(function ({ roleToRemove }) {
              db.deleteRole(roleToRemove);
              console.log(`${roleToRemove} department deleted`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Remove an employee":
          var deleteEmp = [
            {
              type: "input",
              name: "empToRemove",
              message: "Enter the id of the employee to remove",
            }
          ];
          inquirer
            .prompt(deleteEmp)
            .then(function ({ empToRemove }) {
              db.deleteEmployee(empToRemove);
              console.log(`Employee removed`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Exit the program":
          console.log("Exiting the program")
          process.exit();

      };
    })
    .catch(function (err) {
      console.log(err);
    });
};