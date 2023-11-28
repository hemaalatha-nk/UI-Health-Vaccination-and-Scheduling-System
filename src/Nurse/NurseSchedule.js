import React, { useEffect,useState } from "react";
import { userType , patientNav} from "../atoms";

import { useSetRecoilState ,useRecoilState} from 'recoil'


export function NurseSchedule () {
    const [timeSlot, setTimeSlot] = useState([]);

const [onClick,setOnClick]=useState({"state":"Select","count":"0"});
    
    const [yourTimeSlot, setYourTimeSlot] = useState([]);
    const [changeNavTab, setchangeNavTab] = useRecoilState(patientNav);


    const [userinfo, setUserinfo] = useRecoilState(userType);

    var myHeader = new Headers();
    myHeader.append("Access-Control-Allow-Origin", "*");

    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");

    var requestOption = {
        method: 'GET',
        headers: myHeader,
        mode: 'cors',
        redirect: 'follow'
      };

      const deleteNurseTime=(id)=>{

        const time_a=yourTimeSlot.filter(t=>t["time_slot_id"]===id) 
        console.log("time_a:",time_a)


        const a_id={"id":time_a[0]["assingment_id"]}
        console.log(a_id)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify( a_id )  
          };
        fetch("http://localhost:3000/deleteNurseTime", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result);setchangeNavTab("nurse_info")
      })
        .catch(error => console.log('error', error));

        // times()
      }

const youTimeSlot=(id)=>{
    
    const nurse_id={"id":id}
    console.log(nurse_id)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( nurse_id )  
      };
    fetch("http://localhost:3000/nurseTimeSlots", requestOptions)
    .then(response => response.json())
    .then(result => {setYourTimeSlot(result) ;console.log(result)
  })
    .catch(error => console.log('error', error));
}

const times=()=>{
   
    console.log("times")
    fetch("http://localhost:3000/timeSlotNew", requestOption)
    .then(response => response.json())
    .then(result => {setTimeSlot(result) ;console.log(result)
  })
    .catch(error => console.log('error', error));
    youTimeSlot(userinfo[0]["nurse_id"])
}

    useEffect(() => {
        times()
        }, []);

        // useEffect(() => {
        //     times()
        //     }, [timeSlot]);

const insertNurseTimeSlotScheduleTable=(timeSlotInster)=>{

    console.log(timeSlotInster,timeSlotInster["time_slot_id"],userinfo[0]["nurse_id"])
    var data_send={}
    data_send["time_slot_id"]=timeSlotInster["time_slot_id"]
    data_send["nurse_id"]=userinfo[0]["nurse_id"]

    console.log(data_send)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( data_send )  
      };

      fetch("http://localhost:3000/insertNurseTimeSlotScheduleTable", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);setchangeNavTab("nurse_info")
    })
      .catch(error => console.log('error', error));

      times()
      
}

    return(<>
    <div class="flex items-center justify-center p-12">
 
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                Total_assignments
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    Max Capacity
                </th> */}
              
            </tr>
        </thead>
        <tbody>
    
        {timeSlot.map((time) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {time["date"]} 
                </th>
                <td class="px-6 py-4">
                    {time["start_time"]}
                </td>
                <td class="px-6 py-4">
                    {time["total_assignments"]}
                </td>
            
             { parseInt(time["total_assignments"])<12 &&
              <div>
            {yourTimeSlot.filter(t=>t["time_slot_id"]===time["time_slot_id"]).length===0 &&   
            <div>
                <td class="px-6 py-4">
                    <button onClick={()=>{insertNurseTimeSlotScheduleTable(time)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Select</button>
                </td> 
                </div>}
                {yourTimeSlot.filter(t=>t["time_slot_id"]===time["time_slot_id"]).length!==0 &&   <div>
                <td class="px-6 py-4">
                    <button onClick={()=>{deleteNurseTime(time["time_slot_id"])}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</button>
                </td> 
                </div>}
                </div>
        }{parseInt(time["total_assignments"])>=12 &&
        <td class="px-6 py-4">
            All Full
    </td> 
        }

            </tr>
            )}
            
        </tbody>
    </table>
</div>




</div>
    </>)}