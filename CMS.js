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
              console.log('New department added');
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
              console.log('New role added');
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
              console.log('New employee added');
              start();
            })
            .catch(error => console.log(error))
          break

        case "Update employee":
          updateEmployee();
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



// function updateEmployee() {
//   console.log("Updating employee information \n");
//   connection.query(
//     "UPDATE employee SET ? WHERE ?",
//     function (error, response) {
//       // if there is an error, stop the program
//       if (error) throw error;
//       // if successful, console log the message below
//       console.log(response.affectedRows + " employee information updated \n");
//       start();
//     });
// };
