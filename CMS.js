// require Dbfunctions file to access it's methods
const db = require("./Db.js");

// require npm package inquirer
const inquirer = require("inquirer");

// provide prompts for the application's functions
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

// Start the application
start();

// define a function called Start to start the program
function start() {
  // use inquirer to ask user which function to execute
  inquirer
    // using inqirer's prompt method put questions in the terminal
    .prompt(questions)
    // use .then promise method with the answers parameter
    .then(function (answers) {
      //use a switch case function to determine what functions to execute based on the user's selection
      switch (answers.task) {
        case "View departments":
          // call method in DB.js to view departments
          db.viewDepartment()
            .then(function (data) {
              console.log("\n");
              console.table(data);
              // re-run start to determine if the user wants to continue running the app or exit
              start();
            })
            .catch(error => console.log(error))
          break

        case "View roles":
          // call methos in DB.js to view all roles
          db.viewRoles()
            .then(function (data) {
              console.log("\n");
              console.table(data);
              start();
            })
            .catch(error => console.log(error))
          break

        case "View employees":
          // call method in DB.js to view all employees
          db.viewEmployees()
            .then(function (data) {
              console.log("\n");
              console.table(data);
              start();
            })
            .catch(error => console.log(error))
          break

        case "Add department":
          // prepare questions to collect information about the new department
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
              // call method in DB.js to add a department
              db.addDepartment(deptId, deptName);
              console.log(`New department ${deptName} added`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Add role":
          // prepare questions to get information on the new role
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
              // call method in DB.js to add a new role
              db.addRole(roleId, roleTitle, roleSalary, roleDeptId);
              console.log(`New role ${roleTitle} added`);
              start();
            })
            .catch(error => console.log(error))
          break

        case "Add employee":
          // prepare questions to get information on the new employee
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
              // call the method to add a new employee
              db.addEmployee(empFirstName, empLastName, empRoleId, empManagerId);
              console.log(`New employee ${empFirstName} ${empLastName} added`);
              start();
            })
            .catch(error => console.log(error))
          break

        case "Update employee":
          // prompt user for information on which employee and what information to update
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
              // call method to update employee information
              db.employeeToUpdate(columnToUpdate, newValue, employeeToUpdateId);
              console.log('Employee information updated');
              start();
            })
            .catch(error => console.log(error))
          break

        case "Delete a department":
          // request the name of the department to delete
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
              // call the method to delete a department
              db.deleteDepartment(deptName);
              console.log(`${deptName} department deleted`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Delete a role":
          // prompt the user for the name of the role to remove
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
              // call the method to delete an employee
              db.deleteEmployee(empToRemove);
              console.log(`Employee removed`);
              start();
            })
            .catch(error => console.log(error))

          break

        case "Exit the program":
          // end the application
          console.log("Exiting the program")
          process.exit();

      };
    })
    .catch(function (err) {
      console.log(err);
    });
};