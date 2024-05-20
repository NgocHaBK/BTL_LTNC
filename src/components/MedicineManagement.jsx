import React, { useState } from 'react';
import style from './../css/doctor-form-style.module.css';
import { collection, doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from './../firebase-config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IMPORTMEDICINE = () => {
    const [formData, setFormData] = useState({
        name: '',
        manufacturer: '',
        unit: '',
        description: '',
        batchNumber: '',
        productionDate: '',
        expirationDate: '',
        quantityInOut: 0,
        minimumInventory: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (new Date(formData.expirationDate) <= new Date(formData.productionDate)) {
            toast.error('Expiration date must be after production date');
            return;
        }

        if (formData.quantityInOut <= 0 || formData.minimumInventory < 0) {
            toast.error('Quantity and minimum inventory must be positive');
            return;
        }

        try {
            const medicineRef = doc(db, 'medicines', formData.name.trim());
            const medicineSnapshot = await getDoc(medicineRef);

            const batch = {
                batchNumber: formData.batchNumber,
                productionDate: formData.productionDate,
                expirationDate: formData.expirationDate,
                quantityInOut: parseInt(formData.quantityInOut),
                unit: formData.unit,
                minimumInventory: parseInt(formData.minimumInventory),
                manufacturer: formData.manufacturer,
            };

            if (medicineSnapshot.exists()) {
                // If the document exists, update it
                const medicineData = medicineSnapshot.data();
                const batchIndex = medicineData.batches.findIndex(
                    (batch) => batch.batchNumber === formData.batchNumber
                );

                if (batchIndex !== -1) {
                    // If the batch exists, update its quantity and other properties
                    const updatedBatches = [...medicineData.batches];
                    updatedBatches[batchIndex] = {
                        ...updatedBatches[batchIndex],
                        ...batch,
                        quantityInOut: updatedBatches[batchIndex].quantityInOut + parseInt(formData.quantityInOut),
                    };

                    await updateDoc(medicineRef, {
                        description: formData.description || medicineData.description,
                        batches: updatedBatches,
                    });
                } else {
                    // If the batch doesn't exist, add it as a new batch
                    await updateDoc(medicineRef, {
                        description: formData.description || medicineData.description,
                        batches: arrayUnion(batch),
                    });
                }
            } else {
                // If the document doesn't exist, create a new one
                await setDoc(medicineRef, {
                    description: formData.description,
                    batches: [batch],
                });
            }

            console.log('Medicine updated/created');
            setFormData({
                name: '',
                manufacturer: '',
                unit: '',
                batchNumber: '',
                productionDate: '',
                expirationDate: '',
                quantityInOut: 0,
                minimumInventory: 0,
            });

            toast.success('Medicine successfully updated/created');
        } catch (error) {
            console.error('Error updating/creating medicine: ', error);
            toast.error('An error occurred while updating/creating the medicine');
        }
    };

    return (
        <body className={style.doctorform}>
            <div className={`${style.container} ${style.doctorform}`}>
                <header className={style.doctorform}>IMPORT MEDICINE</header>

                <form onSubmit={handleSubmit}>
                    <div className={`form first`}>
                        <div className={`${style.detail} personal`}>
                            <span className={style.title}>NEW MEDICINE INFOMATION</span>

                            <div className={style.fields}>
                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Name <span>*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>


                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Batch Number <span>*</span></label>
                                    <input
                                        type="text"
                                        name="batchNumber"
                                        value={formData.batchNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter Batch Number"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Manufacturer<span>*</span></label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleInputChange}
                                        placeholder="Enter Manufacturer's Name"
                                        required
                                    />
                                </div>





                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Unit <span>*</span></label>
                                    <select
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Unit Option</option>
                                        <option value="1">Piece</option>
                                        <option value="2">Tablet</option>
                                        <option value="3">Ampoule</option>
                                        <option value="4">Box</option>
                                        <option value="5">Pack</option>
                                        <option value="6">Strip</option>
                                        <option value="7">Tube</option>
                                        <option value="8">Other</option>

                                    </select>
                                </div>


                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Manufacturing Date <span>*</span></label>
                                    <input
                                        type="date"
                                        name="productionDate"
                                        value={formData.productionDate}
                                        onChange={handleInputChange}
                                        placeholder="Enter MFG "
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Expiration Date <span>*</span></label>
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
                                        placeholder="Enter EXP "
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Quantity <span>*</span></label>
                                    <input
                                        type="number"
                                        name="quantityInOut"
                                        value={formData.quantityInOut}
                                        onChange={handleInputChange}
                                        placeholder="Enter Quantity"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Minimum Inventory <span>*</span></label>
                                    <input
                                        type="number"
                                        name="minimumInventory"
                                        value={formData.minimumInventory}
                                        onChange={handleInputChange}
                                        placeholder="Enter Minimum Inventory"
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

export default IMPORTMEDICINE;