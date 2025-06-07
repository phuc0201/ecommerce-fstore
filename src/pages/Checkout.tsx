import React, { useEffect, useState } from "react";
import { CiLocationArrow1, CiUser } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartService } from "../services/cart.service";
import { PiTruckLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import CartItemCard from "../components/Cart/CartItemCard";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import PATH from "../constants/routePaths";
import AddressDrawer from "../components/Address/AddressDrawer";
import { OrderDTO } from "../types/cart";
import AddressService from "../services/address.service";
import { OrderService } from "../services/order.service";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const [isVisibleAddressDrawer, setVisibleAddressDrawer] = useState(false);
  const navigate = useNavigate();
  const [orderDTO, setOrderDTO] = useState<OrderDTO>({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
    cart: cart?.itemDTO || [],
  });

  const recipientInfo = AddressService.getAddressFromLocal();

  useEffect(() => {
    if (recipientInfo && recipientInfo.length > 0) {
      const defaultAddress = recipientInfo.find(
        (address) => address.defaultAddress === true
      );
      if (defaultAddress) {
        setOrderDTO((prev) => ({
          ...prev,
          name: defaultAddress.fullname,
          phone: defaultAddress.phoneNumber,
          address: defaultAddress.address,
        }));
      }
    }
  }, [isVisibleAddressDrawer]);

  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate(PATH.CATEGORY);
    }
  }, [cart]);

  const handleOrder = async () => {
    if (
      orderDTO.name === "" ||
      orderDTO.phone === "" ||
      orderDTO.address === "" ||
      orderDTO.email === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin người nhận.");
      return;
    }

    const order = await OrderService.createOrder(orderDTO);
    console.log("Order placed:", order);
    if (
      window.confirm("Đặt hàng thành công! Hãy kiểm tra email để xem hóa đơn.")
    ) {
      navigate(PATH.CATEGORY);
    }
  };

  return (
    <>
      <header className="border-b border-zinc-200">
        <div className="flex items-center justify-between py-4 mx-auto max-w-7xl lg:px-5 px-10">
          <Link to={"/category"}>
            <button>
              <GoArrowLeft className="text-xl" />
            </button>
          </Link>
          <div className="text-lg font-medium">Xác nhận đặt hàng</div>
          <div></div>
        </div>
      </header>

      <div className="checkout max-w-7xl py-10 mx-auto lg:px-5 px-10">
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="flex-1 lg:min-h-[800px]">
            <div className="grid gap-5 p-6 border border-zinc-200 rounded-2xl">
              <div className="flex items-center gap-2">
                <CiUser className="text-xl" />
                <h4>Thông tin người nhận</h4>
              </div>

              <input
                type="text"
                value={orderDTO.name}
                onChange={(e) =>
                  setOrderDTO({ ...orderDTO, name: e.target.value })
                }
                placeholder="Nhập tên người nhận"
                className="w-full p-3 border border-zinc-200 rounded-full text-sm px-5 focus:outline-none focus:border-color-brand-surface transition-colors duration-300"
              />
              <input
                type="text"
                value={orderDTO.phone}
                onChange={(e) =>
                  setOrderDTO({ ...orderDTO, phone: e.target.value })
                }
                placeholder="Nhập số điện thoại"
                className="w-full p-3 border border-zinc-200 rounded-full text-sm px-5 focus:outline-none focus:border-color-brand-surface transition-colors duration-300"
              />
              <input
                type="email"
                value={orderDTO.email}
                onChange={(e) =>
                  setOrderDTO({ ...orderDTO, email: e.target.value })
                }
                placeholder="Nhập địa chỉ email để nhận hóa đơn"
                className="w-full p-3 border border-zinc-200 rounded-full text-sm px-5 focus:outline-none focus:border-color-brand-surface transition-colors duration-300"
              />

              <button
                onClick={() => setVisibleAddressDrawer(true)}
                type="button"
                className="p-3 px-5 text-zinc-400 text-sm border border-zinc-200 rounded-full"
              >
                <div className="flex items-center justify-between gap-2">
                  <p>
                    {orderDTO.address ||
                      "Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"}
                  </p>
                  <span className="text-xl text-black">
                    <CiLocationArrow1 />
                  </span>
                </div>
              </button>
            </div>
            <div className="mt-5 p-6 border border-zinc-200 rounded-2xl">
              <h1 className="flex items-center gap-2">
                <HiOutlineShoppingBag className="text-xl" />
                <p>Chi tiết đơn hàng</p>
              </h1>
              {cart?.items && cart.items.length > 0
                ? cart.items.map((item) => (
                    <CartItemCard key={item.variantId} {...item} />
                  ))
                : ""}
            </div>
          </div>

          <div className="w-[436px] h-fit p-6 border border-zinc-200 rounded-2xl">
            <button className="flex items-center justify-between gap-2 p-3 px-4 border border-zinc-200 rounded-xl text-sm w-full">
              <div className="flex items-center gap-2">
                <GiMoneyStack className="text-2xl" />
                <div>(COD) Thanh toán khi nhận hàng</div>
              </div>
              <IoIosArrowForward className="text-xl text-zinc-400" />
            </button>

            <div className="grid divide-y-2 divide-zinc-200 divide-dotted gap-y-3">
              <div className="grid gap-3 text-sm mt-4">
                <p className="font-semibold text-base">Chi tiết đơn hàng</p>
                <div className="flex justify-between items-end">
                  <p>Tổng tiền</p>
                  <p className="font-medium">
                    {CartService.calculateSubtotal(
                      cart?.items || []
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <p>Giảm giá</p>
                  <p className="font-medium">
                    {CartService.calculateDiscount(
                      cart?.items || []
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <p>Phí vận chuyển</p>

                  <div className="flex items-center gap-2 font-medium">
                    <PiTruckLight className="text-green-600 text-xl" />
                    <p>15.000 đ</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex justify-between items-end">
                  <p className="text-sm">Thành tiền</p>
                  <p className="font-medium">
                    {(
                      CartService.calculateTotalPrice(cart?.items || []) + 15000
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <button
                  onClick={handleOrder}
                  className="w-full mt-4 py-3 bg-color-brand-surface text-black rounded-full font-medium text-sm transition-colors duration-300 hover:bg-color-brand-surface-hover"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddressDrawer
        isVisible={isVisibleAddressDrawer}
        onClose={() => setVisibleAddressDrawer(false)}
      />
    </>
  );
};

export default Checkout;
