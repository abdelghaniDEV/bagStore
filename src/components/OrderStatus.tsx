import { changeStatus } from "@/actions/ordersActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors: Record<string, string> = {
  pending: "bg-[#F7E5CC] text-[#F2800D] border-[#F2800D]",
  confirmed: "bg-[#E6EAFB] text-[#204FC9] border-[#204FC9]",
  shipped: "bg-[#F0FBFE] text-[#13BBE1] border-[#13BBE1]",
  delivered: "bg-[#F0FBF4] text-[#13B458] border-[#13B458]",
  cancelled: "bg-[#FCF0EF] text-[#EA6B6D] border-[#EA6B6D]",
};
import { ToastContainer, toast } from "react-toastify";

export const OrderStatus = ({
  status,
  orderID,
  setRefresh,
}: {
  status: string;
  orderID: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const statusOptions = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const handelChangeStatus = async (statusTarget: string) => {
    try {
      const response = await changeStatus(orderID, statusTarget);
      console.log("change status success", response);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("change status error", err);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full outline-none">
          <div
            className={`flex capitalize items-center justify-center gap-1 border-[1px] ${statusColors[status]}  py-[6px] px-[2px] rounded-[6px]`}
          >
            <span className=" text-[13px] font-[600]">{status}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusOptions.map((status) => {
            return (
              <DropdownMenuItem
                key={status}
                onClick={() => handelChangeStatus(status)}
              >
                <div
                  className={`flex cursor-pointer capitalize w-full items-center justify-center gap-1 border-[1px] ${statusColors[status]}  py-[6px] px-[2px] rounded-[6px]`}
                >
                  <span className=" text-[13px] font-[600]">{status}</span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
