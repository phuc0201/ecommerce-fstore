import { useState, type FormEvent } from "react";
import AddressSelector from "./AddressSelector";
import { LiaAngleLeftSolid } from "react-icons/lia";
import AddressService from "../../services/address.service";
import { Address } from "../../types/address";

export default function FormAddress(props: {
  setIsOpenForm: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<Address>({
    id: "",
    fullname: "",
    phoneNumber: "",
    address: "",
    defaultAddress: false,
    to_district_id: 0,
    to_ward_code: "",
  });

  const [isOpenFormAddressSelector, setIsOpenFormAddressSelector] =
    useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSetAddress = (newAddress: {
    address: string;
    to_district_id: number;
    to_ward_code: string;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ["address"]: newAddress.address,
      ["to_district_id"]: newAddress.to_district_id,
      ["to_ward_code"]: newAddress.to_ward_code,
    }));
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    AddressService.addNewAddress(formData);
    props.setIsOpenForm(false);
  }
  return isOpenFormAddressSelector ? (
    <AddressSelector
      setClose={setIsOpenFormAddressSelector}
      setAddress={handleSetAddress}
    />
  ) : (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto p-4">
      <button
        onClick={() => props.setIsOpenForm(false)}
        className="text-blue-600 text-sm flex items-center gap-2"
      >
        <LiaAngleLeftSolid />
        <span>Trở về</span>
      </button>

      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between flex-1"
      >
        <div>
          <div>
            <div className="text-gray-500 mb-3">Thông tin người nhận</div>
            <div className="flex md:flex-row flex-col gap-3">
              <div className="grid gap-1 md:w-1/2 w-full">
                <label htmlFor="fullname" className="text-sm">
                  Họ và tên
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="rounded-lg focus:ring-yellow-100 focus:outline-none border focus:border-yellow-300 border-gray-300 placeholder:text-sm placeholder:text-gray-400 p-2 px-3"
                />
              </div>
              <div className="grid gap-1 md:w-1/2 w-full">
                <label htmlFor="phoneNumber" className="text-sm">
                  Số điện thoại
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="rounded-lg focus:ring-yellow-100 border focus:border-yellow-300 border-gray-300 placeholder:text-sm placeholder:text-gray-400 p-2 px-3 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-200 my-6"></div>

          <div className="mb-5">
            <div className="text-gray-500">Địa chỉ nhận hàng</div>
            <div
              onClick={() => setIsOpenFormAddressSelector(true)}
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center p-3 rounded-lg cursor-pointer border border-gray-300 "
            >
              <input
                type="text"
                autoComplete="off"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ nhận hàng"
                className="flex-1 border-0 p-0 outline-none focus:ring-0 h-5 cursor-pointer placeholder:text-sm placeholder:text-gray-400"
              />
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
          {/* 
          <div className="flex justify-between">
            <div className="text-gray-500">Loại địa chỉ</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {}}
                className="flex items-center gap-2 p-2 px-3 rounded-2xl border border-orange-300 bg-yellow-50"
              >
                <i className="fa-solid fa-building"></i>
                <span className="leading-none">Văn phòng</span>
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="flex items-center gap-2 p-2 px-3 rounded-2xl border border-gray-400"
              >
                <i className="fa-solid fa-house"></i>
                <span className="leading-none h-3">Nhà</span>
              </button>
            </div>
          </div> */}

          <div className="w-full h-[1px] bg-gray-200 my-6"></div>

          <div className="flex items-center justify-between">
            <div className="text-gray-500">Đặt làm mặc định </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                name="defaultAddress"
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3  bg-primary text-white rounded-lg`}
        >
          <span>Xác nhận</span>
        </button>
      </form>
    </div>
  );
}
