import React, { useEffect,useState } from "react";
import { userType } from "../atoms";
import { useSetRecoilState ,useRecoilState} from 'recoil'

export function PatientViewVaccine() { 
  const [userinfo, setUserinfo] = useRecoilState(userType);
  const  patient=userinfo[0]
    console.log("patient: ",patient)

    const [patientsInfo, setPatientsInfo] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*")
    myHeaders.append("Content-Type", "application/json");
    
    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   mode: 'cors',
    //   redirect: 'follow'
    // };

    useEffect(() => {

        console.log(patient["patient_id"])

        const data={"id":patient["patient_id"]}
        console.log(data)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify( data )  
          };
        fetch("http://localhost:3000/getPatientAppointmentsDetails", requestOptions)
          .then(response => response.json())
          .then(result => {setPatientsInfo(result) ;console.log(result)
        })
          .catch(error => console.log('error', error));
        }, []);


    return(
    <>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
        Patient Profile
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the patient.
        </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patient["f_name"]} {patient["mi"]} {patient["l_name"]}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Patient ID
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patient["patient_id"]}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {patient["phone_no"]}
                </dd>
            </div>
        
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {patient["address"]}
                </dd>
            </div>
        </dl>
    </div>
</div>

<div class="bg-white overflow-hidden shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
        Vaccination Schedule
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Upcoming Appointments:
        </p>
    </div>

 


 <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                <th scope="col" class="px-6 py-3">
                    Vaccine
                </th>
             
               
            </tr>
        </thead>
        <tbody>
        {patientsInfo.map((pInfo)=>pInfo["vaccine_record_status"]==="Incomplete" && 
     
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               
     <td class="px-6 py-4">
         {pInfo["date"]}
     </td>
     <td class="px-6 py-4">
         {pInfo["start_time"]}
     </td>
     <td class="px-6 py-4">
     {pInfo["name"]} by   {pInfo["company_name"]} Dose Number:{pInfo["dose_number"]}
     </td>
     
   
  
 </tr>
         
 )}
            
        </tbody>
    </table>
    <div class="px-4 py-5 sm:px-6">
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
    Vaccination History:
        </p>
        </div>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                <th scope="col" class="px-6 py-3">
                    Vaccine
                </th>
             
               
            </tr>
        </thead>
        <tbody>
        {patientsInfo.map((pInfo)=>pInfo["vaccine_record_status"]==="Completed" && 
     
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               
     <td class="px-6 py-4">
         {pInfo["date"]}
     </td>
     <td class="px-6 py-4">
         {pInfo["start_time"]}
     </td>
     <td class="px-6 py-4">
     {pInfo["name"]} by   {pInfo["company_name"]} Dose Number:{pInfo["dose_number"]}
     </td>
     
   
  
 </tr>
         
 )}
            
        </tbody>
    </table>



    {/* <div class=" m-5 border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Date 
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {pInfo["date"]}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Time
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {pInfo["start_time"]}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Vaccine
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {pInfo["name"]} by   {pInfo["company_name"]}
                </dd>
            </div>
        </dl>
    </div> */}
    
</div>
    </>)}