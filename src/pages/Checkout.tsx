import React, { useEffect, useState } from "react";
import { CiLocationArrow1, CiUser } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { BsQrCodeScan, BsTicketPerforated } from "react-icons/bs";
import { toast } from "react-toastify";
import VouchersModal from "../components/Voucher/VouchersModal";
import type { Voucher } from "../types/voucher";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const [params] = useSearchParams();
  const [isVisibleAddressDrawer, setVisibleAddressDrawer] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "COD" | "BANKING"
  >("COD");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | undefined>();
  const [isOpenVouchersModal, setIsOpenVouchersModal] =
    useState<boolean>(false);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [isShowPaymentSelecter, setIsShowPaymentSelector] =
    useState<boolean>(false);
  const [discountValue, setDiscountValue] = useState<number>(0);

  const [total, setTotal] = useState<number>(0);

  const navigate = useNavigate();
  const [orderDTO, setOrderDTO] = useState<OrderDTO>({
    name: "",
    email: "phcnguyenba@gmail.com",
    phone: "",
    address: "",
    paymentMethod: selectedPaymentMethod,
    cart: cart?.itemDTO || [],
    returnUrl: import.meta.env.VITE_RETURN_PAYMENT_URL,
    to_district_id: 0,
    to_ward_code: "",
  });

  const recipientInfo = AddressService.getAddressFromLocal();

  useEffect(() => {
    const status = params.get("status");
    if (!status) return;
    if (status) setSelectedPaymentMethod("BANKING");
    switch (status) {
      case "PAID":
        toast.success("Thanh toán thành công! Kiểm tra email để xem hóa đơn");
        setTimeout(() => {
          navigate(PATH.CATEGORY);
        }, 2000);
        break;
      case "PENDING":
        toast.warning("Đơn hàng đang chờ thanh toán.");
        break;
      case "PROCESSING":
        toast.info("Đơn hàng đang được xử lý.");
        break;
      case "CANCELLED":
        toast.error("Thanh toán thất bại");
        break;
      default:
        break;
    }
  }, [params]);

  const fetchShippingFee = async (
    to_district_id: number,
    to_ward_code: string
  ) => {
    try {
      const res = await OrderService.getShippingFee(
        to_district_id,
        to_ward_code
      );
      if (res && res.data && res.data.total) {
        setShippingFee(res.data.total);
      }
    } catch (error) {
      setShippingFee(15000);
    }
  };

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
          to_district_id: defaultAddress.to_district_id,
          to_ward_code: defaultAddress.to_ward_code,
        }));

        if (defaultAddress.to_district_id && defaultAddress.to_ward_code) {
          fetchShippingFee(
            defaultAddress.to_district_id,
            defaultAddress.to_ward_code
          );
        }
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
      toast.warning("Vui lòng điền đầy đủ thông tin người nhận.");
      return;
    }
    orderDTO.paymentMethod = selectedPaymentMethod;
    if (selectedVoucher) {
      orderDTO.voucherId = selectedVoucher.id;
    }
    const order = await OrderService.createOrder(orderDTO);
    if (selectedPaymentMethod == "BANKING") {
      window.location.href = order.paymentRef;
    } else {
      toast.success("Đặt hàng thành công! Hãy kiểm tra email để xem hóa đơn!");
      navigate(PATH.CATEGORY);
    }
  };

  useEffect(() => {
    if (!isOpenVouchersModal) {
      setTotal(calculateTotalPrice());
    }
  }, [isOpenVouchersModal, shippingFee]);

  useEffect(() => {
    let subtotal = CartService.calculateTotalPrice(cart?.items || []);
    let discount = CartService.calculateDiscount(cart?.items || []);
    let discountFromVoucher = 0;
    if (selectedVoucher) {
      if (selectedVoucher.type == "AMOUNT") {
        discountFromVoucher = selectedVoucher.value;
      } else {
        const discount = subtotal * (selectedVoucher.value || 0);
        const maxDiscount = selectedVoucher.maxDiscount || Infinity;
        discountFromVoucher = Math.min(discount, maxDiscount);
      }
    }

    setDiscountValue(discount + discountFromVoucher);
  }, [total]);

  const calculateTotalPrice = (): number => {
    const subtotal = CartService.calculateTotalPrice(cart?.items || []);
    let total = subtotal;
    if (selectedVoucher) {
      if (selectedVoucher.type == "AMOUNT") {
        total = subtotal - selectedVoucher.value;
      } else {
        const discount = subtotal * (selectedVoucher.value || 0);
        const maxDiscount = selectedVoucher.maxDiscount || Infinity;
        total = subtotal - Math.min(discount, maxDiscount);
      }
    }
    return total + shippingFee;
  };

  return (
    <>
      <VouchersModal
        isOpen={isOpenVouchersModal}
        onClose={() => setIsOpenVouchersModal(false)}
        selectedVoucher={selectedVoucher as Voucher}
        setSelectedVoucher={setSelectedVoucher}
      />

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
            {/* VOUCHERS */}
            <button
              onClick={() => setIsOpenVouchersModal(true)}
              className="flex items-center cursor-pointer gap-3 p-3 px-4 mb-2 border border-zinc-200 rounded-xl text-sm w-full"
            >
              <BsTicketPerforated className="text-2xl" />
              <p>Chọn khuyến mãi</p>
            </button>

            {/* PAYMENT METHOD */}
            <div
              onClick={() => setIsShowPaymentSelector((prev) => !prev)}
              className="relative flex items-center justify-between cursor-pointer gap-2 p-3 px-4 border border-zinc-200 rounded-xl text-sm w-full"
            >
              <div className="flex items-center gap-2">
                {selectedPaymentMethod == "COD" ? (
                  <GiMoneyStack className="text-2xl" />
                ) : (
                  <BsQrCodeScan className="text-2xl" />
                )}
                <div>
                  {selectedPaymentMethod == "COD"
                    ? "(COD) Thanh toán khi nhận hàng"
                    : "(BANKING) Thanh toán online"}
                </div>
              </div>
              <IoIosArrowForward className="text-xl text-zinc-400" />

              <div
                className={`absolute bg-white top-full left-0 right-0 rounded-lg overflow-hidden border transition-all duration-300 ${
                  isShowPaymentSelecter ? "opacity-100" : "opacity-0"
                }`}
              >
                {["COD", "BANKING"].map((item, index) => (
                  <button
                    onClick={() =>
                      setSelectedPaymentMethod(item as "COD" | "BANKING")
                    }
                    key={index}
                    className="flex items-center justify-between gap-2 p-3 px-4 text-sm w-full hover:bg-zinc-100"
                  >
                    <div className="flex items-center gap-2">
                      {item == "COD" ? (
                        <GiMoneyStack className="text-2xl" />
                      ) : (
                        <BsQrCodeScan className="text-2xl" />
                      )}
                      <div>
                        {item == "COD"
                          ? "(COD) Thanh toán khi nhận hàng"
                          : "(BANKING) Thanh toán online"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

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
                    {discountValue.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <p>Phí vận chuyển</p>

                  <div className="flex items-center gap-2 font-medium">
                    <PiTruckLight className="text-green-600 text-xl" />
                    <p>
                      {shippingFee.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex justify-between items-end">
                  <p className="text-sm">Thành tiền</p>
                  <p className="font-medium">
                    {total.toLocaleString("vi-VN", {
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
