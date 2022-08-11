import './App.css';
import { useState } from 'react';
import Axios from 'axios';




function App() {

  const [name, setName] =useState("");
  const [age, setAge] =useState(0);
  const [Country, setCountry] =useState("");
  const [Position, setPosition] =useState("");
  const [Wage, setWage] =useState(0);
  const [newWage, setNewWage] =useState(0);
  const [employeeList, setEmployeeList] =useState([])

  const addEmployee =( )=>{
    console.log(name);
    Axios.post('http://localhost:3003/create',{
      name:name,
      age:age,
      country:Country,
      position:Position,
      wage:Wage
      })
      .then(()=>{
        console.log("success");

        // this setEmployeeList to add employee automatically without using showbutton
        setEmployeeList([...employeeList,{
          
            name:name,
            age:age,
            country:Country,
            position:Position,
            wage:Wage
            
        }])
      })
      .catch(error => {
        console.log(error.response)
    });
  }

  const getEmployee =()=>{
    Axios.get('http://localhost:3003/employees').then((response) =>{
      setEmployeeList(response.data);
    })
  }

  const updateEmployeeWage =(id)=>{
    
    Axios.put("http://localhost:3003/update",
    {wage:newWage,id: id
    }).then((response) => {
      alert("Wages get Updating");
    }
    );
    
  };

  const deleteEmployee =(id)=>{
    Axios.delete(`http://localhost:3003/delete/${id}`).then((response)=>{
      setEmployeeList(employeeList.filter((val)=>{
        return val.id === id
      }))
    })
    alert("Deleting table")
  }

  return (
    <div className="App">
      
          <div className='information'>
                  <h1>CRUD</h1>
                  <label>Name:</label>
                  <input type="text" onChange={(event)=>{ setName(event.target.value)}}/>
                  <label>Age:</label>
                  <input type="number" onChange={(event)=>{ setAge(event.target.value)}}/>
                  <label>Country:</label>
                  <input type="text" onChange={(event)=>{ setCountry(event.target.value)}}/>
                  <label>Position:</label>
                  <input type="text" onChange={(event)=>{ setPosition(event.target.value)}}/>
                  <label>Wage</label>
                  <input type="number" onChange={(event)=>{ setWage(event.target.value)}}/>
                  <button onClick={addEmployee}>Add Employe</button>
          </div>


          <div className='employees'>
            <button onClick={getEmployee}>Show Employee</button>
                    {employeeList.map((val,key) =>{
                      return (<div className='employee'> 
                          <div>
                              <h3>Name :  {val.name}</h3>
                                <h3>Age :{val.age}</h3>
                                <h3>Country :{val.country}</h3>
                                <h3>Position :{val.position}</h3>
                                <h3>Wage :{val.wage}</h3>
                          </div>

                          <div className='final'>
                              <h2>Update Wage</h2>
                              <input type="text" placeholder='update wage' 
                                onChange={(event)=>{ setNewWage(event.target.value)}}/>
                              <button onClick={()=>{updateEmployeeWage(val.id)}}>update</button>

                              <div>
                                <button onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
                              </div>
                          </div>

                          
                        </div>)
                    })}
          </div>
    </div>
  );
}

export default App;
