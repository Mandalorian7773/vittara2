import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "warning" | "info" | "confirm";
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) => {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle className="w-16 h-16 text-green-500" />,
    error: <AlertCircle className="w-16 h-16 text-red-500" />,
    warning: <AlertCircle className="w-16 h-16 text-amber-500" />,
    info: <Info className="w-16 h-16 text-blue-500" />,
    confirm: <AlertCircle className="w-16 h-16 text-[#D2691E]" />,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    confirm: "bg-[#D2691E]",
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in">
        {/* Header Strip */}
        <div className={`h-2 ${colors[type]}`}></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">{icons[type]}</div>

          <h3 className="text-2xl font-bold text-[#2C1810] mb-3">{title}</h3>

          <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            {type === "confirm" ? (
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                  className="px-6 py-3 bg-[#D2691E] text-white rounded-lg font-semibold hover:bg-[#B8541A] transition"
                >
                  {confirmText}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`px-8 py-3 ${colors[type]} text-white rounded-lg font-semibold hover:opacity-90 transition`}
              >
                Got it
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Modal;
