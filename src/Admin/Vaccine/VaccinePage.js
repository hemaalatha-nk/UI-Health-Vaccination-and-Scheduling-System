import React, { useEffect,useState } from "react";
import {NewVaccineForm} from "./NewVaccineForm"
import {VaccineTable} from "./VaccineTable"
  
  export function VaccinePage() {

    const [newVaccine, setNewVaccine] = useState(false);
    return (
        <div> 
            <button  class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-ripple-light="true" onClick={()=>setNewVaccine(!newVaccine)}
            >Add New Vaccine</button>
            {newVaccine &&
            <NewVaccineForm/>
  }
  {!newVaccine && <VaccineTable/>}
      </div>
    );
  }