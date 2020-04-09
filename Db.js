const connection = require("./connection")
// const mysql = require("mysql");
// const inquirer = require("inquirer");

// create a class Dbfunctions, which contains methods for working with the database
class Db {
  constructor(connection) {
    this.connection = connection
  }

  // function to check for a name, and return it's value for the current employee
  viewDepartment() {
    console.log("Selecting all departments \n");
    return this.connection.query('SELECT * FROM department');
  }

  viewRoles() {
    console.log("Selecting all roles \n");
    return this.connection.query("SELECT * FROM role")
  }

  viewEmployees() {
    console.log("Selecting all employees \n");
    return this.connection.query("SELECT * FROM employee")
  }

  addDepartment(deptId, deptName) {
    console.log("Creating a new department \n");
    this.connection.query(
      // insert a new department with the given information
      "INSERT INTO department SET ?",
      {
        id: deptId,
        name: deptName
      })
  }

  addRole(roleId, roleTitle, roleSalary, roleDeptId) {
    console.log("Creating a new role \n");
    this.connection.query(
      // insert a new role with the given information
      "INSERT INTO role SET ?",
      {
        id: roleId,
        title: roleTitle,
        salary: roleSalary,
        department_id: roleDeptId
      })
  }

  addEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
    console.log("Creating a new role \n");
    this.connection.query(
      // insert a new role with the given information
      "INSERT INTO employee SET ?",
      {
        first_name: empFirstName,
        last_name: empLastName,
        role_id: empRoleId,
        manager_id: empManagerId
      })
  }

  employeeToUpdate(columnToUpdate, newValue, employeeToUpdateId) {
    console.log("Updating employee information \n");
    // console.log('col: ' + columnToUpdate + "  newV: " + newValue + "  id: " + employeeToUpdateId);
    this.connection.query(
      // insert a new role with the given information
      // "UPDATE employee SET last_name = 'Johnson' WHERE id = 4"
      "UPDATE employee SET ?? = ? WHERE id = ?",
      [columnToUpdate, newValue, employeeToUpdateId]
    )
  }

  // updateEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
  //   console.log("Creating a new role \n");
  //   this.connection.query(
  //     // insert a new role with the given information
  //     "INSERT INTO employee SET ?",
  //     {
  //       first_name: empFirstName,
  //       last_name: empLastName,
  //       role_id: empRoleId,
  //       manager_id: empManagerId
  //     })
  // }

};

// all code here to be available in other files
module.exports = new Db(connection);
