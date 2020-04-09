// bring in the connection from connection.js and assign it to the variable 'connection'
const connection = require("./connection")

// create a class DB, which contains methods for working with the database based on information provided by the user
class Db {
  // constructor function with 1 property - the connection
  constructor(connection) {
    this.connection = connection
  }

  // method to view all departments
  viewDepartment() {
    console.log("Selecting all departments \n");
    // return the results of the query back to CMS.js
    return this.connection.query('SELECT * FROM department');
  }

  // method to view all roles
  viewRoles() {
    console.log("Selecting all roles \n");
    return this.connection.query("SELECT * FROM role")
  }

  // method to view all employess
  viewEmployees() {
    console.log("Selecting all employees \n");
    return this.connection.query("SELECT * FROM employee")
  }

  // method to add a new department
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

  // method to add a new role
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

  // method to add a new employee
  addEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
    console.log("Creating a new role \n");
    this.connection.query(
      // insert a new employee with the given information
      "INSERT INTO employee SET ?",
      {
        first_name: empFirstName,
        last_name: empLastName,
        role_id: empRoleId,
        manager_id: empManagerId
      })
  }

  // method to update employee information
  employeeToUpdate(columnToUpdate, newValue, employeeToUpdateId) {
    console.log("Updating employee information \n");
    // run the query to update the database
    this.connection.query(
      // UPDATE the employee table using user input
      "UPDATE employee SET ?? = ? WHERE id = ?",
      [columnToUpdate, newValue, employeeToUpdateId]
    )
  }

  // method to delete a department
  deleteDepartment(deptName) {
    console.log("Delete a department \n");
    this.connection.query(
      // delete a department based on the name provided by the user
      "DELETE FROM department WHERE name = ?",
      [deptName]
    )
  }

  // method to delete a role
  deleteRole(roleToRemove) {
    console.log(`Delete role ${roleToRemove} \n`);
    this.connection.query(
      // delete a role based on the title provided by the user
      "DELETE FROM role WHERE title = ?",
      [roleToRemove]
    )
  }

  // method to remove an employee from the database
  deleteEmployee(empToRemove) {
    console.log(`Remove employee \n`);
    this.connection.query(
      // remove a user based on the id provided by the user
      "DELETE FROM employee WHERE id = ?",
      [empToRemove]
    )
  }

}
// allow other files to use the methods in the class, along with the connection
module.exports = new Db(connection);
