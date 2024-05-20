import React from 'react';
import Doctor_Form from './../css/doctor-form-style.module.css';

const DoctorForm = () =>{
    return (
        <body className={Doctor_Form.doctorform}>
            <div className={`${Doctor_Form.container} ${Doctor_Form.doctorform}` }>
                <header className={Doctor_Form.doctorform}>Registration</header>

                <form action="#">
                    <div className={`form first`}>
                        <div className={`${Doctor_Form.detail} personal`}>
                            <span className={Doctor_Form.title}>Information About The Doctor</span>

                            <div className={Doctor_Form.fields}>
                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Full Name <span>*</span></label>
                                    <input type="text" name="name" placeholder="Enter your name" id="" required />
                                </div>

                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Gender <span>*</span></label>
                                    <select name="gender" id="">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others" selected>Others</option>
                                    </select>
                                </div>

                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Date Of Birth <span>*</span></label>
                                    <input type="date" name="birthday" placeholder="Enter your Birthday" id="" required />
                                </div>

                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Address <span>*</span></label>
                                    <input type="text" name="address" placeholder="Enter your address" id="" required />
                                </div>

                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Certificate <span>*</span></label>
                                    <input type="text" name="come-from" placeholder="Enter your certificate" id="" required />
                                </div>

                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Department <span>*</span></label>
                                    <input type="text" name="phone-number" placeholder="Enter your department" id="" required />
                                </div>
                            </div>
                        </div>
                        <div className={`${Doctor_Form.detail} ${Doctor_Form.ID}`}>
                            <span className={Doctor_Form.title}>Appointment ID</span>

                            <div className={Doctor_Form.fields}>
                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">ID <span>*</span></label>
                                    <input type="text" name="ID" placeholder="Enter" id="" required />
                                </div>
                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Room <span>*</span></label>
                                    <input type="text" name="health-id" placeholder="Enter" id="" required />
                                </div>

                                <div className={Doctor_Form[`input-field`]}>
                                    <label htmlFor="">Mobile Number <span>*</span></label>
                                    <input type="text" name="health-record" placeholder="Enter" id="" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Doctor_Form.button}>
                        <button className={Doctor_Form.summitBtn}>
                            <span className={Doctor_Form[`summit-btn`]}>Summit</span>
                        </button>
                    </div>
                </form>
            </div>
        </body>
    );
};
export default DoctorForm;