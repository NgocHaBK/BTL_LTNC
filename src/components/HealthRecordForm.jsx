import React, { useState } from 'react';
import { db } from './../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import styles from './../css/doctor-form-style.module.css';

const HealthRecordForm = () => {
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phone: '',
        insuranceId: '',
    });
    const [admissionReason, setAdmissionReason] = useState('');
    const [medicalHistory, setMedicalHistory] = useState({
        pastIllnesses: '',
        surgeries: '',
        allergies: '',
    });
    const [physicalExam, setPhysicalExam] = useState({
        overallHealth: '',
        vitalSigns: '',
    });
    const [clinicalExam, setClinicalExam] = useState({});
    const [labTests, setLabTests] = useState({});
    const [diagnosis, setDiagnosis] = useState('');
    const [treatmentPlan, setTreatmentPlan] = useState({
        medication: '',
        procedures: '',
    });
    const [followUp, setFollowUp] = useState({
        progress: '',
        nextAppointment: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'healthRecords'), {
                patientInfo,
                admissionReason,
                medicalHistory,
                physicalExam,
                clinicalExam,
                labTests,
                diagnosis,
                treatmentPlan,
                followUp,
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <body className={styles.doctorform}>
            <div className={styles.container}>
                <header className={styles.doctorform}>Health Record Form</header>
                <form onSubmit={handleSubmit}>
                    {/* Patient Information */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Patient Information</span>
                        <div className={styles.fields}>
                            {/* Input fields for name, dateOfBirth, gender, etc. */}
                        </div>
                    </div>

                    {/* Admission Reason */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Admission Reason</span>
                        <div className={styles.fields}>
                            <div className={styles['input-field']}>
                                <label htmlFor="admissionReason">Reason for Admission</label>
                                <textarea
                                    id="admissionReason"
                                    value={admissionReason}
                                    onChange={(e) => setAdmissionReason(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Medical History</span>
                        <div className={styles.fields}>
                            {/* Input fields for pastIllnesses, surgeries, allergies */}
                        </div>
                    </div>

                    {/* Physical Exam */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Physical Exam</span>
                        <div className={styles.fields}>
                            {/* Input fields for overallHealth, vitalSigns */}
                        </div>
                    </div>

                    {/* Clinical Exam */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Clinical Exam</span>
                        <div className={styles.fields}>
                            {/* Input fields for clinical exam details */}
                        </div>
                    </div>

                    {/* Lab Tests */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Lab Tests</span>
                        <div className={styles.fields}>
                            {/* Input fields for lab test details */}
                        </div>
                    </div>

                    {/* Diagnosis */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Diagnosis</span>
                        <div className={styles.fields}>
                            <div className={styles['input-field']}>
                                <label htmlFor="diagnosis">Diagnosis</label>
                                <textarea
                                    id="diagnosis"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Treatment Plan */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Treatment Plan</span>
                        <div className={styles.fields}>
                            {/* Input fields for medication, procedures */}
                        </div>
                    </div>

                    {/* Follow Up */}
                    <div className={styles.detail}>
                        <span className={styles.title}>Follow Up</span>
                        <div className={styles.fields}>
                            {/* Input fields for progress, nextAppointment */}
                        </div>
                    </div>

                    <div className={styles.button}>
                        <button type="submit" className={styles.summitBtn}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </body>
    );
};

export default HealthRecordForm;