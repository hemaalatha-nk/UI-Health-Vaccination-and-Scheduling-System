import React, { useEffect,useState } from "react";
import { userType , patientNav} from "../atoms";
import { useSetRecoilState ,useRecoilState} from 'recoil'


export function PatientSchedule ( setNavTab) {
    const [timeSlot, setTimeSlot] = useState([]);
    const [vaccines, setVaccines] = useState([]);
const [dosetake,setDoseTaken]=useState("");
    const [yourSchedule, setYourSchedule] = useState([]);

    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

    const [selectedVaccine, setSelectedVaccine] = useState({"name":"","vaccine":"","discription":"","no_dose":""});

    const [userinfo, setUserinfo] = useRecoilState(userType);

    const [changeNavTab, setchangeNavTab] = useRecoilState(patientNav);

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

        const time_a=yourSchedule.filter(t=>t["time_slot_id"]===id) 
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
        .then(result => {console.log(result)
      })
        .catch(error => console.log('error', error));
      }

const youTimeSlot=(id)=>{

    const patient_id={"id":id}
    console.log(patient_id)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( patient_id )  
      };
    fetch("http://localhost:3000/patientsVaccinationSchedule", requestOptions)
    .then(response => response.json())
    .then(result => {setYourSchedule(result) ;console.log(result)
  })
    .catch(error => console.log('error', error));
}

const vaccine=()=>{
    
    fetch("http://localhost:3000/vaccine", requestOption)
    .then(response => response.json())
    .then(result => {setVaccines(result) ;console.log(result)
  })
    .catch(error => console.log('error', error));
}

const times=()=>{
    fetch("http://localhost:3000/timeSlot", requestOption)
    .then(response => response.json())
    .then(result => {setTimeSlot(result) ;console.log(result)
  })
    .catch(error => console.log('error', error));
    youTimeSlot(userinfo[0]["patient_id"])
}

    useEffect(() => {
        times()
        vaccine()
        }, []);


    useEffect(() => {
  console.log(selectedVaccine)
      }, [selectedVaccine]);


const  updateTimeSlot=(filtered)=>{
    console.log("hjhj")
    // var filtered = timeSlot.filter(tym => tym["time_slot_id"]===id);
    // filtered[0]["max_capacity"]= parseInt(filtered[0]["max_capacity"])-1 
    console.log(filtered)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( filtered[0] )  
      };

    fetch("http://localhost:3000/updateTimeSlot", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result);setchangeNavTab("Vaccine")
  })
    .catch(error => console.log('error', error));
   
}
const deleteVaccinationSchedule=(time)=>{
    const schedule_id={"id":time["schedule_id"]}
    console.log(schedule_id)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( schedule_id )  
      };

    fetch("http://localhost:3000/deleteVaccinationSchedule", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result)
  })
    .catch(error => console.log('error', error));

    var filteredd= vaccines.filter(vacc => vacc["vaccine_id"]===time["vaccine_id"]);
  console.log(vaccines,filteredd)

//   console.log(vaccines,filteredd[0]["availability"],parseInt(filteredd[0]["availability"])-1)

  filteredd[0]["availability"]=parseInt(filteredd[0]["availability"])+1;
  filteredd[0]["on_hold"]=parseInt(filteredd[0]["on_hold"])-1;
  updateVaccineOnHold(filteredd)

  filteredd = timeSlot.filter(tym => tym["time_slot_id"]===time["time_slot_id"]);
  filteredd[0]["max_capacity"]= parseInt(filteredd[0]["max_capacity"])+1 

  updateTimeSlot(filteredd)

}
const updateVaccineOnHold=(filtered)=>{
//   const vaccine_id={"id":id}

//   var filtered = vaccines.filter(vacc => vacc["vaccine_id"]===id);
//   // console.log(vaccine_id,vaccines,filtered[0]["availability"],parseInt(filtered[0]["availability"])-1)

//   filtered[0]["availability"]=parseInt(filtered[0]["availability"])-1;
//   filtered[0]["on_hold"]=parseInt(filtered[0]["on_hold"])+1;

  console.log(filtered[0],filtered[0]["availability"],parseInt(filtered[0]["availability"])-1)

  if(parseInt(filtered[0]["availability"])<0){
    alert("Hello! Soory no more vaccines left!!");

  }else{

    console.log(filtered[0]["availability"],parseInt(filtered[0]["availability"])-1)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify( filtered[0] )  
      };

    fetch("http://localhost:3000/updateVaccineOnHold", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result)
  })
    .catch(error => console.log('error', error));
    youTimeSlot(userinfo[0]["patient_id"])
}
}


const checkdose=(data,appointment_cred)=>{
  console.log(data)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    redirect: 'follow',
    body: JSON.stringify( data )  
  };

  fetch("http://localhost:3000/prevDoses", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result);
    // setDoseTaken(result.map((r) => parseInt(r["dose_no"])).reduce((acc, curr) => Math.max(acc, curr), -Infinity));
   
    checkTimeSlot(appointment_cred,result.map((r) => parseInt(r["dose_no"])).reduce((acc, curr) => Math.max(acc, curr), 0))
    // const highestNumber = 
})
  .catch(error => console.log('error', error));

}

const checkTimeSlot=(appointment_cred,doseTaken)=>{
  console.log("appointment_cred:",appointment_cred)
  const data={"patient_id":appointment_cred["patient_id"],"time_slot_id":appointment_cred["time_slot_id"]}
  // console.log(checkTimeSlot)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    redirect: 'follow',
    body: JSON.stringify( data )  
  };

  fetch("http://localhost:3000/patientvaccinationSchedulecheck", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result);
    // setDoseTaken(result.map((r) => parseInt(r["dose_no"])).reduce((acc, curr) => Math.max(acc, curr), -Infinity));
    addschedule(appointment_cred,doseTaken,result.length)
    // checkTimeSlot(appointment_cred,result.map((r) => parseInt(r["dose_no"])).reduce((acc, curr) => Math.max(acc, curr), 0))
    // const highestNumber = 
})
  .catch(error => console.log('error', error));

}

const addschedule=(appointment_cred,doseTaken,checkTimeSlot)=>{
  if(doseTaken!==0){
    console.log("P")
  }

  console.log(appointment_cred["no_dose"]>doseTaken,doseTaken,selectedVaccine["no_doses"],appointment_cred,JSON.stringify( appointment_cred ),doseTaken,selectedVaccine["no_doses"])
  if(checkTimeSlot===0){
  if(doseTaken<selectedVaccine["no_doses"]){
    console.log(appointment_cred["no_dose"],doseTaken+1)
    if(appointment_cred["no_dose"]==doseTaken+1){
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify( appointment_cred )  
    };

    fetch("http://localhost:3000/insertPatientAppointment", requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result)
  })
    .catch(error => console.log('error', error));

  //   const vaccine_id={"id":id}

    var filtered = vaccines.filter(vacc => vacc["vaccine_id"]===selectedVaccine["vaccine_id"]);
    // console.log(vaccine_id,vaccines,filtered[0]["availability"],parseInt(filtered[0]["availability"])-1)
  
    filtered[0]["availability"]=parseInt(filtered[0]["availability"])-1;
    filtered[0]["on_hold"]=parseInt(filtered[0]["on_hold"])+1;
  

    updateVaccineOnHold(filtered)


     filtered = timeSlot.filter(tym => tym["time_slot_id"]===selectedTimeSlot);
    filtered[0]["max_capacity"]= parseInt(filtered[0]["max_capacity"])-1 

    updateTimeSlot(filtered)
    console.log("take ",doseTaken+1,selectedVaccine["no_doses"],appointment_cred["no_dose"])
    }else{
      // alert("Vaccination completed!!",record);
      alert("You have entered wrong dose number "+appointment_cred["no_dose"]+", only "+selectedVaccine["no_doses"]+" to be taken, you have taken "+doseTaken+" already")
  }
} else{
  alert("all doses completed to be taken")
}
  }else{
    alert("You have already booked for this time slot")
  }
  
}
        const handleSubmit = (event) => {
          // checkdose({"patient_id":userinfo[0]["patient_id"],"vaccine_id":selectedVaccine["vaccine_id"]})

          if(selectedTimeSlot===""&&selectedVaccine===""){
            console.log("its empty")
          }
            var appointment_cred={}
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            console.log(data,selectedTimeSlot,selectedVaccine,userinfo[0]["patient_id"])

            appointment_cred["patient_id"]=userinfo[0]["patient_id"]
            appointment_cred["time_slot_id"]=selectedTimeSlot
            appointment_cred["vaccine_id"]=selectedVaccine["vaccine_id"]
            for (const value of data.entries()) {
                appointment_cred[value[0]]=value[1]
    
              console.log(value);
            }
            checkdose({"patient_id":userinfo[0]["patient_id"],"vaccine_id":selectedVaccine["vaccine_id"]},appointment_cred)

                // console.log(appointment_cred,JSON.stringify( appointment_cred ))
                // var requestOptions = {
                //     method: 'POST',
                //     headers: myHeaders,
                //     mode: 'cors',
                //     redirect: 'follow',
                //     body: JSON.stringify( appointment_cred )  
                //   };
            
                //   fetch("http://localhost:3000/insertPatientAppointment", requestOptions)
                //   .then(response => response.json())
                //   .then(result => {console.log(result)
                // })
                //   .catch(error => console.log('error', error));

                // //   const vaccine_id={"id":id}

                //   var filtered = vaccines.filter(vacc => vacc["vaccine_id"]===selectedVaccine["vaccine_id"]);
                //   // console.log(vaccine_id,vaccines,filtered[0]["availability"],parseInt(filtered[0]["availability"])-1)
                
                //   filtered[0]["availability"]=parseInt(filtered[0]["availability"])-1;
                //   filtered[0]["on_hold"]=parseInt(filtered[0]["on_hold"])+1;
                

                //   updateVaccineOnHold(filtered)


                //    filtered = timeSlot.filter(tym => tym["time_slot_id"]===selectedTimeSlot);
                //   filtered[0]["max_capacity"]= parseInt(filtered[0]["max_capacity"])-1 

                //   updateTimeSlot(filtered)
              
            // insertPatient(patient_cred)
    
          };

const insertNurseTimeSlotScheduleTable=(timeSlotInster)=>{

    console.log(timeSlotInster,timeSlotInster["time_slot_id"],userinfo[0]["patient_id"])
    var data_send={}
    data_send["time_slot_id"]=timeSlotInster["time_slot_id"]
    data_send["patient_id"]=userinfo[0]["patient_id"]

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
      .then(result => {console.log(result);setTimeSlot(timeSlot)
    })
      .catch(error => console.log('error', error));

      times()
      

}

    return(<>
    <div class="flex items-center justify-center p-12">
    <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px] bg-white">
        <form  onSubmit={handleSubmit} >
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                    Vaccine
                </label>
           <details class="dropdown">


  <summary class="m-1 btn">Select vaccine: {selectedVaccine["name"]}</summary>
 
  <ul class=" grid grid-cols-1 divide-y p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
  {vaccines.map((vacc) => 
    <li onClick={()=>{setSelectedVaccine(vacc)}} ><a>{vacc["name"]} by {vacc["company_name"]}, no_doses:{vacc["no_doses"]}, remaining {vacc["availability"]-vacc["on_hold"]}</a></li>
   
    )}
  </ul>
</details>
            </div>
            {/* <select id="time" size="5" name="timee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            { timeSlot.map((timeSlot) => 
            // date, start_time,end_time,max_capacity
            <option onClick={()=>{console.log(timeSlot["time_slot_id"]);setSelectedTimeSlot(timeSlot["time_slot_id"])}}>Date: {timeSlot["date"]} Time Slot: {timeSlot["start_time"]} Empty Slot: {timeSlot["max_capacity"]}</option>
            )}
</select> */}
   <div class="mb-5">
                <label for="no_dose" class="mb-3 block text-base font-medium text-[#07074D]">
                    Dose Number
                </label>
                <input type="text" required name="no_dose" id="no_dose" placeholder="Enter the dose number"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>

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
       
            <input id="vue-checkbox" type="checkbox" onClick={()=>{setSelectedTimeSlot(time["time_slot_id"])}} value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            </input>

            
              
    
            </tr>
            )}

            
        </tbody>
    </table>
</div>
            

            <div>
                <button 
                    class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Book Appointment
                </button>
            </div>
        </form>
    </div>
  
    {/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
               <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Time Slot
                </th>
                <th scope="col" class="px-6 py-3">
                    Vaccine
                </th>
                <th scope="col" class="px-6 py-3">
                    Dose Number
                </th>
                
            </tr>
        </thead>
        <tbody>
        {yourSchedule.map((time) =>
        <>
        
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {time["time_slot_id"]} 
                </th>
                <td class="px-6 py-4">
                    {time["vaccine_id"]}
                </td>
                <td class="px-6 py-4">
                    {time["dose_number"]}
                </td>
               
          
             
                <td class="px-6 py-4">
                    <button onClick={()=>{
                      // setNurseEdit(true);setNurse(nurse)
                      }} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
                <td class="px-6 py-4">
                    <button onClick={()=>{
                      deleteVaccinationSchedule(time)
                      }} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                </td>
            </tr>
            </>)}
            
        </tbody>
    </table>
    </div>     */}
</div>



</div>
    </>)}