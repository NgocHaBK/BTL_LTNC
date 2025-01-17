import React, { useState } from 'react';
import style from './../css/doctor-form-style.module.css';
import { doc, setDoc } from "firebase/firestore";
import { db } from './../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Patient = () => {
    const { idv } = useParams();
    const [formData, setFormData] = useState({
        pastMedicalConditions: '',
        medicalAllergies: '',
        surgicalHistory: '',
        allergies: '',
        vaccinationHistory: '',
        decribleLifeStyle: '',
        currentMedicationsUsed: '',
        Symptoms: '',
        DateApoiment: '',
        predictmedicaldepartment: '',
        Status: '0'
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = doc(db, 'info', idv);


            await setDoc(docRef, { ...formData }, { merge: true });

            console.log('Patient information added successfully');

            setFormData({
                pastMedicalConditions: '',
                surgicalHistory: '',
                allergies: '',
                vaccinationHistory: '',
                decribleLifeStyle: '',
                currentMedicationsUsed: '',
                Symptoms: '',
                DateApoiment: '',
                predictmedicaldepartment: '',
                Status: '0'
            });
        } catch (error) {
            console.error('Error adding patient information: ', error);
        }
    };
    return (
        <body className={style.doctorform}>
            <div className={`${style.container} ${style.doctorform}`}>
                <header className={style.doctorform}>PATIENT'S INFORMATION</header>

                <form onSubmit={handleSubmit}>
                    <div className={`form first`}>
                        <div className={`${style.detail} personal`}>
                            <span className={style.title}>Information About The Doctor</span>

                            <div className={style.fields}>
                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Past Medical Conditions<span>*</span></label>
                                    <input
                                        type="text"
                                        name="pastMedicalConditions"
                                        value={formData.pastMedicalConditions}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Past Medical Conditions"

                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Surgical History  <span>*</span></label>
                                    <input
                                        type="text"
                                        name="surgicalHistory"
                                        value={formData.surgicalHistory}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Surgical History"

                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Vaccination History  <span>*</span></label>
                                    <input
                                        type="text"
                                        name="vaccinationHistory"
                                        value={formData.vaccinationHistory}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Vaccination History"

                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Date Of Apoinment <span>*</span></label>
                                    <input
                                        type="date"
                                        name="DateApoiment"
                                        value={formData.DateApoiment}
                                        onChange={handleInputChange}
                                        placeholder="Expected Date Of Apoiment"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Allergies  <span>*</span></label>
                                    <input
                                        type="text"
                                        name="allergies"
                                        value={formData.allergies}
                                        onChange={handleInputChange}
                                        placeholder="Medications, Foods, Environmental, ..."

                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">List of Current Medications <span>*</span></label>
                                    <input
                                        type="text"
                                        name="currentMedicationsUsed"
                                        value={formData.currentMedicationsUsed}
                                        onChange={handleInputChange}
                                        placeholder="Enter Name, Dosage, Frequency"

                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Describle your LifeStyle <span>*</span></label>
                                    <input
                                        type="text"
                                        name="decribleLifeStyle"
                                        value={formData.decribleLifeStyle}
                                        onChange={handleInputChange}
                                        placeholder="Smoking Status, Alcohol Consumption,..."

                                    />
                                </div>
                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Predict Medical Department <span>*</span></label>
                                    <select
                                        name="predictmedicaldepartment"
                                        value={formData.predictmedicaldepartment}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="0">UNKNOW</option>
                                        <option value="1">General Medicin</option>
                                        <option value="2">Pediatrics</option>
                                        <option value="3">Obstetrics and Gynecology</option>
                                        <option value="4">Cardiology</option>
                                        <option value="5">Dermatology</option>
                                        <option value="6">Ophthalmology</option>
                                        <option value="7">Otolaryngology</option>
                                        <option value="8">Orthopedics</option>
                                        <option value="9">Neurology</option>
                                        <option value="10">Psychiatry</option>
                                    </select>
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Describle your Symptoms and Complaints <span>*</span></label>
                                    <input
                                        type="text"
                                        name="Symptoms"
                                        value={formData.Symptoms}
                                        onChange={handleInputChange}
                                        placeholder="Presenting, Duration, Severity,... "
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

export default Patient;