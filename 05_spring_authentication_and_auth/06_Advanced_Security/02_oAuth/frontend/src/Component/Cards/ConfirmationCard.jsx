import React from "react";
import { FaSpinner } from "react-icons/fa";
import { FiAlertTriangle, FiPlayCircle } from "react-icons/fi";

const ConfirmCard = ({
  title = "Are you sure?",
  description = "",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  button = false,
  variant = "primary",
   // 🔥 key change
}) => {

  const styles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      button: "bg-red-500 hover:bg-red-600",
      disabled: "bg-red-300",
      icon: <FiAlertTriangle size={22} />,
    },
    primary: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      disabled: "bg-blue-300",
      icon: <FiPlayCircle size={22} />,
    },
  };

  const current = styles[variant];

  return (
    <div className="w-full  bg-white rounded-2xl shadow-2xl p-6">
      
      {/* Icon + Title */}
      <div className="flex items-start gap-4">
        
        <div className={`${current.iconBg} ${current.iconColor} p-3 rounded-xl`}>
          {current.icon}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          disabled={button}
          className={`px-4 py-2 rounded-lg text-white transition 
            ${button 
              ? current.disabled + " cursor-not-allowed" 
              : current.button}
          `}
        >
          {button ? <FaSpinner /> : confirmText}
        </button>

      </div>
    </div>
  );
};

export default ConfirmCard;