import { useState } from "react";
import CreateTicketModal from "../components/Ticket/CreateTicketModal";
import { TicketStatus, TicketType, type Ticket } from "../types/ticket";
import { CiClock2, CiMail } from "react-icons/ci";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { GoXCircle } from "react-icons/go";
import { getTicketById } from "../services/ticket.service";
import { SlCalender } from "react-icons/sl";

const Help: React.FC = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Ticket>();

  const handleSearch = (searchValue: string) => {
    getTicketById(searchValue)
      .then((data) => setTicket(data))
      .catch(() => setTicket(undefined));
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.PENDING:
        return <CiClock2 className="w-4 h-4 text-yellow-500" />;
      case TicketStatus.IN_PROGRESS:
        return <FiAlertCircle className="w-4 h-4 text-blue-500" />;
      case TicketStatus.RESOLVED:
        return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case TicketStatus.CLOSED:
        return <GoXCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <CiClock2 className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.PENDING:
        return "Đang chờ";
      case TicketStatus.IN_PROGRESS:
        return "Đang xử lý";
      case TicketStatus.RESOLVED:
        return "Đã giải quyết";
      case TicketStatus.CLOSED:
        return "Đã đóng";
      default:
        return status;
    }
  };

  const getTypeText = (type: TicketType) => {
    switch (type) {
      case TicketType.RETURNED:
        return "Về đơn hàng";
      case TicketType.EXCHANGE:
        return "Đổi hàng";
      case TicketType.COMPLAINT:
        return "Phàn nàn";
      case TicketType.OTHERS:
        return "Khác";
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  return (
    <>
      <div className="min-h-[500px] mx-auto max-w-screen-xl p-10 py-5">
        <div className="mt-5 rounded-lg">
          <div className="m-auto">
            <p className="font-semibold text-3xl text-center">
              Xin chào, FSTORE có thể hổ trợ gì cho bạn ?
            </p>
            <p className="text-center text-zinc-600 mt-3">
              Tạo hỗ trợ hoặc theo dõi yêu càu đã gửi
            </p>
          </div>

          <div className="flex w-full gap-3 mt-5">
            <div className="flex flex-1 rounded">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch((e.target as HTMLInputElement).value);
                  }
                }}
                type="text"
                placeholder="Nhập mã hổ trợ"
                className="p-2 px-5 flex-1 focus:ring-0 placeholder:text-sm text-sm focus:outline-none border focus:border-color-brand-surface rounded"
              />
            </div>
            <button
              onClick={() => setIsOpenCreateModal(true)}
              className="px-10 active:scale-95 transition-all duration-200 bg-color-brand-surface font-medium rounded"
            >
              Tạo mới
            </button>
          </div>

          {ticket && (
            <div
              key={ticket.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      #{ticket.id}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getTypeText(ticket.type)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <CiMail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {ticket.email}
                    </span>
                  </div>

                  {ticket.orderId && (
                    <div className="text-xs text-gray-500 mb-2">
                      Đơn hàng: #{ticket.orderId}
                    </div>
                  )}

                  <p className="text-sm text-gray-700 line-clamp-2">
                    Khách: {ticket.customerNote || "Không có ghi chú"}
                  </p>

                  <p className="text-sm text-gray-700 line-clamp-2">
                    Quản trị viên: {ticket.adminNote || "Không có ghi chú"}
                  </p>
                </div>

                <div className="ml-4 flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(ticket.status)}
                    <span className="text-xs font-medium text-gray-600">
                      {getStatusText(ticket.status)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <SlCalender className="w-3 h-3 mr-1" />
                    {formatDate(ticket.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CreateTicketModal
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </>
  );
};

export default Help;
