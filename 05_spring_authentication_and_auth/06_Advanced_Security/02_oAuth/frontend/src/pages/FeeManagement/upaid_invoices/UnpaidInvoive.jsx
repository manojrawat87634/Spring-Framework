import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiEye,
  FiCreditCard,
} from "react-icons/fi";
import { DataContext } from "../../../context";
import LoadingSpinner from "../../../Component/CustomLoader";
import { useNavigate, useParams } from "react-router-dom";

const UnpaidInvoice = ({data, setAddPayments}) => {
  const invoices = data?.data || [];
    const {id } = useParams();
    const navigate = useNavigate();
  const totalDue = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0
  );

  return (
    <div className="overflow-x-auto">
  <table className="w-full">
    <thead className="sticky top-0 bg-gray-50 border-b border-gray-100 z-10">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Student
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Phone
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Fee Type
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Amount Due
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Due Date
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Status
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <tr
            key={invoice.invoiceId}
            className="border-b border-gray-100 hover:bg-blue-50 transition-all"
          >
            {/* Student */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                  {invoice.studentName?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {invoice.studentName}
                  </p>

                  <p className="text-xs text-gray-500">
                    Student ID #{invoice.studentId}
                  </p>
                </div>
              </div>
            </td>

            {/* Phone */}
            <td className="px-6 py-4 text-gray-700">
              {invoice.phone}
            </td>

            {/* Fee Type */}
            <td className="px-6 py-4 text-gray-700">
              {invoice.feeType}
            </td>

            {/* Amount */}
            <td className="px-6 py-4">
              <span className="font-bold text-red-600">
                ₹{Number(invoice.amount || 0).toLocaleString()}
              </span>
            </td>

            {/* Due Date */}
            <td className="px-6 py-4 text-gray-700">
              {invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString(
                    "en-IN"
                  )
                : "-"}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
              <span
                className="
                  inline-flex items-center gap-1
                  px-3 py-1.5
                  rounded-full
                  bg-red-50
                  border border-red-200
                  text-red-700
                  text-xs
                  font-semibold
                "
              >
                <FiAlertCircle size={12} />
                Pending
              </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate(`/fee-management/${invoice?.studentId}`)
                    setAddPayments(true);
                }}
                  className="
                    inline-flex items-center gap-1
                    px-3 py-2
                    rounded-lg
                    bg-blue-600
                    text-white
                    text-xs
                    font-medium
                    hover:bg-blue-700
                    transition-all
                  "
                >
                  <FiCreditCard size={14} />
                  Pay
                </button>

                <button
                  onClick={() =>
                    console.log(
                      "View Student",
                      invoice.studentId
                    )
                  }
                  className="
                    inline-flex items-center gap-1
                    px-3 py-2
                    rounded-lg
                    border border-gray-200
                    bg-white
                    text-gray-700
                    text-xs
                    font-medium
                    hover:bg-gray-50
                    transition-all
                  "
                >
                  <FiEye size={14} />
                  Details
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="py-16 text-center">
            <div className="flex flex-col items-center">
              <FiDollarSign className="text-4xl text-gray-300 mb-3" />

              <h3 className="font-semibold text-gray-800">
                No Pending Fees
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                All invoices are paid for this month.
              </p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
};

export default UnpaidInvoice;