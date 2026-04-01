const config = require('./dbConfig');
const sql = require('mssql');

const getEmployees = async (firstName) => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query(`SELECT * FROM EmployeeInformation WHERE FirstName = '${firstName}'`);
        return employees;
    } catch (error) {
        console.log(error);
    }
}

const getAllEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query('SELECT * FROM EmployeeInformation ORDER BY EmployeeID');
        return employees;
    } catch (error) {
        console.log(error);
    }
}

const createEmployee = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query(`INSERT INTO EmployeeInformation VALUES (${Employee.EmployeeID}, '${Employee.FirstName}', '${Employee.LastName}', ${Employee.Age}, '${Employee.Gender}')`);
        return employees;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    getAllEmployees
};