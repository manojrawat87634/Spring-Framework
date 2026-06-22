import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UnpaidHeaderSearch = ({
  setShowInvoiceFilter,
  invoices,
  data,
  setFilteredData,
  setShowFilterForm,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* KPI Card */}
<div
  className="
    h-12
    px-4
    rounded
    bg-red-50
    text-red-700
    border
    border-red-100
    flex
    items-center
    gap-2
    whitespace-nowrap
  "
>
  <div className="w-2 h-2 rounded-full bg-red-500" />
  <span className="text-sm font-medium">
    {invoices?.length || 0} unpaid invoices
  </span>
</div>
      {/* Search */}
      <div className="flex-1 min-w-[280px] relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
       onChange={(e) => {
    const f = data.data.filter((el) =>
        el.studentName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
    );

    setFilteredData({
        ...data,
        data: f,
    });
}}
          type="text"
          placeholder="Search student, phone or invoice..."
          className="
            w-full
            h-12
            pl-11
            pr-4
            bg-white
            border
            border-gray-200
            rounded-xl
            text-sm
            text-gray-700
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-200
            focus:border-gray-300
            focus:ring-4
            focus:ring-gray-100
          "
        />
      </div>

      {/* Filter */}
      <button
        onClick={() => setShowInvoiceFilter(true)}
        className="
          h-12
          w-12
          bg-white
          border
          border-gray-200
          rounded-xl
          flex
          items-center
          justify-center
          text-gray-600
          transition-all
          duration-200
          hover:bg-gray-50
          hover:border-gray-300
          active:scale-[0.97]
          shadow-sm
        "
      >
        <SlidersHorizontal size={18} strokeWidth={2} />
      </button>

      {/* Create Invoice */}
      {/* <button
        onClick={() => {
          
          
        }}
        className="
          h-12
          px-5
          bg-black
          hover:bg-gray-900
          text-white
          rounded-xl
          flex
          items-center
          justify-center
          gap-2
          text-sm
          font-medium
          transition-all
          duration-200
          active:scale-[0.98]
          whitespace-nowrap
          shadow-sm
        "
      >
        <FiPlus className="text-[16px]" />
        Create Invoice
      </button> */}
    </div>
  );
};

export default UnpaidHeaderSearch;