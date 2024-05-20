import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Patient_css from "./../css/patient.module.css";
import Base_css from "./../css/base.module.css";
import HCMUT_LOGO from "./../img/HCMUT_official_logo.png";
import Admin_css from "./../css/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const MedicalEquipmentManager = () => {
  const [equipments, setEquipments] = useState([]);
  const [uniqueEquipmentNames, setUniqueEquipmentNames] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    id: "",
    name: "",

    maintenanceHistory: "",
    availability: "available",
    borrowerId: "",
    newName: "",
  });
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [idExists, setIdExists] = useState(false);

  useEffect(() => {
    const fetchEquipments = async () => {
      const equipmentCollection = collection(db, "equipments");
      const equipmentSnapshot = await getDocs(equipmentCollection);
      const equipmentList = equipmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(equipmentList);
      const uniqueNames = [
        ...new Set(equipmentList.map((equipment) => equipment.name)),
      ];
      setUniqueEquipmentNames(uniqueNames);
    };

    fetchEquipments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "availability" && value === "available") {
      setNewEquipment({
        ...newEquipment,
        [name]: value,
        borrowerId: "",
      });
    } else {
      setNewEquipment({
        ...newEquipment,
        [name]: value,
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "availability" && value === "available") {
      setEditingEquipment({
        ...editingEquipment,
        [name]: value,
        borrowerId: "",
      });
    } else {
      setEditingEquipment({
        ...editingEquipment,
        [name]: value,
      });
    }
  };

  const handleAddEquipment = async () => {
    try {
      const equipmentName =
        newEquipment.name === "Other"
          ? newEquipment.newName
          : newEquipment.name;
      const equipmentRef = doc(db, "equipments", newEquipment.id);
      const equipmentDoc = await getDoc(equipmentRef);

      if (equipmentDoc.exists()) {
        setIdExists(true);
      }

      await setDoc(equipmentRef, {
        ...newEquipment,
        name: equipmentName,
      });

      setNewEquipment({
        id: "",
        name: "",
        maintenanceHistory: "",
        availability: "available",
        borrowerId: "",
        newName: "",
      });

      const equipmentCollection = collection(db, "equipments");
      const equipmentSnapshot = await getDocs(equipmentCollection);
      const equipmentList = equipmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(equipmentList);
      const uniqueNames = [
        ...new Set(equipmentList.map((equipment) => equipment.name)),
      ];
      setUniqueEquipmentNames(uniqueNames);
    } catch (error) {
      console.error("Error adding equipment: ", error);
    }
  };
  const [modal1Show, setModal1Show] = useState(false);
  const [modal2Show, setModal2Show] = useState(false);

  const handleOpenModal1 = () => setModal1Show(true);
  const handleCloseModal1 = () => setModal1Show(false);

  const handleOpenModal2 = () => setModal2Show(true);
  const handleCloseModal2 = () => setModal2Show(false);

  const handleEditEquipment = (equipment) => {
    handleOpenModal2();
    setEditingEquipment({
      ...equipment,
      newName: "",
    });
  };

  const handleUpdateEquipment = async (id, updatedEquipment) => {
    try {
      const equipmentName =
        updatedEquipment.name === "Other"
          ? updatedEquipment.newName
          : updatedEquipment.name;
      await setDoc(doc(db, "equipments", id), {
        ...updatedEquipment,
        name: equipmentName,
      });
      const equipmentCollection = collection(db, "equipments");
      const equipmentSnapshot = await getDocs(equipmentCollection);
      const equipmentList = equipmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(equipmentList);
      setEditingEquipment(null);
      const uniqueNames = [
        ...new Set(equipmentList.map((equipment) => equipment.name)),
      ];
      setUniqueEquipmentNames(uniqueNames);
    } catch (error) {
      console.error("Error updating equipment: ", error);
    }
  };

  const handleDeleteEquipment = async (id) => {
    try {
      await deleteDoc(doc(db, "equipments", id));
      const equipmentCollection = collection(db, "equipments");
      const equipmentSnapshot = await getDocs(equipmentCollection);
      const equipmentList = equipmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(equipmentList);
      const uniqueNames = [
        ...new Set(equipmentList.map((equipment) => equipment.name)),
      ];
      setUniqueEquipmentNames(uniqueNames);
    } catch (error) {
      console.error("Error deleting equipment: ", error);
    }
  };
  //mới thêm vào
  const avai = {
    width: "50%",
  };
  const borrower_ID = {
    width: "27%",
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
      <div>
        <h2 className="text-center mt-5">Medical Equipment Manager</h2>
        {idExists && (
          <div style={{ color: "red" }}>UNVALID: ID already exists</div>
        )}
        <div className="container">
          <Modal show={modal1Show} onHide={handleCloseModal1} id="form_add">
            <Modal.Header closeButton>
              <Modal.Title>Equipment Adding</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h1 className="modal-title fs-5 mb-2" id="exampleModalLabel">
                Equipment informations:
              </h1>
              <input
                type="text"
                name="id"
                placeholder="Equipment ID"
                value={newEquipment.id}
                onChange={handleInputChange}
                className="form-control w-50 mb-3"
              />
              <select
                name="name"
                value={newEquipment.name}
                onChange={handleInputChange}
                className="form-select w-50 mb-3"
              >
                <option value="">Select Equipment Name</option>
                {uniqueEquipmentNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              {newEquipment.name === "Other" && (
                <input
                  type="text"
                  name="newName"
                  placeholder="Enter New Equipment Name"
                  value={newEquipment.newName || ""}
                  onChange={handleInputChange}
                  className="form-control w-50 mb-3"
                />
              )}

              <input
                type="text"
                name="maintenanceHistory"
                placeholder="Maintenance History"
                value={newEquipment.maintenanceHistory}
                onChange={handleInputChange}
                className="form-control w-50 mb-3"
              />
              <select
                name="availability"
                value={newEquipment.availability}
                onChange={handleInputChange}
                className="form-select avai_select d-inline-block me-3 mb-3"
                style={{ width: "50%" }}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              {newEquipment.availability === "unavailable" && (
                <input
                  style={{ width: "27%" }}
                  type="text"
                  name="borrowerId"
                  placeholder="Borrower ID"
                  value={newEquipment.borrowerId}
                  onChange={handleInputChange}
                  className="form-control d-inline-block borrower_id mb-2"
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={handleAddEquipment}
                className="btn btn-primary text-right d-block"
              >
                Add Equipment
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="container mb-5">
          <h3 className="mb-2">Equipment List</h3>
          <Button
            variant="primary"
            onClick={handleOpenModal1}
            className="btn btn-success"
          >
            + Add New Equipment
          </Button>
          <div className={Patient_css.patient_list_content}>
            <table className={`table ${Patient_css.table}`}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Maintenance History</th>
                  <th scope="col">Availability</th>
                  <th scope="col">Update</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((equipment, index) => (
                  <tr key={equipment.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{equipment.id}</td>
                    <td>{equipment.name}</td>
                    <td>{equipment.maintenanceHistory}</td>
                    <td>{equipment.availability}</td>
                    <td id={Patient_css.trash_bin}>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => handleEditEquipment(equipment)}
                          className="text-success"
                        />
                      </a>
                    </td>
                    <td id={Patient_css.trash_bin}>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteEquipment(equipment.id)}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editingEquipment && (
          <div>
            <Modal
              show={modal2Show}
              onHide={handleCloseModal2}
              id="form_update"
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Equipment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h1 className="modal-title fs-5 mb-2" id="exampleModalLabel">
                  Equipment informations:
                </h1>
                <input
                  type="text"
                  name="id"
                  placeholder="Equipment ID"
                  value={editingEquipment.id}
                  onChange={handleEditInputChange}
                  className="form-control w-50 mb-3"
                />
                <select
                  name="name"
                  value={editingEquipment.name}
                  onChange={handleEditInputChange}
                  className="form-select w-50 mb-3"
                >
                  <option value="">Select Equipment Name</option>
                  {uniqueEquipmentNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {editingEquipment.name === "Other" && (
                  <input
                    type="text"
                    name="newName"
                    placeholder="Enter New Equipment Name"
                    value={editingEquipment.newName || ""}
                    onChange={handleEditInputChange}
                    className="form-control w-50 mb-3"
                  />
                )}

                <input
                  type="text"
                  name="maintenanceHistory"
                  placeholder="Maintenance History"
                  value={editingEquipment.maintenanceHistory}
                  onChange={handleEditInputChange}
                  className="form-control w-50 mb-3"
                />
                <select
                  name="availability"
                  value={editingEquipment.availability}
                  onChange={handleEditInputChange}
                  className="form-select w-50 mb-3"
                >
                  <option className="" value="available">
                    Available
                  </option>
                  <option value="unavailable">Unavailable</option>
                </select>
                {editingEquipment.availability === "unavailable" && (
                  <input
                    type="text"
                    name="borrowerId"
                    placeholder="Borrower ID"
                    value={editingEquipment.borrowerId}
                    onChange={handleEditInputChange}
                    className="form-control w-50 mb-3"
                  />
                )}
              </Modal.Body>
              <Modal.Footer>
                <button
                  onClick={() =>
                    handleUpdateEquipment(editingEquipment.id, editingEquipment)
                  }
                  className="btn btn-success me-2"
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingEquipment(null)}
                >
                  Cancel
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default MedicalEquipmentManager;
