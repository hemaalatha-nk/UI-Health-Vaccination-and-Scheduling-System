import React, { useEffect,useState } from "react";
import {RegisterNurse} from "./RegisterNurse"
import {NurseTable} from "./NurseTable"
  
  export function NursePage() {

    const [newNurse, setNewNurse] = useState(false);
    return (
  
        <div> 
             {!newNurse &&
            <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>setNewNurse(!newNurse)}
            > Register Nurse</button>
      }
 
            {newNurse &&
            <div>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   
                <button  onClick={()=>{setNewNurse(!newNurse)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> ← Back</button>

            </th>
            
            <RegisterNurse/>
            </div>
  }
  {!newNurse && <NurseTable/>}
      </div>
    );
  }