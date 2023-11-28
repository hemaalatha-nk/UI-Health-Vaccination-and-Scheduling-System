import React, { useEffect,useState } from "react";

import { NurseEditVaccine } from "./NurseEditVaccine";
export function  NurseVaccineUpdate()
{

    const [vaccines, setVaccines] = useState([]);
    const [vaccineEdit, setVaccineEdit] = useState(false);
    const [vaccine, setVaccine] = useState([]);

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


    // const deleteVaccine=(id)=>{
    //    var deleteId={}
    //    deleteId["id"]=id
    //     console.log("deleteId",deleteId)
    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         mode: 'cors',
    //         redirect: 'follow',
    //         body: JSON.stringify( deleteId )  
    //       };
    
    //       fetch("http://localhost:3000/deleteVaccine", requestOptions)
    //       .then(response => response.text())
    //       .then(result => {console.log(result); window.location.reload(true)
    //     })
    //       .catch(error => console.log('error', error));

         
    //   }


useEffect(() => {
    fetch("http://localhost:3000/vaccine", requestOptions)
      .then(response => response.json())
      .then(result => {setVaccines(result) ;console.log(result)
    })
      .catch(error => console.log('error', error));
    }, []);

    return(
        <div> 
        {!vaccineEdit && 
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Company name
                </th>
                <th scope="col" class="px-6 py-3">
                    No Doses
                </th>
                <th scope="col" class="px-6 py-3">
                    Discription
                </th>
                <th scope="col" class="px-6 py-3">
                    Availability
                </th>
            
                <th scope="col" class="px-6 py-3">
                    On Hold
                </th>
            </tr>
        </thead>
        <tbody>
        {vaccines.map((vaccine) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {vaccine["name"]} 
                </th>
                <td class="px-6 py-4">
                    {vaccine["company_name"]}
                </td>
                <td class="px-6 py-4">
                    {vaccine["no_doses"]}
                </td>
                <td class="px-6 py-4">
                    {vaccine["discription"]}
                </td>
                <td class="px-6 py-4">
                    {vaccine["availability"]}
                </td>
                <td class="px-6 py-4">
                    {vaccine["on_hold"]}
                </td>
             
             
                <td class="px-6 py-4">
                    <button onClick={()=>{setVaccineEdit(true);setVaccine(vaccine)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
                {/* <td class="px-6 py-4">
                    <button onClick={()=>{deleteVaccine(vaccine["vaccine_id"])}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                </td> */}
            </tr>
            )}
            
        </tbody>
    </table>
</div>

        }
   {vaccineEdit && 
   <div> 
   <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>{setVaccineEdit(false)}} >Back</button>
        <NurseEditVaccine vaccine={vaccine}/>
        <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>{setVaccineEdit(false)}} >Back</button>
        </div>
   }
        </div>
  )
}