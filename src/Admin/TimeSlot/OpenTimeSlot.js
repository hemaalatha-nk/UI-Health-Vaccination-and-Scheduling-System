import React, { useEffect,useState } from "react";


import { useSetRecoilState ,useRecoilState} from 'recoil'
import { patientNav } from "../../atoms";

export function OpenTimeSlot() {

    const [timeSlots, setTimeSlots] = useState([]);
    const [changeNavTab, setchangeNavTab] = useRecoilState(patientNav);


    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");


    var myHeader = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOption = {
        method: 'GET',
        headers: myHeader,
        mode: 'cors',
        redirect: 'follow'
      };
    
  const  insertTimeSlot=(time_slot)=>{

    const all_ready_exist = timeSlots.filter((timeSlot) => time_slot["date"]===timeSlot["date"] && time_slot["start_time"]===timeSlot["start_time"] );
    console.log(all_ready_exist)


    if(all_ready_exist.length==0 ){
        
    console.log(time_slot,JSON.stringify( time_slot ))
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( time_slot )  
      };

      fetch("http://localhost:3000/insertTimeSlot", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result)
        // window.location.reload(true)
    })
      .catch(error => console.log('error', error));
    }else{
        alert("This Time Slot is already open!!");
    }
  }

//   const deleteTimeSlot=(time_slot_id)=>{
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         mode: 'cors',
//         redirect: 'follow',
//         body: JSON.stringify( {"time_slot_id":time_slot_id} )  
//       };

//       fetch("http://localhost:3000/deleteTimeSlot", requestOptions)
//       .then(response => response.text())
//       .then(result => {console.log(result); 
//         // window.location.reload(true)
//     })
//       .catch(error => console.log('error', error));
//   }

const timeSlot=()=>{
    fetch("http://localhost:3000/timeSlot", requestOption)
    .then(response => response.json())
    .then(result => {setTimeSlots(result) ;console.log(result)
  })
    .catch(error => console.log('error', error));
}

useEffect(() => {
    var today = new Date().toISOString().split('T')[0];
document.getElementsByName("date")[0].setAttribute('min', today);

timeSlot()
    }, []);

    const handleSubmit = (event) => {
      
        var time_date={}
        var time_slot={"date":"", "start_time":"","end_time":"","max_capacity":100}
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        for (const defaultValue of data.entries()) {
            time_date[defaultValue[0]]=defaultValue[1]
          console.log("now: ",defaultValue);
        }
        time_slot["date"]=time_date["date"]
        time_slot["start_time"]=time_date["timee"]
        // updateNurse(time_slot)
        // insertNurse(time_slot)
        insertTimeSlot(time_slot)

      };

    return(<> <div class="mx-auto w-full max-w-[550px] bg-white">
    <form onSubmit={handleSubmit}>
      
        <div class="m-5">
           
        <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
        Select an option
                    </label>

        {/* <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
<select id="time" size="5" required name="timee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option>9:00 am to 10:00 am </option>
<option>10:00 am to 11:00 am </option>
<option>11:00 am to 12:00 am</option>
<option>12:00 am to 1:00 pm</option>
<option>2:00  pm to 3:00 pm</option>
<option>3:00 pm to 4:00 pm</option>
<option>4:00 pm to 5:00 pm</option>
</select>
</div>

        <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
            <div class="m-5">
                        <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
                            Date
                        </label>
                        <input type="date" name="date" id="date" required
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
            </div>

      
        </div>

      

        <div>
            <button
                class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Submit
            </button>
        </div>
    </form>
    <div class="m-5"></div>
    <h4 class="text-2xl font-bold dark:text-white">Open Time Slots</h4>

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
                    Max Capacity
                </th>
              
            </tr>
        </thead>
        <tbody>
    
        {timeSlots.map((time) => 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {time["date"]} 
                </th>
                <td class="px-6 py-4">
                    {time["start_time"]}
                </td>
                <td class="px-6 py-4">
                    {time["max_capacity"]}
                </td>
             
               
                {/* <td class="px-6 py-4">
                    <button onClick={()=>{deleteTimeSlot(time["time_slot_id"])}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                </td> */}
            </tr>
            )}
            
        </tbody>
    </table>
</div>

</div></>)
}