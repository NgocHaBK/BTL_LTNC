import React, { useState, useEffect } from "react";
import { db } from "../firebase-config"; // Adjust the import path as necessary
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Patient_css from "./../css/patient.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../css/medicine.css";
import Base_css from "./../css/base.module.css";
import HCMUT_LOGO from "./../img/HCMUT_official_logo.png";
import Admin_css from "./../css/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
const MedicineManager = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [formData, setFormData] = useState({});
  const [newMedicine, setNewMedicine] = useState({ id: "", batches: [] });
  const [newBatch, setNewBatch] = useState({});
  const [alerts, setAlerts] = useState({
    lowStock: [],
    nearExpiry: [],
    expired: [],
  });

  useEffect(() => {
    const fetchMedicines = async () => {
      const medicinesCollection = collection(db, "medicines");
      const medicinesSnapshot = await getDocs(medicinesCollection);
      const medicinesList = medicinesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicines(medicinesList);

      // Alert logic
      const lowStock = [];
      const nearExpiry = [];
      const expired = [];
      const currentDate = new Date();

      medicinesList.forEach((medicine) => {
        medicine.batches.forEach((batch) => {
          const expirationDate = new Date(batch.expirationDate);
          const productionDate = new Date(batch.productionDate);
          const daysToExpiry =
            (expirationDate - currentDate) / (1000 * 60 * 60 * 24);
          const totalDays =
            (expirationDate - productionDate) / (1000 * 60 * 60 * 24);

          if (batch.quantityInOut < batch.minimumInventory) {
            lowStock.push({ ...batch, medicineId: medicine.id });
          }
          if (daysToExpiry <= totalDays * 0.1) {
            nearExpiry.push({ ...batch, medicineId: medicine.id });
          }
          if (expirationDate < currentDate) {
            expired.push({ ...batch, medicineId: medicine.id });
          }
        });
      });

      setAlerts({ lowStock, nearExpiry, expired });
    };

    fetchMedicines();
  }, []);
  const [modal1Show, setModal1Show] = useState(false);
  const [modal2Show, setModal2Show] = useState(false);

  const handleOpenModal1 = () => setModal1Show(true);
  const handleCloseModal1 = () => setModal1Show(false);

  const handleOpenModal2 = () => setModal2Show(true);
  const handleCloseModal2 = () => setModal2Show(false);
  const handleEdit = (medicineId, batch, batchIndex) => {
    handleOpenModal2();
    setSelectedBatch({ medicineId, batchIndex });
    setFormData({ ...batch });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewMedicineChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewBatchChange = (e) => {
    const { name, value } = e.target;
    setNewBatch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBatchChange = (e, batchIndex) => {
    const { name, value } = e.target;
    const updatedBatches = formData.batches.map((batch, index) => {
      if (index === batchIndex) {
        return {
          ...batch,
          [name]: value,
        };
      }
      return batch;
    });
    setFormData((prevState) => ({
      ...prevState,
      batches: updatedBatches,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { medicineId, batchIndex } = selectedBatch;
    const medicineDoc = doc(db, "medicines", medicineId);
    const medicineSnapshot = await getDocs(medicineDoc);
    const medicineData = medicineSnapshot.data();
    const updatedBatches = medicineData.batches.map((batch, index) =>
      index === batchIndex ? formData : batch
    );
    await updateDoc(medicineDoc, { batches: updatedBatches });
    setSelectedBatch(null);
    setFormData({});
  };

  const handleAddNewBatch = () => {
    setNewMedicine((prevState) => ({
      ...prevState,
      batches: [...prevState.batches, newBatch],
    }));
    setNewBatch({});
  };

  const handleAddNewMedicine = async (e) => {
    e.preventDefault();
    const currentDate = new Date();

    // Validation
    const invalidBatches = newMedicine.batches.some((batch) => {
      const productionDate = new Date(batch.productionDate);
      const expirationDate = new Date(batch.expirationDate);
      return (
        productionDate >= currentDate ||
        expirationDate <= currentDate ||
        productionDate >= expirationDate
      );
    });

    if (invalidBatches) {
      alert(
        "Invalid batch dates. Please check the production and expiration dates."
      );
      return;
    }

    const newMedicineDoc = doc(db, "medicines", newMedicine.id);
    await setDoc(newMedicineDoc, newMedicine);
    setNewMedicine({ id: "", batches: [] });
    // Refresh the medicines list
    const medicinesCollection = collection(db, "medicines");
    const medicinesSnapshot = await getDocs(medicinesCollection);
    const medicinesList = medicinesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMedicines(medicinesList);
  };

  return (
    <>
      <section className={Base_css[`header-nav`]} id="header_">
        <header className={Base_css.base}>
          <div className={Base_css.wrapper}>
            <div className={Base_css.header_content}>
              <div className={Base_css.hospital_logo}>
                <a href="#" className={Base_css[`hospital_logo-link`]}>
                  <img
                    className={Base_css.header_logo}
                    src={HCMUT_LOGO}
                    alt="hospital_logo"
                  />
                  <div className={Base_css.hospital_logo_text}>
                    <h2>Bách Khoa Hospital</h2>
                  </div>
                </a>
              </div>
              <nav className={Base_css.logo_list}>
                <div className={Base_css.logo_list__location}>
                  <a className="number" href="tel:0855628333">
                    <FontAwesomeIcon
                      icon={faLocation}
                      className="icon_header"
                    />
                    <span>Thành Phố Hồ Chí Minh - 0855 628 333 </span>
                  </a>
                </div>
                <ul>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faPhone} className="icon_header" />
                      Hỏi đáp
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="icon_header"
                      />
                      Đặt lịch khám
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      style={{ color: "#FFDF5F" }}
                      className="signIn_Up"
                    >
                      Đăng nhập
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      style={{ color: "#FFDF5F" }}
                      className="signIn_Up"
                    >
                      Đăng ký
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="avatar_infor">
            <a href="#">
              <img src="" alt="" />
            </a>
          </div>
        </header>
        <nav className={`${Base_css.list} ${Base_css.base}`}>
          <div className={`${Base_css.wrapper} ${Base_css.base}`}>
            <div className="container_list">
              <ul>
                <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                  <a href="./patient_list.html">Bệnh nhân</a>
                </li>
                <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                  <a href="./doctor_list.html">Bác sĩ</a>
                </li>
                <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                  <a href="./medicine.html">Thuốc</a>
                </li>
                <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                  <a href="#">Trang thiết bị</a>
                </li>
                <li className={Admin_css.dropdownable}>
                  <a href="">Tài khoản</a>
                  <div className={Admin_css.dropdown}>
                    <a href="#" className="a_drop">
                      TK admin
                    </a>
                    <a href="#" className="a_drop">
                      TK bác sĩ
                    </a>
                    <a href="#" className="a_drop">
                      TK bệnh nhân
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>

      <div className="container">
        <h1 className="text-center mt-3">Medicine Manager</h1>
        <div className="warning mb-3">
          <h2 className="text-warning">**Alerts: </h2>
          <div className="d-flex justify-content-around">
            <div className="warning_item position-relative">
              <h3>Low Stock</h3>
              <ul>
                {alerts.lowStock.map((batch, index) => (
                  <li key={index}>
                    {batch.medicineId}: Batch {batch.batchNumber} is low on
                    stock.
                  </li>
                ))}
              </ul>
            </div>
            <div className="warning_item">
              <h3>Near Expiry</h3>
              <ul>
                {alerts.nearExpiry.map((batch, index) => (
                  <li key={index}>
                    {batch.medicineId}: Batch {batch.batchNumber} is near
                    expiry.
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Expired</h3>
              <ul>
                {alerts.expired.map((batch, index) => (
                  <li key={index}>
                    {batch.medicineId}: Batch {batch.batchNumber} has expired.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="w-75 mx-auto mb-4"></hr>
        <div className="container mb-5">
          <h3>Equipment List</h3>
          <div className="d-flex justify-content-between">
            <Button
              variant="primary"
              onClick={handleOpenModal1}
              className="btn btn-success"
            >
              + Add New Medicine
            </Button>
            <div>
              <label>Search Medicine:</label>
              <input
                type="text"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <Modal
            show={modal1Show}
            onHide={handleCloseModal1}
            id="form_add_medicine"
          >
            <Modal.Header closeButton>
              <Modal.Title>Medicine Adding</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Medicine Name:</label>
              <input
                type="text"
                name="id"
                value={newMedicine.id}
                onChange={handleNewMedicineChange}
                className="form-control w-50 mb-3"
              />
              <h3>Add New Batch</h3>
              <label>Batch Number:</label>
              <input
                type="text"
                name="batchNumber"
                value={newBatch.batchNumber || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
              <label>Production Date:</label>
              <input
                type="date"
                name="productionDate"
                value={newBatch.productionDate || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
              <label>Expiration Date:</label>
              <input
                type="date"
                name="expirationDate"
                value={newBatch.expirationDate || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
              <label>Manufacturer:</label>
              <input
                type="text"
                name="manufacturer"
                value={newBatch.manufacturer || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
              <label>Minimum Inventory:</label>
              <input
                type="number"
                name="minimumInventory"
                value={newBatch.minimumInventory || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
              <label>Quantity In/Out:</label>
              <input
                type="number"
                name="quantityInOut"
                value={newBatch.quantityInOut || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
              <label>Unit:</label>
              <input
                type="text"
                name="unit"
                value={newBatch.unit || ""}
                onChange={handleNewBatchChange}
                className="form-control w-50 mb-3"
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={handleAddNewBatch}
                className="btn btn-success d-inline-block mb-2"
              >
                Add Batch
              </button>
              <button
                type="submit"
                className="btn btn-secondary d-inline-block"
                onClick={handleCloseModal1}
              >
                Save Medicine
              </button>
            </Modal.Footer>
          </Modal>
          <div className={Patient_css.patient_list_content}>
            <table className={`table ${Patient_css.table}`}>
              <thead>
                <tr>
                  yy
                  <th scope="col">ID</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Batch Number</th>
                  <th scope="col">Production Date</th>
                  <th scope="col">Expiration Date</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Minimum Inventory</th>
                  <th scope="col">Quantity In/Out</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete batch</th>
                </tr>
              </thead>
              <tbody>
                {medicines.length > 0 ? (
                  medicines.map((medicine) => (
                    <React.Fragment key={medicine.id}>
                      {medicine.batches && medicine.batches.length > 0 ? (
                        medicine.batches.map((batch, index) => (
                          <tr key={batch.batchNumber}>
                            {index === 0 && (
                              <td rowSpan={medicine.batches.length}>
                                {medicine.id}
                              </td>
                            )}
                            <td>{index + 1}</td>
                            <td>{batch.batchNumber}</td>
                            <td>{batch.productionDate}</td>
                            <td>{batch.expirationDate}</td>
                            <td>{batch.manufacturer}</td>
                            <td>{batch.minimumInventory}</td>
                            <td>{batch.quantityInOut}</td>
                            <td>{batch.unit}</td>
                            <td id={Patient_css.trash_bin}>
                              <a href="#">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  onClick={() =>
                                    handleEdit(medicine.id, batch, index)
                                  }
                                  className="text-success"
                                />
                              </a>
                            </td>
                            <td id={Patient_css.trash_bin}>
                              <a href="#">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() =>
                                    handleDeleteBatch(medicine.id, index)
                                  }
                                />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>{medicine.id}</td>
                          <td colSpan="8">No batch data available</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No medicines available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {selectedBatch && (
          <Modal show={modal2Show} onHide={handleCloseModal2} id="form_add">
            <Modal.Header closeButton>
              <Modal.Title>Equipment Editting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <h2>Edit Batch {selectedBatch.batchIndex + 1}</h2>
                <label>Batch Number:</label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  className="form-control w-25 p-3"
                />

                <label>Production Date:</label>
                <input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate}
                  onChange={handleChange}
                  className="form-control w-25 mb-3"
                />

                <label>Expiration Date:</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="form-control w-25 mb-3"
                />

                <label>Manufacturer:</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="form-control w-50 mb-3"
                />

                <label>Minimum Inventory:</label>
                <input
                  type="number"
                  name="minimumInventory"
                  value={formData.minimumInventory}
                  onChange={handleChange}
                  className="form-control w-25 mb-3"
                />

                <label>Quantity In/Out:</label>
                <input
                  type="number"
                  name="quantityInOut"
                  value={formData.quantityInOut}
                  onChange={handleChange}
                  className="form-control w-50 mb-3"
                />
                <label>Unit:</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="form-control w-50 mb-3"
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className="btn btn-success"
                onlick={handleCloseModal2}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
};

export default MedicineManager;
