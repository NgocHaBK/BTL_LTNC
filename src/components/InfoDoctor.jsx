import React, { useState } from 'react';
import style from './../css/doctor-form-style.module.css';
import { doc, setDoc } from "firebase/firestore";
import { db } from './../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const InfoDoctor = () => {
    const { idv } = useParams();
    const [formData, setFormData] = useState({
        medicalDegree: '',
        specialty: '',
        lincenses: '',
        position: '',
        experience: '',
        medicalSchool: '',
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

            console.log('Doctor information added successfully');

            setFormData({
                medicalDegree: '',
                specialty: '',
                lincenses: '',
                position: '',
                experience: '',
                medicalSchool: '',
            });
            navigate('/PatientList');
        } catch (error) {
            console.error('Error adding doctor information: ', error);
        }
    };
    return (
        <body className={style.doctorform}>
            <div className={`${style.container} ${style.doctorform}`}>
                <header className={style.doctorform}>DOCTOR'S INFORMATION</header>

                <form onSubmit={handleSubmit}>
                    <div className={`form first`}>
                        <div className={`${style.detail} personal`}>
                            <span className={style.title}>Information About The Doctor</span>

                            <div className={style.fields}>
                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Medical Degree <span>*</span></label>
                                    <input
                                        type="text"
                                        name="medicalDegree"
                                        value={formData.medicalDegree}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Medical Degree"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Specialty  <span>*</span></label>
                                    <input
                                        type="text"
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Specialty"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Certifications and Licenses <span>*</span></label>
                                    <input
                                        type="text"
                                        name="lincenses"
                                        value={formData.lincenses}
                                        onChange={handleInputChange}
                                        placeholder="Certifications and Licenses"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Current Position <span>*</span></label>
                                    <input
                                        type="type"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        placeholder="Current Position"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Years of Experience  <span>*</span></label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        placeholder="Years of Experience"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Department <span>*</span></label>
                                    <select
                                        name="predictmedicaldepartment"
                                        value={formData.predictmedicaldepartment}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="0">Diagnose</option>
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

export default InfoDoctor;