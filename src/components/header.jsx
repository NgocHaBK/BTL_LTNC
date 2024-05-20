import Base_css from "./../css/base.module.css";
import HCMUT_LOGO from "./../img/HCMUT_official_logo.png";
import Admin_css from "./../css/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

function HeaderPage() {
  return (
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
  );
}
export default HeaderPage;
