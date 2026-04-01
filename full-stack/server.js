const express = require('express');
const cors = require('cors');
const dbOperation = require('./dbFiles/dbOperation');
const Employee = require('./dbFiles/employee');

const API_PORT = process.env.PORT || 5000; // Use the environment variable PORT if available, otherwise default to 5000. Typically do not want to hardcode values in production environments.
const app = express();

app.use(cors()); //Allows us to connect our frontend to backend
app.use(express.json()); //Allows us to parse JSON data in the request body, enabling us to handle incoming JSON payloads from clients.
app.use(express.urlencoded()); //Allows us to parse URL-encoded data, which is commonly used in form submissions. This middleware enables the server to handle data sent in the body of POST requests.

//=========================================================================================================================================================================================================

// app.get('/api', (req, res) => { //Defines a GET endpoint at /api. When this endpoint is hit, it executes the provided callback function.
//     console.log("API called"); // Logs a message to the console when the API endpoint is called.
//     res.send({result: "Hello"}); //Sends a JSON response with a key "result" and value "Hello" back to the client.
// });

// app.get('/quit', (req, res) => { 
//     console.log("Called it quits"); 
//     res.send({result: "Goodbye"}); 
// });

// let Leslie = new Employee(1002, 'Leslie', 'Knope', 35, 'Female');
// let April = new Employee(1003, 'April', 'Ludgate', 18, 'Female');

// dbOperation.createEmployee(Leslie); // Calls the createEmployee function from the dbOperation module to insert a new employee (Leslie) into the database.
// dbOperation.createEmployee(April);

// dbOperation.getEmployees().then(res => { // Calls the getEmployees function from the dbOperation module to fetch employee data from the database.
//     console.log(res.recordset);
// }); 

//=========================================================================================================================================================================================================

app.post('/api', async(req, res) => { 
    const result = await dbOperation.getEmployees(req.body.name); // Calls the getEmployees function from the dbOperation module, passing the name from the request body as an argument. This function is expected to return employee data based on the provided name.
    res.send(result.recordset); 
});

app.get('/api', async(req, res) => { 
    const result = await dbOperation.getAllEmployees(); // Calls the getAllEmployees function from the dbOperation module to fetch all employee data from the database.
    res.send(result.recordset); 
});

app.post('/create', async(req, res) => { 
    await dbOperation.createEmployee(req.body);
    const result = await dbOperation.getEmployees(req.body.FirstName);
    res.send(result.recordset); 
});




app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`)); //Starts the server and listens on the specified port. Logs a message to the console when the server is running.