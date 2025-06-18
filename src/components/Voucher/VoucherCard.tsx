import type { Voucher } from "../../types/voucher";

interface VoucherCardProps {
  selectedVoucher: Voucher;
  voucherInfo: Voucher;
  setSelectedVoucher: (voucher: Voucher) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = (props) => {
  return (
    <div
      onClick={() => {
        props.setSelectedVoucher(
          props.selectedVoucher &&
            props.selectedVoucher.id === props.voucherInfo.id
            ? (null as any)
            : props.voucherInfo
        );
      }}
      className={`p-2 rounded-xl border cursor-pointer flex justify-between transition-all duration-200 ${
        props.selectedVoucher &&
        props.selectedVoucher.id === props.voucherInfo.id
          ? "border-primary/30"
          : "border-gray-200"
      }`}
    >
      <div className="flex gap-2">
        <img
          src={props.voucherInfo.image}
          alt=""
          className="w-14 aspect-square rounded-xl"
        />
        <div className="text-xs">
          <span className="line-clamp-1 capitalize">
            {props.voucherInfo.name}
          </span>
          <s>{props.voucherInfo.value}</s>
          {props.voucherInfo.maxDiscount && (
            <p>{"Tối đa: " + props.voucherInfo.maxDiscount}</p>
          )}
          <span className="block">
            Số lượng còn lại:{" "}
            {props.voucherInfo.quantity - props.voucherInfo.usedQuantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
