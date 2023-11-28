import React, { useEffect,useState } from "react";
import {EditVaccine} from "../Admin/Vaccine/EditVaccine";
import { userType , patientNav} from "../atoms";

import { useSetRecoilState ,useRecoilState} from 'recoil'

export function  ViewPatientsAppointment()
{

    const [appointments, setAppointments] = useState([]);
    const [vaccineEdit, setVaccineEdit] = useState(false);
    const [vaccine, setVaccine] = useState([]);

    const [userinfo, setUserinfo] = useRecoilState(userType);
    const [changeNavTab, setchangeNavTab] = useRecoilState(patientNav);


    var myHeader = new Headers();
    myHeader.append("Access-Control-Allow-Origin", "*");

    console.log(userinfo)
    
    var requestOption = {
      method: 'GET',
      headers: myHeader,
      mode: 'cors',
      redirect: 'follow'
    };


    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");


    const deleteVaccine=(id)=>{
        if(vaccine["on_hold"]==="0"){
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
    
          fetch("http://localhost:3000/deleteVaccine", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result); window.location.reload(true)
        })
          .catch(error => console.log('error', error));

    } else{
        alert("Hello! Soory vaccines can not be deleted, it on on hold!!");
    }
      }

      const updateVaccineOnHold=(id)=>{
        
          console.log(id)
                    var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify( id )  
              };
        
            fetch("http://localhost:3000/updateVaccinatedOnHold", requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result)
          })
            .catch(error => console.log('error', error));
            // youTimeSlot(userinfo[0]["patient_id"])
        
        }

        const getTotalNurseVaccination=(count,is_appointment_complete,record)=>{

            if(parseInt(count["count"])<10){

                console.log(is_appointment_complete)
                if(is_appointment_complete==="Completed"){
                    alert("Vaccination completed!!",record);
            
                }else{
                console.log(record)
            
                        var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        mode: 'cors',
                        redirect: 'follow',
                        body: JSON.stringify( record )  
                      };
                
                      fetch("http://localhost:3000/insertVaccinationRecord", requestOptions)
                      .then(response => response.text())
                      .then(result => {console.log(result)
                    })
                      .catch(error => console.log('error', error));
                      updateVaccineOnHold({"vaccine_id":record["vaccine_id"]})
                }
            
            
            }else{
                alert("You are not allowed to complete the vaccination");

            }
        }
const completedVaccine=(is_appointment_complete,record)=>{
    
    // getTotalNurseVaccination
    fetch("http://localhost:3000/getTotalNurseVaccination", requestOption)
    .then(response => response.json())
    .then(result => {getTotalNurseVaccination(result[0],is_appointment_complete,record)
  })
    .catch(error => console.log('error', error));


    // console.log(is_appointment_complete)
    // if(is_appointment_complete==="Completed"){
    //     alert("Vaccination completed!!",record);

    // }else{
    // console.log(record)

    //         var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         mode: 'cors',
    //         redirect: 'follow',
    //         body: JSON.stringify( record )  
    //       };
    
    //       fetch("http://localhost:3000/insertVaccinationRecord", requestOptions)
    //       .then(response => response.text())
    //       .then(result => {console.log(result)
    //     })
    //       .catch(error => console.log('error', error));
    //       updateVaccineOnHold({"vaccine_id":record["vaccine_id"]})
    // }


}

useEffect(() => {
    setchangeNavTab("")
    fetch("http://localhost:3000/getAppointments", requestOption)
      .then(response => response.json())
      .then(result => {setAppointments(result) ;console.log(result)
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
                    Appointment ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Patient Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Date and Time
                </th>
                <th scope="col" class="px-6 py-3">
                    Vaccine
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
                <th scope="col" class="px-6 py-3">
                    Vaccination Completed
                </th>
                <th scope="col" class="px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
        {appointments.map((appointment) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {appointment["schedule_id"]} 
                </th>
                <td class="px-6 py-4">
                    {appointment["f_name"]} {appointment["mi"]} {appointment["l_name"]}
                </td>
                <td class="px-6 py-4">
                {appointment["date"]} {appointment["start_time"]}
                </td>
                <td class="px-6 py-4">
                    {appointment["name"]} by {appointment["company_name"]}
                </td>
                <td class="px-6 py-4">
                    {appointment["dose_number"]}
                </td>
                <td class="px-6 py-4">
                    {appointment["medical_history"]}
                </td>
                <td class="px-6 py-4">
                    {appointment["availability"]}
                </td>
                <td class="px-6 py-4">
                    {appointment["on_hold"]}
                </td>
             
             
                {/* <td class="px-6 py-4">
                    <button onClick={()=>{setVaccineEdit(true);setVaccine(vaccine)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td> */}

                <td class="px-6 py-4">
                    <button onClick={()=>{
                        completedVaccine(appointment["is_appointment_complete"],{"patient_id":appointment["patient_id"],"nurse_id":userinfo[0]["nurse_id"],"time_slot_id":appointment["time_slot_id"],"vaccine_id":appointment["vaccine_id"],"dose_no":appointment["dose_number"],"dose_no":appointment["dose_number"]})
                        
                        }} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                         {appointment["is_appointment_complete"]}</button>
                </td>
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
        <EditVaccine vaccine={vaccine}/>
        <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>{setVaccineEdit(false)}} >Back</button>
        </div>
   }
        </div>
  )
}