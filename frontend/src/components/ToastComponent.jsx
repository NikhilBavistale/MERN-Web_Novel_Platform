import { Toast } from "flowbite-react";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";

const ToastComponent = ({ message, type }) => {
  let bgColor, Icon;
  switch (type) {
    case "success":
      bgColor = "bg-green-500 text-white";
      Icon = HiCheck;
      break;
    case "error":
      bgColor = "bg-red-500 text-white";
      Icon = HiX;
      break;
    case "warning":
      bgColor = "bg-orange-500 text-white";
      Icon = HiExclamation;
      break;
    default:
      bgColor = "bg-gray-500 text-white";
      Icon = HiExclamation;
  }

  return (
    <div className="fixed bottom-5 left-5">
      <Toast>
        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bgColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
};

export default ToastComponent;