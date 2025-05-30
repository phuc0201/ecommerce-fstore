import type React from "react";
import { FiPhone } from "react-icons/fi";
import { IoIosArrowDown, IoIosMail } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111928] text-white py-10">
      <div className="max-w-[1440px] grid divide-y-[1px] divide-zinc-600/30 m-auto">
        <div className="py-5 grid grid-cols-3 gap-20 items-start">
          <div className="grid gap-4">
            <h3>FSTORE XIN CHÀO 🥰</h3>
            <p className="text-sm">
              Chúng tôi luôn quý trọng và tiếp thu mọi ý kiến đóng góp từ khách
              hàng, nhằm không ngừng cải thiện và nâng tầm trải nghiệm dịch vụ
              cũng như chất lượng sản phẩm.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập email của bạn tại đây"
                className="flex-1 outline-none focus:border-0 focus:ring-0 rounded-full p-1 px-4 placeholder:text-sm text-sm"
              />
              <button className="bg-[#ffc84a] w-36 rounded-full p-1">
                Gửi
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-white">
            <div className="flex items-start gap-2">
              <FiPhone className="text-2xl" />
              <div>
                <p className="font-light">Đặt hàng</p>
                <p className="font-medium">024 999 86 999</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <IoIosMail className="text-3xl" />
              <div>
                <p className="font-light">Email</p>
                <p className="font-medium">phuoc@fstore.vn</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FiPhone className="text-2xl" />
              <div>
                <p className="font-light">Góp ý khiếu nại</p>
                <p className="font-medium">1800 2086</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <SlLocationPin className="text-6xl" />
              <div>
                <p className="font-light">Địa chỉ</p>
                <p className="font-medium leading-snug">
                  Số 1 Võ Văn Ngân, Thủ Đức, Tp.HCM
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10 text-4xl justify-end">
            <FaFacebookSquare />
            <FaTiktok />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>

        <div className="py-5">
          <div className="py-2 uppercase flex justify-between items-center w-full">
            <span>hệ thống cửa hàng</span>
            <IoIosArrowDown className="text-xl" />
          </div>
          <div className="py-2 uppercase flex justify-between items-center w-full">
            <span>mua sắm</span>
            <IoIosArrowDown className="text-xl" />
          </div>
          <div className="py-2 uppercase flex justify-between items-center w-full">
            <span>dịch vụ khách hàng</span>
            <IoIosArrowDown className="text-xl" />
          </div>
          <div className="py-2 uppercase flex justify-between items-center w-full">
            <span>về fstore</span>
            <IoIosArrowDown className="text-xl" />
          </div>
        </div>

        <div className="py-5 w-full flex items-center justify-between">
          <div>
            <h2 className="mb-2">@ CÔNG TY CỔ PHẦN THỜI TRANG FSTORE</h2>
            <p className="max-w-[60%] text-sm">
              Mã số doanh nghiệp: 0987654321. Giấy chứng nhận đăng ký doanh
              nghiệp do Sở Kế hoạch và Đầu tư TP Hồ Chí Minh cấp lần đầu ngày
              04/03/2025
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <img
              src="https://yody.vn/assets/202505281037/footer_dmca-CHyltgeF.png"
              alt=""
              className="w-24"
            />
            <img
              src="https://yody.vn/assets/202505281037/footer_bct-BVXc02qZ.png"
              alt=""
              className="w-24"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
