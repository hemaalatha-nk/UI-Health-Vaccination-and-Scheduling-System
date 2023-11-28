import React, { useEffect,useState } from "react";

export function NurseInfoPage(nurse) { 
    nurse=nurse["nurse"]
    console.log("nurse: ",nurse["nurse_id"])

    const [nursesInfo, setNursesInfo] = useState([]);

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

        console.log(nurse["nurse_id"])


        const nurse_id={"id":nurse["nurse_id"]}
        console.log(nurse_id)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify( nurse_id )  
          };
        fetch("http://localhost:3000/nurseTimeSlotsInfo", requestOptions)
        .then(response => response.json())
        .then(result => {setNursesInfo(result) ;console.log(result)
      })
        .catch(error => console.log('error', error));




        // const data={"id":nurse["nurse_id"]}
        // console.log(data)
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     mode: 'cors',
        //     redirect: 'follow',
        //     body: JSON.stringify( data )  
        //   };
        // fetch("http://localhost:3000/getNurseAppointmentsDetails", requestOptions)
        //   .then(response => response.json())
        //   .then(result => {setNursesInfo(result) ;console.log(result)
        // })
        //   .catch(error => console.log('error', error));
        }, []);


    return(
    <>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
        Nurse Profile
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the nurse.
        </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {nurse["f_name"]} {nurse["mi"]} {nurse["l_name"]}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Nurse ID
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {nurse["nurse_id"]}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {nurse["phone_no"]}
                </dd>
            </div>
        
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {nurse["address"]}
                </dd>
            </div>
        </dl>
    </div>
</div>

<div class="bg-white overflow-hidden shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
        Schedule
        </h3>
     
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
           
                {/* <th scope="col" class="px-6 py-3">
                    Max Capacity
                </th> */}
              
            </tr>
        </thead>
        <tbody>
    
        {nursesInfo.map((time) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {time["date"]} 
                </th>
                <td class="px-6 py-4">
                    {time["start_time"]}
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