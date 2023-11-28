import React, { useEffect,useState } from "react";
// import {RegisterPatient} from "./RegisterPatient"
import {PatientTable} from "./PatientTable"
  
  export function PatientPage() {

    console.log("papap")

    // const [newPatient, setNewPatient] = useState(false);
    return (
        <div> 
            {/* <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>setNewPatient(!newPatient)}
            >Register Patient</button>
            {newPatient && */}
          <PatientTable/>
  {/* }
  {!newPatient && <PatientTable/>} */}
      </div>
    );
  }