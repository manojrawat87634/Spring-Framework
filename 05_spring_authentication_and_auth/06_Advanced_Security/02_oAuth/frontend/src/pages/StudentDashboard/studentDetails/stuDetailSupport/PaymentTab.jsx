import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiClock,
  FiTrendingUp,
  FiDollarSign,
  FiPlus,
} from "react-icons/fi";

import LoadingSpinner from "../../../../Component/CustomLoader";
import PaymentCard from "../../../../Component/Cards/PaymentCard";
import { EmptyState } from "./StudentTab";
import { DataContext } from "../../../../context";

const PaymentTabHeader = ({ data }) => {
  const { totalFees, totalPaid, remainingFees } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-1">
      {/* Total Fees */}
      <div className="bg-white border border-gray-200 rounded-2xl p-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Course Fees
            </p>

            <h2 className=" font-semibold text-gray-900 mt-1.5">
              ₹{totalFees}
            </h2>
          </div>

          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <FiDollarSign className="text-blue-600 text-[18px]" />
          </div>
        </div>
      </div>

      {/* Paid */}
      <div className="bg-white border border-gray-200 rounded-2xl p-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Paid
            </p>

            <h2 className=" font-semibold text-green-600 mt-1.5">
              ₹{totalPaid}
            </h2>
          </div>

          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <FiTrendingUp className="text-green-600 text-[18px]" />
          </div>
        </div>
      </div>

      {/* Remaining */}
      <div className="bg-white border border-gray-200 rounded-2xl p-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Remaining Fees
            </p>

            <h2 className=" font-semibold text-red-500 mt-1.5">
              ₹{remainingFees}
            </h2>
          </div>

          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <FiClock className="text-red-500 text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentTab = ({ setIsItemOpen, setIsItemOpen2 }) => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const { apiGet } = useContext(DataContext);

  useEffect(() => {
    if (!id) return;
    apiGet(`/admin/payments/${id}`, {}, setData);
  }, [id]);

  const payments = data?.payments || [];
  const pricing = data?.coursePricing || [];

  const totalPaid = useMemo(() => {
    return payments.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );
  }, [payments]);

  const totalFees = useMemo(() => {
    return pricing.reduce(
      (sum, p) => sum + Number(p.price || 0),
      0
    );
  }, [pricing]);

  const remainingFees = totalFees - totalPaid;

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-3 bg-[#fafafa]">
      {/* Stats */}
      <PaymentTabHeader
        data={{
          totalFees,
          totalPaid,
          remainingFees,
        }}
      />

      {/* Payment History */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Payment History
            </h2>

            <p className="text-sm text-gray-500 mt-0.5">
              All student payment transactions
            </p>
          </div>

          <button
            onClick={() => {
              setIsItemOpen(false);
              setIsItemOpen2(true);
            }}
            className="
              h-10
              px-4
              rounded-xl
              bg-black
              text-white
              text-sm
              font-medium
              flex
              items-center
              gap-2
              hover:bg-gray-900
              transition-all
              duration-200
              active:scale-[0.98]
            "
          >
            <FiPlus />
            Add Payment
          </button>
        </div>

        {/* Table */}
        {payments.length > 0 ? (
          <div className="overflow-y-scroll h-min-[100px]">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                    Payment
                  </th>

                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                    Method
                  </th>

                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                    Status
                  </th>

                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                    Transaction ID
                  </th>

                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <PaymentCard
                    key={payment.id}
                    payment={payment}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            buttonText={"Add Payment"}
            onCl={() => {
              setAddPayments(true);
            }}
            title={"No Payments Found"}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentTab;