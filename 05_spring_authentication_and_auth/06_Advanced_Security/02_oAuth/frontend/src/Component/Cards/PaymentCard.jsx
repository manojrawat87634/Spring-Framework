import {
    FiCreditCard,
    FiCheckCircle,
    FiClock,
    FiTrendingUp,
    FiDollarSign,
} from "react-icons/fi";

const PaymentCard = ({ payment }) => {
    console.log(payment);
    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition">

            {/* Payment */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <FiCreditCard className="text-green-600 text-base" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            ₹{payment.amount}
                        </p>

                        <p className="text-xs text-gray-500">
                            Course #{payment.course_id}
                        </p>
                    </div>

                </div>
            </td>

            {/* Method */}
            <td className="px-6 py-4">
                <span className="capitalize text-sm text-gray-700 font-medium">
                    {payment?.paymentType?.replace("_", " ")}
                </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div
                    className={`
            inline-flex items-center gap-2
            px-3 py-1 rounded-full text-xs font-semibold
            ${payment.status === "success"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }
          `}
                >
                    <FiCheckCircle className="text-xs" />
                    {payment.status}
                </div>
            </td>

            {/* Transaction */}
            <td className="px-6 py-4">
                <p className="text-sm text-gray-700">
                    {payment.transaction_id || "N/A"}
                </p>
            </td>

            {/* Date */}
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-medium text-gray-800">
                        {new Date(payment.paidAt).toLocaleDateString()}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                        {new Date(payment.paidAt).toLocaleTimeString()}
                    </p>
                </div>
            </td>

        </tr>
    );
};

export default PaymentCard;