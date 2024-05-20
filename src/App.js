import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import InitInformation from "./components/initInfo";
import Home from "./components/HomePage";
import InforPatient from "./components/InforPatient";
import InfoDoctor from "./components/InfoDoctor";
import { AuthContextProvider } from "./context/Auth";
import ImportMedicine from "./components/MedicineManagement";
import MedicalEquipmentManager from "./components/ManageObject";
import MedicinesList from "./components/MedicinesManagement";
import CheckProfile from "./components/CheckProfile";
import ListPatients from "./components/ListPatients";
import VerifyEmployee from "./components/VerifyEmployee";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
              <li>
                <Link to="/initInformation">InitInformation</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/MedicinesList">MedicinesList</Link>
              </li>
              <li>
                <Link to="/patient/:idv">InforPatient</Link>
              </li>
              <li>
                <Link to="/doctor/:idv">InfoDoctor</Link>
              </li>
              <li>
                <Link to="/MedicalEquipmentManager">
                  MedicalEquipmentManager
                </Link>
              </li>
              <li>
                <Link to="/IMPORTMEDICINE">ImportMedicine</Link>
              </li>
              <li>
                <Link to="/CheckProfile">CheckProfile</Link>
              </li>
              <li>
                <Link to="/ListPatients">ListPatients</Link>
              </li>
              <li>
                <Link to="/VerifyEmployee">VerifyEmployee</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/initInformation" element={<InitInformation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/patient/:idv" element={<InforPatient />} />
            <Route path="/doctor/:idv" element={<InfoDoctor />} />
            <Route path="/CheckProfile" element={<CheckProfile />} />
            <Route path="/MedicinesList" element={<MedicinesList />} />
            <Route path="/IMPORTMEDICINE" element={<ImportMedicine />} />
            <Route path="/ListPatients" element={<ListPatients />} />
            <Route path="/VerifyEmployee" element={<VerifyEmployee />} />
            <Route
              path="/MedicalEquipmentManager"
              element={<MedicalEquipmentManager />}
            />
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
