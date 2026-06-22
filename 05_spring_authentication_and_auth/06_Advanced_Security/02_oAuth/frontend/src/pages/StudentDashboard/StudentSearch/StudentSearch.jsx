import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const StudentHeaderSearch = ({
  setIsAddStudent,
  setShowFilterForm,
  setFilteredData,
  filteredData,
  students
}) => {
    const navigate = useNavigate();
  return (

    <div className="w-full flex items-center gap-3">
      {/* Search */}
      <div className="flex-1 relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
        onChange={(e)=>{
          console.log(students)
          
            const f = students.filter((el)=> el?.name.toLowerCase().includes(e.target.value.toLowerCase()))
            setFilteredData({...filteredData, students : f});
        }}
          type="text"
          placeholder="Search students"
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
            focus:ring-2
            focus:ring-gray-100
          "
        />
      </div>

      {/* Filter */}
      <button
      onClick={()=>{
        setShowFilterForm(true);
      }}
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
        "
      >
        <SlidersHorizontal size={18} strokeWidth={2} />
      </button>

      {/* Add Student */}
      <button
        onClick={() => {
          navigate("/enrolled-student/?form=create-student");
          setIsAddStudent(true);
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
        "
      >
        <FiPlus className="text-[16px]" />
        Add Student
      </button>
    </div>
  );
};

export default StudentHeaderSearch; 