import React, { useState } from "react";
import style from "./../css/doctor-form-style.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./../firebase-config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const InfoAdmin = () => {
  const { idv } = useParams();
  const [formData, setFormData] = useState({
    check: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.key === "1") {
      try {
        const docRef = doc(db, "info", idv);

        await setDoc(docRef, { ...formData }, { merge: true });

        console.log("Doctor information added successfully");

        setFormData({
          check: "",
        });

        navigate("/managePage");
      } catch (error) {
        console.error("Error adding doctor information: ", error);
      }
    } else {
      alert("Invalid private key. Please try again.");
    }
  };
  return (
    <body className={style.doctorform}>
      <div className={`${style.container} ${style.doctorform}`}>
        <header className={style.doctorform}>VERIFY</header>

        <form onSubmit={handleSubmit}>
          <div className={`form first`}>
            <div className={`${style.detail} personal`}>
              <span className={style.title}>
                Type Private Key to join Admin team
              </span>

              <div className={style.fields}>
                <div className={style[`input-field`]}>
                  <label htmlFor="">
                    Medical Degree <span>*</span>
                  </label>
                  <input
                    type="password"
                    name="key"
                    value={formData.medicalDegree}
                    onChange={handleInputChange}
                    placeholder="Enter Private Key"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.button}>
            <button type="submit" className={style.summitBtn}>
              <span className={style[`summit-btn`]}>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </body>
  );
};

export default InfoAdmin;
