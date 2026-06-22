import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiBookOpen,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import StudentAutocomplete from "../../Component/auto_compeleate/StudentAutoCompeleate";
import { DataContext } from "../../context";

export default function Sidebar({ students, onSelect, selected , setIsAddStudent}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {apiGet} = useContext(DataContext);
  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  return (
    <div className="w-[360px] min-w-[360px] bg-white border-r border-gray-200 flex flex-col">

      {/* Header */}
      <StudentAutocomplete
   apiGet={apiGet}
   onSelect={(student) => {
      navigate(`/enrolled-student/${student.id}`);
      onSelect(student);
   }}
/>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50/40">
        {filteredStudents.length === 0 && (
          <div className="h-full flex items-center justify-center text-center px-6">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-2xl text-gray-400" />
              </div>

              <h3 className="text-sm font-semibold text-gray-700">
                No students found
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Try searching with another keyword
              </p>
            </div>
          </div>
        )}
        {filteredStudents.map((s) => {
          const isSelected = selected?.id === s.id;
          return (
            <div
              key={s.id}
              onClick={() => {
                navigate(`/enrolled-student/${s.id}`);
                onSelect(s);
              }}
              className={`
                group
                relative
                bg-white
                border
                rounded-2xl
                p-3
                cursor-pointer
                transition-all
                duration-200
                hover:shadow-md
                hover:-translate-y-[1px]
                ${
                  isSelected
                    ? "border-blue-500 shadow-sm bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >

              {/* Active Bar */}
              {isSelected && (
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-blue-600" />
              )}

              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center
                    font-semibold text-sm shrink-0
                    transition
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {s.name?.charAt(0)?.toUpperCase()}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <div className="flex items-start justify-between gap-2">

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {s.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Student Profile
                      </p>
                    </div>

                    <FiChevronRight
                      className={`
                        text-sm mt-1 transition
                        ${
                          isSelected
                            ? "text-blue-600"
                            : "text-gray-300 group-hover:text-gray-500"
                        }
                      `}
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3">

                    {/* Course Count */}
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-full bg-gray-100 text-[11px] font-medium text-gray-600">
                        {s?.courses?.length || 0} Courses
                      </div>
                    </div>

                    {/* Payment Status */}
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`
                          w-2 h-2 rounded-full
                          ${
                            s.paymentStatus === "paid"
                              ? "bg-green-500"
                              : "bg-orange-400"
                          }
                        `}
                      />

                      <span className="text-[11px] font-medium text-gray-500">
                        {s.paymentStatus === "paid"
                          ? "Paid"
                          : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
       </div>

      {/* Bottom Fixed Action */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
        onClick={()=>{
          navigate('/enrolled-student/?form=create-student')
          
          setIsAddStudent(true)}}
          className="
            w-full
            bg-black
            hover:bg-gray-900
            text-white
            rounded-2xl
            py-3.5
            flex
            items-center
            justify-center
            gap-2
            font-medium
            text-sm
            transition-all
            duration-200
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <FiPlus className="text-base" />
          Add Student
        </button>
      </div>
    </div>
  );
}