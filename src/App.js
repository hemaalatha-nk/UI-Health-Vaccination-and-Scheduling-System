// App.js
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminPage from './Admin/AdminPage';
import { PatientPage } from './Admin/Patient/PatientPage';
import NurseMainPage from './Nurse/NurseMainPage';
import { RecoilRoot } from 'recoil';
import PatientMainPage from './Patient/PatientMainPage';


const App = () => {
 return (
    <>
    
         <RecoilRoot>
         <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/nurse" element={<NurseMainPage />} />
          <Route path="/patient" element={<PatientMainPage />} />
          {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          </RecoilRoot>
    
    </>
 );
};

export default App;