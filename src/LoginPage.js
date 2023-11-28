import logo from './logo.svg';
import './App.css';
import { TEInput, TERipple } from "tw-elements-react";
import React, { useEffect,useState } from "react";
import axios from "axios"
// import { allTasks } from './atoms'
import { useSetRecoilState ,useRecoilState} from 'recoil'
import  NavBar from './Admin/NavBar'
// import logo from './ui_health.jpeg'
import { userType } from './atoms'
import { Switch, Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


import { useNavigate } from "react-router-dom";
import { RegisterForm } from './Patient/RegisterFrom';
// import { Route, Redirect } from 'react-router'



const LoginPage=()=> {

const [auth, setAuth] = useState([]);

const[user,setUser]=useState([]);

const [newPatient, setNewPatient] = useState(false);

const [nav, setNav] = useState("");

const [userinfo, setUserinfo] = useRecoilState(userType);

const navigate = useNavigate();
   
var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  redirect: 'follow'
};


const setTasks = useSetRecoilState(userType);

useEffect(() => {
fetch("http://localhost:3000/users", requestOptions)
  .then(response => response.json())
  .then(result => {setAuth(result) ;console.log(result[0]["password"])
})
  .catch(error => console.log('error', error));
}, []);

useEffect(() => {

  if(user[2]==="admin"){
  fetch("http://localhost:3000/users", requestOptions)
    .then(response => response.json())
    .then(result => {setAuth(result) ;console.log(result[0]["password"])
  })
    .catch(error => console.log('error', error));
}
else if(user[2]==="nurse"){
  fetch("http://localhost:3000/nurse", requestOptions)
    .then(response => response.json())
    .then(result => {setAuth(result) ;console.log(result[0]["password"])
  })
    .catch(error => console.log('error', error));
}
else if(user[2]==="patient"){
  fetch("http://localhost:3000/patient", requestOptions)
    .then(response => response.json())
    .then(result => {setAuth(result) ;console.log(result[0]["password"])
  })
    .catch(error => console.log('error', error));
}
  }, [user]);


  useEffect(() => {

    const who=auth.filter((x) => x["user_id"] === user[0] && x["password"]===user[1])
    console.log(user[0],user,auth,who.length)
    setUserinfo(who)
    if(who.length!=0){
      // setUser(who[""])
      console.log("p")
      // setTasks(user[0])
      // setNav(nav)
      navigate(`/`+user[2]);
      // navigate("/adminPage");
    }

    }, [auth]);

    useEffect(() => {

     console.log(userinfo)
  
      }, [userinfo]);


  const handleSubmit = (event) => {
    var user=[]
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.values()[0])
    for (const value of data.values()) {
       user.push(value)
      console.log(value);
    }
    setUser(user)
    // const who=auth.filter((x) => x["userid"] === user[0] && x["password"]===user[1])
    // console.log(user[0],user,auth,who.length)
   
    // if(who.length!=0){
    //   // setUser(who[""])
    //   console.log("p")
    //   // setTasks(user[0])
    //   // setNav(nav)
    //   navigate(`/adminPage`);
    //   // navigate("/adminPage");
    // }
    // Perform further actions (e.g., API calls, state updates)
  };

  return (
    <section className="h-screen">
       {/* <NavBar /> */}
    <div className="container h-full px-6 py-24">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src={require('./uih.png')}
            className="w-full"
            alt="Phone image"
          />
        </div>

        {/* <!-- Right column container with form --> */}
        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
        {!newPatient &&
          <form onSubmit={handleSubmit}>
            {/* <!-- Email input --> */}
            <div class="mb-6">
        <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Id</label>
        <input  name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   >
    </input>
    </div> 
            {/* <TEInput
              type="email"
              label="Email address"
              size="lg"
              className="mb-6"
            ></TEInput> */}
              <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" >
    </input>
    </div> 

    {/* <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Identification</h3> */}
<ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input id="list-radio-license" type="radio" value="admin" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
           </input>
            <label for="list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input id="list-radio-id" type="radio" value="nurse" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            </input>
            <label for="list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nurse</label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input id="list-radio-military" type="radio" value="patient" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            </input>
            <label for="list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Patient</label>
        </div>
    </li>
    
</ul>
<div class="mb-6"></div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a onClick={()=>{setNewPatient(true)}} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register here!</a>
    </p>
{/* {nav==="admin" && <Navigate to="/adminPage" /> } */}
            {/* <!--Password input--> */}
            {/* <TEInput
              type="password"
              label="Password"
              className="mb-6"
              size="lg"
            ></TEInput> */}

            {/* <!-- Remember me checkbox --> */}
            {/* <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="exampleCheck3"
                  defaultChecked
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck3"
                >
                  Remember me
                </label>
              </div> */}

              {/* <!-- Forgot password link --> */}
              {/* <a
                href="#!"
                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Forgot password?
              </a>
            </div> */}

            {/* <!-- Submit button --> */}

            {/* <TERipple rippleColor="light" className="w-full">
              <button
                type="button"
                className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Sign in
              </button>
            </TERipple> */}

            
          </form>
}{newPatient &&
<div>
<RegisterForm/>
 <p class="mt-10 text-center text-sm text-gray-500">
 Already a member?
 <a onClick={()=>{setNewPatient(false)}} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up here!</a>
</p>
</div>
}
       
        </div>
      </div>
    </div>
  </section>
  );
}

export default LoginPage;
