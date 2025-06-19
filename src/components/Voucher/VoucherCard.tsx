import type { Voucher } from "../../types/voucher";
import { CartService } from "../../services/cart.service";

interface VoucherCardProps {
  selectedVoucher: Voucher;
  voucherInfo: Voucher;
  setSelectedVoucher: (voucher: Voucher) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = (props) => {
  function handleSelectVoucher() {
    if (props.voucherInfo.quantity - props.voucherInfo.usedQuantity === 0)
      return;
    if (!checkMinBasketAmount()) return;

    props.setSelectedVoucher(
      props.selectedVoucher && props.selectedVoucher.id === props.voucherInfo.id
        ? (null as any)
        : props.voucherInfo
    );
  }

  const checkMinBasketAmount = (): boolean => {
    const cart = CartService.getCart()?.items || [];
    const total = CartService.calculateTotalPrice(cart);
    return props.voucherInfo.fromValue
      ? total - props.voucherInfo.fromValue >= 0
      : true;
  };

  return (
    <div
      onClick={handleSelectVoucher}
      className={`p-2 rounded-xl mb-2 border cursor-pointer flex justify-between transition-all duration-200 ${
        props.selectedVoucher &&
        props.selectedVoucher.id === props.voucherInfo.id
          ? "border-primary/30"
          : "border-gray-200"
      }
      ${
        props.voucherInfo.quantity - props.voucherInfo.usedQuantity === 0
          ? "text-gray-500"
          : ""
      }

       ${checkMinBasketAmount() ? "" : "text-gray-500"}
      
      `}
    >
      <div className="flex gap-2">
        <img
          src={props.voucherInfo.image}
          alt=""
          className="w-14 max-h-14 h-14 object-cover aspect-square rounded-xl"
        />
        <div className="text-xs">
          <span className="line-clamp-1 capitalize">
            {props.voucherInfo.name}
          </span>
          <s>
            {props.voucherInfo.type == "AMOUNT"
              ? props.voucherInfo.value.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : props.voucherInfo.value + "%"}
          </s>
          {props.voucherInfo.maxDiscount && (
            <p>
              {"Tối đa: " +
                props.voucherInfo.maxDiscount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </p>
          )}
          <span className="block">
            Số lượng còn lại:{" "}
            {props.voucherInfo.quantity - props.voucherInfo.usedQuantity}
          </span>
          {props.voucherInfo.fromValue && (
            <span className="block">
              Đơn hàng tối thiểu:{" "}
              {props.voucherInfo.fromValue.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
