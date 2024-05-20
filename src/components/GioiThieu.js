import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";         // Corrected path
import "slick-carousel/slick/slick-theme.css";   // Corrected path
import logoImage from './../img/HCMUT_official_logo.png';
import blogImage1 from './../img/blog1.jpg';
import blogImage2 from './../img/blog2.jpg';
import blogImage3 from './../img/blog3.jpg';
import modernEquipmentImage from './../img/trang-thiet-bi-hien-dai.jpg';
import authorImage1 from './../img/author1.jpg';
import authorImage2 from './../img/author2.jpg';
import authorImage3 from './../img/author3.jpg';
import blogSidebarImage1 from './../img/blog-sidebar1.jpg';
import blogSidebarImage2 from './../img/blog-sidebar2.jpg';
import blogSidebarImage3 from './../img/blog-sidebar3.jpg';
import footerLogo from './../img/HCMUT_official_logo.png';

// Import external CSS
{/*
import 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
import 'https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css';
import 'https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-thin.css';
import 'https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-solid.css';
import 'https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-regular.css';
import 'https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css';
import 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css';

// Import internal CSS (make sure the path is correct based on your project structure)

    import './../css/gioi_thieu_style.css';
import './../css/gioi_thieu_base.css';
import './../css/gioi_thieu_bootstrap.min.css';
import './../css/gioi_thieu_nice-select.css';
import './../css/gioi_thieu_font-awesome.min.css';
import './../css/gioi_thieu_icofont.css';
import './../css/gioi_thieu_slicknav.min.css';
import './../css/gioi_thieu_owl-carousel.css';
import './../css/gioi_thieu_datepicker.css';
import './../css/gioi_thieu_animate.min.css';
import './../css/gioi_thieu_magnific-popup.css';
import './../css/gioi_thieu_normalize.css';
import './../css/gioi_thieu_style.css';
import './../css/gioi_thieu_responsive.css';
import './../css/base.css';
import './../css/style.css';
*/}
export default function GioiThieu() {
    return (
        <div>
            {/* header */}
            <section className="header-nav" id="header_">
                <header>
                    <div className="wrapper">
                        <div className="header_content">
                            <div className="hospital_logo">
                                <a href="#" className="hospital_logo-link">
                                    <img className="header_logo" src={logoImage} alt="hospital_logo" />
                                    <div className="hospital_logo_text">
                                        <h2>Bách Khoa Hospital</h2>
                                    </div>
                                </a>
                            </div>
                            <nav className="logo_list">

                                <div className="logo_list__location">
                                    <a className="number" href="tel:0855628333">
                                        <i className="fa-sharp fa-regular fa-location-dot"></i>
                                        <span>Thành Phố Hồ Chí Minh -
                                            0855 628 333 </span>
                                    </a>
                                </div>
                            </nav>
                            <ul>

                                <li><a href="#">
                                    <i className="fa-regular fa-headphones"></i>
                                    Hỏi đáp</a></li>
                                <li><a href="#">
                                    <i className="fa-duotone fa-calendar-days"></i>
                                    Đặt lịch khám</a></li>

                                <li><a href="#" style={{ color: '#FFDF5F' }}>
                                    Đăng nhập
                                </a></li>
                                <li><a href="/signup" style={{ color: '#FFDF5F' }}>
                                    Đăng ký
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </header>
                <nav className="list">
                    <div className="wrapper">
                        <ul>
                            <li className="active dropdown_layer">
                                <a href="./index.html">Giới thiệu</a>
                                <div className="dropdown-content">
                                    <a href="./gioi_thieu.html" className="a_drop">Option 1</a>
                                </div>
                            </li>
                            <li className="non-dropdown"><a href="#">
                                Chuyên Khoa
                            </a></li>
                            <li className="non-dropdown"><a href="./tien_nghi.html">
                                Tiện nghi
                            </a></li>
                            <li className="non-dropdown"><a href="./specialist-doctor1.html">
                                Chuyên gia - Bác sĩ
                            </a></li>
                            <li className="non-dropdown"><a href="./thanh_tuu.html">
                                Thành tựu
                            </a></li>
                            <li className="non-dropdown"><a href="contact.html">
                                Liên Hệ
                            </a></li>
                        </ul>
                    </div>
                </nav>
            </section>

            <div className="breadcrumbs overlay">
                <div className="container">
                    <div className="bread-inner">
                        <div className="row">
                            <div className="col-12">
                                <h2>Giới Thiệu</h2>
                                <ul className="bread-list">
                                    <li><a href="index.html">Giới thiệu</a></li>
                                    <li><i className="icofont-simple-right"></i></li>
                                    <li className="active">Tầm nhìn và sứ mệnh</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="news-single section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="single-main">

                                        <div className="news-head">
                                            <img src={blogImage1} alt="#" />
                                        </div>

                                        <h1 className="news-title">SỨ MỆNH – TẦM NHÌN</h1>

                                        <div className="news-text">
                                            <p>Dựa trên nền tảng truyền thống, các giá trị lớn của ngành y Việt Nam từ xưa đến nay, đồng thời mong muốn mang lại cho người dân dịch vụ khám chữa bệnh chất lượng cao về y khoa, tiếp cận phương pháp, kỹ thuật và phác đồ hiện đại, được hưởng các dịch vụ cao cấp như ở nước ngoài, bệnh viện Đa Khoa Tâm Anh đã được thành lập. Ngay từ khi mới bắt đầu đi vào hoạt động, bệnh viện Tâm Anh đã chú trọng việc xây dựng đội ngũ chuyên gia bác sĩ giỏi về chuyên môn, nhiều kinh nghiệm, bệnh viện đã quy tụ được đội ngũ chuyên gia hàng đầu từ nhiều lĩnh vực như nam khoa tiết niệu, sản phụ khoa, nhi khoa, hô hấp, cơ xương khớp, hỗ trợ sinh sản, tai mũi họng, thần kinh…</p>
                                            <h1 className="news-title">ĐỘI NGŨ CHUYÊN GIA</h1>
                                            <p>Các chuyên viên giỏi ở các lĩnh vực hỗ trợ cũng được tập hợp để tạo nên các quy trình dịch vụ toàn diện, khoa học, hiệu quả.</p>
                                            <div className="image-gallery">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="single-image">
                                                            <img src={blogImage2} alt="#" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="single-image">
                                                            <img src={blogImage3} alt="#" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="news-title">CƠ SỞ VẬT CHẤT – TRANG THIẾT BỊ HIỆN ĐẠI</h1>
                                            <p>Bệnh viện Đa khoa Tâm Anh là đơn vị hàng đầu tại Việt Nam đầu tư lớn cho các trang thiết bị máy móc, phương pháp chẩn đoán và điều trị bệnh hàng đầu thế giới. Nhiều trang thiết bị máy móc có số lượng ít trên thế giới và hiếm có ở Việt Nam.</p>
                                            <div className="news-head">
                                                <img src={modernEquipmentImage} alt="#" />
                                            </div>
                                            <h1 className="news-title">DỊCH VỤ CAO CẤP – GIÁ THÀNH HỢP LÝ</h1>
                                            <p>Bệnh viện hướng tới phục vụ đông đảo khách hàng, người bệnh với giá thành hợp lý, nhiều chính sách ưu đãi về chi phí, hỗ trợ trả góp không lãi suất cho nhiều dịch vụ khám chữa bệnh.</p>
                                            <p>Với sự ra đời và phát triển với 2 bệnh viện lớn tại Hà Nội & TP. HCM, hàng trăm ngàn người dân đã không phải ra nước ngoài để thăm khám và điều trị nhiều bệnh lý mà có thể sử dụng nhiều dịch vụ cao cấp không chỉ về chuyên môn mà còn là dịch vụ chăm sóc khách hàng chất lượng cao ngay tại Việt Nam.</p>
                                        </div>
                                        <div className="blog-bottom">

                                            <ul className="social-share">
                                                <li className="facebook"><a href="#"><i className="fa fa-facebook"></i><span>Facebook</span></a></li>
                                                <li className="twitter"><a href="#"><i className="fa fa-twitter"></i><span>Twitter</span></a></li>
                                                <li className="google-plus"><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                                <li className="linkedin"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                <li className="pinterest"><a href="#"><i className="fa fa-pinterest"></i></a></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="blog-comments">
                                        <h2>Bình luận</h2>
                                        <div className="comments-body">

                                            <div className="single-comments">
                                                <div className="main">
                                                    <div className="head">
                                                        <img src={authorImage1} alt="#" />
                                                    </div>
                                                    <div className="body">
                                                        <h4>Đình Huy</h4>
                                                        <div className="comment-meta"><span className="meta"><i className="fa fa-calendar"></i>March 05, 2019</span><span className="meta"><i className="fa fa-clock-o"></i>03:38 AM</span></div>
                                                        <p>Bệnh viện rất tốt, trang thiết bị hiện đại, nhân viên y tế hoà đồng</p>
                                                        <a href="#"><i className="fa fa-reply"></i>trả lời</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single-comments left">
                                                <div className="main">
                                                    <div className="head">
                                                        <img src={authorImage2} alt="#" />
                                                    </div>
                                                    <div className="body">
                                                        <h4>Vũ Hoan</h4>
                                                        <div className="comment-meta"><span className="meta"><i className="fa fa-calendar"></i>March 05, 2019</span><span className="meta"><i className="fa fa-clock-o"></i>03:38 AM</span></div>
                                                        <p>Cảm ơn chị Đình Huy đã có những phản hồi tích cực về bệnh viện, chúng tôi luôn lấy đó làm động lực để phát triển, mang lại cho quý khách hàng những dịch vụ tốt nhất</p>
                                                        <a href="#"><i className="fa fa-reply"></i>trả lời</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single-comments">
                                                <div className="main">
                                                    <div className="head">
                                                        <img src={authorImage3} alt="#" />
                                                    </div>
                                                    <div className="body">
                                                        <h4>Trần Ngọc Hà</h4>
                                                        <div className="comment-meta"><span className="meta"><i className="fa fa-calendar"></i>March 05, 2019</span><span className="meta"><i className="fa fa-clock-o"></i>03:38 AM</span></div>
                                                        <p>Tôi rất hài lòng về chất lượng chăm sóc bệnh nhân của bệnh viện này, mọi thứ ở đây rất tốt.</p>
                                                        <a href="#"><i className="fa fa-reply"></i>Trả lời</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="comments-form">
                                        <h2>Bình luận</h2>

                                        <form className="form" method="post" action="mail/mail.php">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="form-group">
                                                        <i className="fa fa-user"></i>
                                                        <input type="text" name="first-name" placeholder="Họ" required="required" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="form-group">
                                                        <i className="fa fa-user"></i>
                                                        <input type="text" name="last-name" placeholder="Tên" required="required" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="form-group">
                                                        <i className="fa fa-envelope"></i>
                                                        <input type="email" name="email" placeholder="Email của bạn" required="required" />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group message">
                                                        <i className="fa fa-pencil"></i>
                                                        <textarea name="message" rows="7" placeholder="Bình luận tại đây" ></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group button">
                                                        <button type="submit" className="btn primary"><i className="fa fa-send"></i>Gửi bình luận</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="main-sidebar">

                                <div className="single-widget search">
                                    <div className="form">
                                        <input type="email" placeholder="Tìm kiếm..." />
                                        <a className="button" href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>

                                <div className="single-widget category">
                                    <h3 className="title">Danh mục</h3>
                                    <ul className="categor-list">
                                        <li><a href="#">Bác sĩ răng hàm mặt</a></li>
                                        <li><a href="#">Bác sĩ thẩm mĩ</a></li>
                                        <li><a href="#">Bác sĩ tư vấn & khám mắt</a></li>
                                        <li><a href="#">Bác sĩ phụ khoa</a></li>
                                        <li><a href="#">Khác...</a></li>
                                    </ul>
                                </div>

                                <div className="single-widget recent-post">
                                    <h3 className="title">Bài viết gần đây</h3>

                                    <div className="single-post">
                                        <div className="image">
                                            <img src={blogSidebarImage1} alt="#" />
                                        </div>
                                        <div className="content">
                                            <h5><a href="./html/GT_detail_1.html">Trang thiết bị mới.</a></h5>
                                            <ul className="comment">
                                                <li><i className="fa fa-calendar" aria-hidden="true"></i>Jan 11, 2020</li>
                                                <li><i className="fa fa-commenting-o" aria-hidden="true"></i>35</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="single-post">
                                        <div className="image">
                                            <img src={blogSidebarImage2} alt="#" />
                                        </div>
                                        <div className="content">
                                            <h5><a href="./html/GT_detail_1.html">Các cách chăm sóc răng trắng và khoẻ.</a></h5>
                                            <ul className="comment">
                                                <li><i className="fa fa-calendar" aria-hidden="true"></i>Mar 05, 2019</li>
                                                <li><i className="fa fa-commenting-o" aria-hidden="true"></i>59</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="single-post">
                                        <div className="image">
                                            <img src={blogSidebarImage3} alt="#" />
                                        </div>
                                        <div className="content">
                                            <h5><a href="./html/GT_detail_1.html">Bệnh viện BK được bình chọn tốt nhất.</a></h5>
                                            <ul className="comment">
                                                <li><i className="fa fa-calendar" aria-hidden="true"></i>June 09, 2019</li>
                                                <li><i className="fa fa-commenting-o" aria-hidden="true"></i>44</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="single-widget side-tags">
                                    <h3 className="title">Tags</h3>
                                    <ul className="tag">
                                        <li><a href="#">business</a></li>
                                        <li><a href="#">wordpress</a></li>
                                        <li><a href="#">html</a></li>
                                        <li><a href="#">multipurpose</a></li>
                                        <li><a href="#">education</a></li>
                                        <li><a href="#">template</a></li>
                                        <li><a href="#">Ecommerce</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="footer_content">
                    <div className="footer_item">
                        <img src={footerLogo} alt="logo_hcmut" />
                        <h2>Bách Khoa Hospital</h2>
                    </div>
                    <div className="footer_item">
                        <div className="footer_item_title">
                            <h3>HỆ THỐNG BỆNH VIỆN</h3>
                            <hr />
                        </div>
                        <div className="footer_item_location">
                            <i className="fa-sharp fa-regular fa-location-dot"></i>
                            <p>108 Phố Hoàng Như Tiếp,
                                P. Bồ Đề, Q. Long Biên, Tp. Hà Nội</p>
                        </div>
                        <div className="footer_item_location">
                            <i className="fa-sharp fa-regular fa-location-dot"></i>
                            <p>2B Phổ Quang, Phường 2,
                                Q. Tân Bình, Tp. Hồ Chí Minh</p>
                        </div>
                    </div>
                    <div className="footer_item_3">
                        <div className="footer_item_hcm">
                            <div className="hcm_icon_number">
                                <i className="fa fa-phone"></i>
                                <div className="hcm_number">
                                    <a href="tel:0855628333">0855628333</a>
                                    <br />
                                    <a href="tel:0855628555">0855628555</a>
                                </div>

                            </div>

                            <div className="time-email">

                                <p>làm việc từ 7:30 - 16:30</p>
                                <div className="mail">
                                    <i className="fa fa-envelope"></i>
                                    <p>cskh@tamanhhospital.vn</p>
                                </div>

                            </div>

                        </div>
                        <div className="footer_item_hn">
                            <div className="hcm_icon_number">
                                <i className="fa fa-phone"></i>
                                <div className="hcm_number">
                                    <a href="tel:0855628333">0855628333</a>
                                    <br />
                                    <a href="tel:0855628555">0855628555</a>
                                </div>

                            </div>

                            <div className="time-email">

                                <p>làm việc từ 7:30 - 16:30</p>
                                <div className="mail">
                                    <i className="fa fa-envelope"></i>
                                    <p>cskh@tamanhhospital.vn</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="company_infor">
                    <p>
                        CÔNG TY CỔ PHẦN BỆNH VIỆN ĐA KHOA BÁCH KHOA <br />
                        Số đăng ký kinh doanh: 0102362369 <br />
                        cấp bởi Sở kế hoạch và đầu tư Thành phố Hà Nội, đăng ký lần đầu ngày 11 tháng 9 năm 2007
                    </p>
                </div>
            </footer>

            <a href="#" className=" back-to-top cd-top text-replace js-cd-top "><i className="fa-sharp fa-light fa-arrow-up"></i></a>



        </div>
    );
}
