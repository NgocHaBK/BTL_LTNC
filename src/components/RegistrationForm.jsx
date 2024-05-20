import React, { useState, useContext } from "react";
import style from "./../css/doctor-form-style.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./../firebase-config";
import { UserAuth } from "./../context/Auth"; // Make sure this import matches your actual file structure

const DoctorForm = () => {
  const { user } = UserAuth(); // Using the Auth context to get the currently logged-in user's info
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthday: "",
    address: "",
    certificate: "",
    department: "",
    room: "",
    mobileNumber: "",
  });

  const cleanEmail = (email) => {
    return email.replace(/\./g, "_"); // Replace dots with underscores to use as document ID
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      console.error("No user logged in or user email is unavailable");
      return;
    }

    const emailKey = cleanEmail(user.email); // Clean the user email to use as document key
    const userDocRef = doc(db, "doctors", emailKey); // Create a reference to the Firestore document

    try {
      await setDoc(userDocRef, formData); // Save the formData under the cleaned email
      console.log("Document written with ID:", emailKey);
      setFormData({
        // Reset form data on successful submission
        name: "",
        gender: "",
        birthday: "",
        address: "",
        certificate: "",
        department: "",
        room: "",
        mobileNumber: "",
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className={style.doctorform}>
      <header className={style.header}>Doctor Profile Form</header>

      <form onSubmit={handleSubmit} className={style.container}>
        <span>Please type your information:</span>

        <div className={style.inputField}>
          <label>
            Name <span>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={style.inputField}>
          <label>
            Gender <span>*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Include additional fields as needed, similar to above */}

        <div className={style.inputField}>
          <label>
            Mobile Number <span>*</span>
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <button type="submit" className={style.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
