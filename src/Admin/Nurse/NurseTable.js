import React, { useEffect,useState } from "react";
import {EditNurse} from "./EditNurse";
import { NurseInfoPage } from "./NurseInfopage";
export function  NurseTable()
{

    const [nurses, setNurses] = useState([]);
    const [nurseEdit, setNurseEdit] = useState(false);
    const [nurse, setNurse] = useState([]);
    const [viewNurseinfo,setViewNurseinfo]=useState("");

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


    const deleteNurse=(id)=>{
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
    
          fetch("http://localhost:3000/deleteNurse", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result); window.location.reload(true)
        })
          .catch(error => console.log('error', error));

         
      }


useEffect(() => {
    fetch("http://localhost:3000/nurse", requestOptions)
      .then(response => response.json())
      .then(result => {setNurses(result) ;console.log(result)
    })
      .catch(error => console.log('error', error));
    }, []);

    return(
        <div> 
          {  viewNurseinfo==="" && <div>
        { !nurseEdit && 
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Employee ID
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
            </tr>
        </thead>
        <tbody>
        {nurses.map((nurse) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                    <button onClick={()=>{setViewNurseinfo("nurse");setNurse(nurse)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> {nurse["f_name"]} {nurse["mi"]} {nurse["l_name"]}</button>

                </th>

                <td class="px-6 py-4">
                    {nurse["employee_id"]}
                </td>
                <td class="px-6 py-4">
                    {nurse["user_id"]}
                </td>
                <td class="px-6 py-4">
                    {nurse["age"]}
                </td>
                <td class="px-6 py-4">
                    {nurse["gender"]}
                </td>
                <td class="px-6 py-4">
                    {nurse["address"]}
                </td>
                <td class="px-6 py-4">
                    {nurse["phone_no"]}
                </td>
             
                <td class="px-6 py-4">
                    <button onClick={()=>{setNurseEdit(true);setNurse(nurse)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
                <td class="px-6 py-4">
                    <button onClick={()=>{deleteNurse(nurse["nurse_id"])}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                </td>
            </tr>
            )}
            
        </tbody>
    </table>
</div>

        }</div>
        }

   {nurseEdit && 
   <div> 
   <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>{setNurseEdit(false)}} >Back</button>
        <EditNurse nurse={nurse}/>
        <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>{setNurseEdit(false)}} >Back</button>
        </div>
   }


{viewNurseinfo && 
 <div> 
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                   <button  onClick={()=>{setViewNurseinfo("")}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> ← Back</button>

               </th>
      <NurseInfoPage nurse={nurse}/>
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                   <button  onClick={()=>{setViewNurseinfo("")}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> ← Back</button>

               </th>
      </div>
}
        </div>
  )
}