//import atom and selctor from the recoil package through object destructuring
import { atom, selector } from "recoil";

//create an atom that will be used to store all tasks entered by the user.
const userType = atom({
    key: "userinfo",
    default: []
})

const patientNav = atom({
    key: "changeNavTab",
    default: "schedule"
})

//export our atoms and selector
export {
    userType,
    patientNav
}