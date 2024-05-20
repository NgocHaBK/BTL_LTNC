import HCMUT_LOGO from  './../img/HCMUT_official_logo.png';
import React from 'react';
import Style_css from  './../css/style.module.css'
import Base_css from './../css/base.module.css';
import Patient_css from './../css/patient.module.css';
import Admin_css from './../css/admin.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const MedicinePage = () => {
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
                                <FontAwesomeIcon icon={faLocation} className="icon_header" />
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

            <main>
                 <div className={`${Style_css.container} ${Style_css.style}`}>
                    <div className={Patient_css.patient_list}>
                        <div className={Patient_css[`patient_list-title`]}>
                            <h3>DANH SÁCH BÁC SĨ</h3>
                        </div>
                        <div className={`${Patient_css.addpatient} d-flex justify-content-between`}>
                            <button className={`${Patient_css[`btn-add`]} text-bg-success rounded-1 ps-2 pe-2`}>
                                <i className="fa-regular fa-plus"></i>
                                Thêm
                            </button>
                            <div className="find_patient p-lg-1 w-25">
                                <label htmlFor="">Tìm kiếm thuốc:</label>
                                <input type="text" placeholder="nhập tên thuốc" className="ps-1" />
                            </div>
                        </div>
                        <div className={Patient_css.patient_list_content}>
                            <table className={`table ${Patient_css.table}`}>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tên thuốc</th>
                                        <th scope="col">Ngày nhập kho</th>
                                        <th scope="col">Ngày hết hạn</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Đã sử dụng</th>
                                        <th scope="col">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>asperin</td>
                                        <td>
                                            <input type="date" className="border border-0" />
                                        </td>
                                        <td>
                                            <input type="date" className="border border-0" />
                                        </td>
                                        <td>400</td>
                                        <td>3</td>
                                        <td id={Patient_css.trash_bin}>
                                            <a href="#">
                                                <i className="fa-sharp fa-solid fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>asperin</td>
                                        <td>
                                            <input type="date" className="border border-0" />
                                        </td>
                                        <td>
                                            <input type="date" className="border border-0" />
                                        </td>
                                        <td>300</td>
                                        <td>32</td>
                                        <td id={Patient_css.trash_bin}>
                                            <a href="#">
                                                <i className="fa-sharp fa-solid fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>asperin</td>
                                        <td>
                                            <input type="date" className="border border-0" />
                                        </td>
                                        <td>
                                            <input type="date" className="border border-0" />
                                        </td>
                                        <td>1000</td>
                                        <td>12</td>
                                        <td id={Patient_css.trash_bin}>
                                            <a href="#">
                                                <i className="fa-sharp fa-solid fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default MedicinePage;