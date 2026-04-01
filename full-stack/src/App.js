import './App.css';
import React, {useState} from 'react';

function App() {
  const [returnedData, setReturnedData] = useState('Hello');

  //=========================================================================================================================================================================================================

  // const getData = async (url) => { // Defines an asynchronous function named getData that takes a URL as an argument. This function will be responsible for fetching data from the specified URL.
  //   const newData = await fetch(url, { // Uses the Fetch API to make a GET request to the specified URL. The second argument is an options object that configures the request.
  //     method: 'GET', // Specifies that the HTTP method for the request is GET.
  //     headers: { // Sets the headers for the request. In this case, it specifies that the content type is JSON and that the client accepts JSON responses.
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then(response => response.json()); // After the fetch request is made, it waits for the response and then converts it to JSON format using the .json() method. The resulting JSON data is stored in the newData variable.

  //   console.log(newData); // Logs the fetched data to the console for debugging purposes.

  //   setReturnedData(newData.result); // Updates the state variable returnedData with the value of the "result" key from the fetched data. This will trigger a re-render of the component to display the new data.
  // }

  // // getData('/api'); // Calls the getData function with the '/api' endpoint to fetch data from the backend when the component is rendered.

  // return (
  //   <div className="App">
  //     <button onClick={() => getData('/quit')}>Click Me</button>
  //     {returnedData};
  //   </div>
  // );

  //=========================================================================================================================================================================================================

    const [employee, setEmployee] = useState({
    EmployeeID: 0,
    FirstName: '',
    LastName: '',
    Age: 0,
    Gender: ''
  });

  const setInput = (e) => {
    const {name, value} = e.target;
    if (name === 'EmployeeID' || name === 'Age') {
      setEmployee(prevState => ({ // Update the employee state by spreading the previous state and updating the specific property based on the input name.
        ...prevState, // Spread the previous state to maintain other properties of the employee object.
        [name]: parseInt(value) // Convert the value to an integer before updating the state.
      }));
      return; // Exit the function after updating the state for EmployeeID or Age.
    }

    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const getData = async () => {
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: employee.FirstName
      }) // Convert the employee object to a JSON string before sending it in the request body.
    })
    .then(res => res.json());
    setReturnedData(newData[0]);
  }

  const createEmployee = async () => {
    const newData = await fetch('/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ...employee
    }) 
  })
  .then(res => res.json());
  setReturnedData(newData[0]);
}

const getAllEmployees = async () => {
  const newData = await fetch('/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json());
  console.log(newData);
  setReturnedData(newData);
}

  return (
    <div className="App">
      <input 
        type="number" 
        name="EmployeeID" 
        placeholder='Employee ID' 
        onChange={setInput}></input>
      <input 
        name="FirstName" 
        placeholder='First Name' 
        onChange={setInput}></input>
      <input 
        name="LastName" 
        placeholder='Last Name' 
        onChange={setInput}></input>
      <input 
        type="number" 
        name="Age" 
        placeholder='Age' 
        onChange={setInput}></input>
      <input 
        name="Gender" 
        placeholder='Gender' 
        onChange={setInput}></input>
      <button onClick={() => getData()}>Click Me</button>
      <button onClick={() => createEmployee()}>Create</button>
      <button onClick={() => getAllEmployees()}>Display All Employees</button>
      <p>EmployeeID: {returnedData.EmployeeID}</p>
      <p>First Name: {returnedData.FirstName}</p>
      <p>Last Name: {returnedData.LastName}</p>
      <p>Age: {returnedData.Age}</p>
      <p>Gender: {returnedData.Gender}</p>
    </div>
  );
}

export default App;
