import { AiFillGift } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import VoucherCard from "./VoucherCard";
import { useEffect, useState } from "react";
import type { Voucher } from "../../types/voucher";
import { getVouchers } from "../../services/voucher.service";

interface VouchersModalProps {
  isOpen: boolean;
  selectedVoucher: Voucher;
  setSelectedVoucher: (voucher: Voucher) => void;
  onClose: () => void;
}

const VouchersModal: React.FC<VouchersModalProps> = (props) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    getVouchers().then((res) => setVouchers(res));
  }, []);

  return (
    <>
      <div
        onClick={() => {
          props.setSelectedVoucher(null as any); // or provide a suitable "no voucher" value
          props.onClose();
        }}
        className={`fixed inset-0 ${
          props.isOpen ? "z-10 opacity-100" : "z-[-1] opacity-0"
        }`}
      ></div>
      <div
        className={`fixed left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all bg-white duration-500 w-[30rem] h-[70%] flex flex-col justify-between rounded-lg shadow-lg ${
          props.isOpen ? "z-10 top-1/2 opacity-100" : "z-[-1] opacity-0 top-0"
        }`}
      >
        <header className="px-5 p-2 flex items-center justify-between border-b border-zinc-200">
          <div className="font-medium flex items-center gap-2">
            <AiFillGift />
            <span>Chọn khuyến mãi</span>
          </div>
          <button
            onClick={() => {
              props.setSelectedVoucher(null as any); // or provide a suitable "no voucher" value
              props.onClose();
            }}
            className="flex text-xl w-10 h-10 hover:bg-black/10 rounded-full"
          >
            <MdClose className="m-auto" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto small-scrollbar p-4">
          {vouchers.map((item, index) => (
            <div key={index}>
              <VoucherCard
                selectedVoucher={props.selectedVoucher}
                voucherInfo={item}
                setSelectedVoucher={props.setSelectedVoucher}
              />
            </div>
          ))}
        </div>

        <footer className="p-4 border-t border-zinc-200">
          <button
            onClick={props.onClose}
            className="bg-color-brand-surface p-2 w-full rounded-full"
          >
            Xác nhận
          </button>
        </footer>
      </div>
    </>
  );
};

export default VouchersModal;
