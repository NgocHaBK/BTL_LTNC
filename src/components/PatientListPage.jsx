import React, { useState, useEffect } from "react";
import HCMUT_LOGO from "./../img/HCMUT_official_logo.png";
import Style_css from "./../css/style.module.css";
import Base_css from "./../css/base.module.css";
import Patient_css from "./../css/patient.module.css";
import Admin_css from "./../css/admin.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    cccd: "",
    birthdate: "",
    email: "",
    phone: "",
    gender: "",
    letter: "",
    address: "",
    healthId: "",
    healthRecords: "",
  });

  useEffect(() => {
    // Fetch api //database
    const fetchPatientData = async () => {
      try {
        const response = await fetch("/api/patients");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewPatient({
      name: "",
      cccd: "",
      birthdate: "",
      email: "",
      phone: "",
      gender: "",
      letter: "",
      address: "",
      healthId: "",
      healthRecords: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm BN
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    handleModalClose();
  };

  const handleDeletePatient = (patientId) => {
    // Xóa BN
    const updatedPatients = patients.filter(
      (patient) => patient.id !== patientId
    );
    setPatients(updatedPatients);
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
      {/* Header section */}
      <main>
        <div className={`${Style_css.container} ${Style_css.style}`}>
          <div className={Patient_css.patient_list}>
            <div className={`${Patient_css[`patient_list-title`]}`}>
              <h3>DANH SÁCH BỆNH NHÂN</h3>
            </div>
            <div
              className={`${Patient_css.addpatient} d-flex justify-content-between`}
            >
              <button
                type="button"
                className="btn-add text-bg-success rounded-1 ps-2 pe-2"
                onClick={handleModalOpen}
              >
                <i className="fa-regular fa-plus"></i>
                Thêm
              </button>
              <div className="find_patient p-lg-1 w-25">
                <label htmlFor="">Tìm kiếm bệnh nhân:</label>
                <input type="text" placeholder="nhập CCCD" className="ps-1" />
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div
                className="modal fade show"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Thêm thông tin bệnh nhân
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleModalClose}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form id="patient-form" onSubmit={handleSubmit}>
                        {/* ĐOẠN NÀY XỬ LÝ DATA BASE */}
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Họ tên
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={newPatient.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {/* Thêm vào chớ chưa có đủ*/}
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={Patient_css.patient_list_content}>
              <table className={`table ${Patient_css.table}`}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">mã BN</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">CCCD</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.cccd}</td>
                      <td>{patient.birthdate}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.phone}</td>
                      <td id={Patient_css.trash_bin}>
                        <a
                          href="#"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatientListPage;
