import { useState } from "react";
import { TicketType } from "../../types/ticket";
import type { CreateTicketDto } from "../../types/ticket";
import { toast } from "react-toastify";
import { createTicket } from "../../services/ticket.service";

type CreateTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<CreateTicketDto>({
    email: "",
    orderId: undefined,
    type: TicketType.OTHERS,
    customerNote: "",
  });

  const handleSubmit = async () => {
    if (
      !formData.orderId ||
      formData.email.trim() === "" ||
      formData.email.trim() === ""
    ) {
      toast.warn("Vui lòng cung cấp đầy đủ thông tin");
    } else {
      let type = "ORTHERS";
      switch (formData.type) {
        case TicketType.COMPLAINT:
          type = "COMPLAINT";
          break;
        case TicketType.RETURNED:
          type = "RETURNED";
          break;
        case TicketType.EXCHANGE:
          type = "EXCHANGE";
          break;
      }

      const ticket = await createTicket({ ...formData, type: type });
      if (ticket) {
        toast.success("Tạo hỗ trợ thành công. Hãy kiểm tra email");
      }
    }
  };

  return (
    <div
      className={`fixed transition-all duration-500 ease-in-out z-20 top-0  left-1/2 -translate-x-1/2 ${
        isOpen
          ? "top-1/2 opacity-100 -translate-y-2/3"
          : "opacity-0  -translate-y-full"
      }`}
    >
      <div className="p-5 border shadow-lg rounded-md bg-white w-96">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tạo hỗ trợ mới
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-color-brand-surface focus:outline-none placeholder:text-sm text-sm"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số đơn hàng (tùy chọn)
              </label>
              <input
                type="number"
                value={formData.orderId || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orderId: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-color-brand-surface focus:outline-none placeholder:text-sm text-sm"
                placeholder="12345"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại hỗ trợ *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as TicketType,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-color-brand-surface focus:outline-none text-sm cursor-pointer"
              >
                <option value={TicketType.RETURNED}>Về đơn hàng</option>
                <option value={TicketType.EXCHANGE}>Đổi hàng</option>
                <option value={TicketType.COMPLAINT}>Phàn nàn</option>
                <option value={TicketType.OTHERS}>Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả vấn đề
              </label>
              <textarea
                rows={4}
                value={formData.customerNote}
                onChange={(e) =>
                  setFormData({ ...formData, customerNote: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-color-brand-surface focus:outline-none placeholder:text-sm text-sm"
                placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100  rounded-md focus:outline-none focus:border-none"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="px-4 py-2 text-sm font-medium text-black bg-color-brand-surface hover:bg-color-brand-surface/90 rounded-md focus:outline-none border-none hover:border-none"
              >
                Tạo hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModal;
