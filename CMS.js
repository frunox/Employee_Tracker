// dependencies needed
// require mysql
var mysql = require("mysql");
// require inquirer
var inquirer = require("inquirer");
// require console.table npm
// var cTable = require("console.table");

// define connection as mysql's createConnection method
var connection = mysql.createConnection({
  host: "localhost",

  // Your port
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "cms_db"
});

// using mysql's connect method- create a connection to the server
connection.connect(function (err) {
  // if there is an error connecting, throw error
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // call function below
  start();
});

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
          viewDepartment();
          break

        case "View roles":
          viewRole();
          break

        case "View employees":
          viewEmployee();
          break

        case "Add department":
          addDepartment();
          break

        case "Add role":
          addRole();
          break

        case "Add employee":
          addEmployee();
          break

        case "Update employee":
          updateEmployee();
          break

        case "Exit the progrm":
          viewEmployee();
          break;

        default:
          start();
      };
    })
    .catch(function (err) {
      console.log(err);
    });
};


// create function createDepartment
function addDepartment() {
  // console log the message below
  console.log("Creating a new department \n");
  // define variable query as the mysql method to establish a connection to the server
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
      connection.query(
        // insert a new department with the given information
        "INSERT INTO department SET ?",
        {
          id: deptId,
          name: deptName
        },
        // define an error function
        function (error, response) {
          // if there is an error, stop the program
          if (error) throw error;
          // if successful, console log the message below
          console.log(response.affectedRows + " department created \n");
          // call start function to run through task options again
          start();
        })
    })
    .catch(function (err) {
      console.log(err);
    });
};

function addRole() {
  console.log("Creating a new role \n");
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
      connection.query(
        // insert a new department with the given information
        "INSERT INTO role SET ?",
        {
          id: roleId,
          title: roleTitle,
          salary: roleSalary,
          department_id: roleDeptId
        },
        // define an error function
        function (error, response) {
          // if there is an error, stop the program
          if (error) throw error;
          // if successful, console log the message below
          console.log(response.affectedRows + " role created \n");
          // call start function to run through task options again
          start();
        })
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addEmployee() {
  console.log("Creating a new employee \n");
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
      connection.query(
        // insert a new department with the given information
        "INSERT INTO employee SET ?",
        {
          first_name: empFirstName,
          last_name: empLastName,
          role_id: empRoleId,
          manager_id: empManagerId
        },
        // define an error function
        function (error, response) {
          // if there is an error, stop the program
          if (error) throw error;
          // if successful, console log the message below
          console.log(response.affectedRows + " employee created \n");
          // call start function to run through task options again
          start();
        })
    })
    .catch(function (err) {
      console.log(err);
    });
}

function viewDepartment() {
  console.log("Selecting all departments \n");
  connection.query(
    "SELECT * FROM department",
    function (error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });

}

function viewRole() {
  console.log("Selecting all roles \n");
  connection.query(
    "SELECT * FROM role",
    function (error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function viewEmployee() {
  console.log("Selecting all employees \n");
  connection.query(
    "SELECT * FROM employee",
    function (error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function updateEmployee() {
  console.log("Updating employee information \n");
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    function (error, response) {
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " employee information updated \n");
      start();
    });
};

function endProgram() {
  process.exit();
}
