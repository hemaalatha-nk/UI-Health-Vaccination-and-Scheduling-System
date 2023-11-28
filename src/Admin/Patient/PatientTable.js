import React, { useEffect,useState } from "react";
import { Patient_Info_Overview } from "./Patient_Info_Overview";
// import {EditPatient} from "./EditPatient";
export function  PatientTable()
{

    const [patients, setPatients] = useState([]);
    const [onclickPatient, setOnclickPatient] = useState("");
    const [patient, setPatient] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      redirect: 'follow'
    };


    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");


    const deletePatient=(id)=>{
       var deleteId={}
       deleteId["id"]=id
        console.log("deleteId",deleteId)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify( deleteId )  
          };
    
          fetch("http://localhost:3000/deletePatient", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result); window.location.reload(true)
        })
          .catch(error => console.log('error', error));

         
      }


useEffect(() => {
    fetch("http://localhost:3000/patient", requestOptions)
      .then(response => response.json())
      .then(result => {setPatients(result) ;console.log(result[0]["password"])
    })
      .catch(error => console.log('error', error));
    }, []);

    return(
        <div> 
        {onclickPatient==="" && 
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    SSN
                </th>
                <th scope="col" class="px-6 py-3">
                    User Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Age
                </th>
                <th scope="col" class="px-6 py-3">
                    Gender
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Ph Number
                </th>
                <th scope="col" class="px-6 py-3">
                Occupation Class
                </th>
                <th scope="col" class="px-6 py-3">
                Medical history
                </th>
                <th scope="col" class="px-6 py-3">
                Eligibility Status
                </th>
                <th scope="col" class="px-6 py-3">
                user_id
                </th>
                <th scope="col" class="px-6 py-3">
                occupation_class
                </th>
            </tr>
        </thead>
        <tbody>
        {patients.map((patient) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  
                    <button onClick={()=>{setOnclickPatient("info");setPatient(patient)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">  {patient["f_name"]} {patient["mi"]} {patient["l_name"]}</button>

               
                </th>
                
                <td class="px-6 py-4">
                    {patient["ssn"]}
                </td>
                <td class="px-6 py-4">
                    {patient["user_id"]}
                </td>
                <td class="px-6 py-4">
                    {patient["age"]}
                </td>
                <td class="px-6 py-4">
                    {patient["gender"]}
                </td>
                <td class="px-6 py-4">
                    {patient["address"]}
                </td>
                <td class="px-6 py-4">
                    {patient["phone_no"]}
                </td>
                <td class="px-6 py-4">
                    {patient["occupation_class"]}
                </td>
                <td class="px-6 py-4">
                    {patient["medical_history"]}
                </td>
                <td class="px-6 py-4">
                    {patient["eligibility_status"]}
                </td>
                <td class="px-6 py-4">
                    {patient["phone_no"]}
                </td>
             
                <td class="px-6 py-4">
                    <button onClick={()=>{setOnclickPatient("upDate");setPatient(patient)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
                <td class="px-6 py-4">
                    <button onClick={()=>{deletePatient(patient["patient_id"])}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                </td>
            </tr>
            )}
            
        </tbody>
    </table>
</div>

         } 
   {onclickPatient==="info" && 
   <div> 

<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                   <button  onClick={()=>{setOnclickPatient("")}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> ← Back</button>

               </th>

        <Patient_Info_Overview patient={patient}/>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                   <button  onClick={()=>{setOnclickPatient("")}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> ← Back</button>

               </th>
       
        </div>
   }
        </div>
  )
}