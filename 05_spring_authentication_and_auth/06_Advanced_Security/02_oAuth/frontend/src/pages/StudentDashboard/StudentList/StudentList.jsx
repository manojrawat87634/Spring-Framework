import React from "react";
import {
  Mail,
  Phone,
  BookOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import { BsViewList } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const StudentList = ({ students,setShowStudentDetails }) => {

    const navigate = useNavigate();

  return (
    <div
      className="
        w-full
        overflow-x-auto
        bg-white
        border border-gray-200
        rounded-2xl
      "
    >

      
  <div className="rounded-xl border border-gray-200 overflow-hidden">
  
  <div className="max-h-[504px] overflow-y-auto">

    <table className="min-w-full">

      <thead className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left">Student</th>
          <th className="px-6 py-3 text-left">Contact</th>
          <th className="px-6 py-3 text-left">Phone</th>
          <th className="px-6 py-3 text-left">Courses</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-right">Actions</th>
        </tr>
      </thead>
        {/* Body */}
    
        <tbody>
          {students?.map((student) => (
            <tr
              key={student.id}
              className="
                border-b border-gray-100
                hover:bg-gray-50/80
                transition-all duration-150
              "
            >
              {/* Student */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  
                  {/* Info */}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {student.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      Student ID #{student.id}
                    </p>
                  </div>
                </div>
              </td>

              {/* Contact */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    {student.email}
                  </div>

                  
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    {student.phone}
                  </div>
              </td>

              {/* Courses */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3 py-1.5
                    rounded-full
                    bg-gray-100
                    text-gray-700
                    text-xs
                    font-medium
                  "
                >
                  <BookOpen size={14} />
                  {student.totalCourses} Courses
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="
                    inline-flex
                    items-center
                    px-3 py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-xs
                    font-medium
                  "
                >
                  Active
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                  {/* Edit */}
                  <button
                    onClick={()=>{
                        navigate(`/enrolled-student/${student.id}`);
                        setShowStudentDetails(true);
                    }}
                    className="
                      h-9 w-9
                      rounded-lg
                      border border-gray-200
                      flex items-center justify-center
                      text-gray-500
                      hover:bg-gray-100
                      hover:text-black
                      transition-all duration-150
                    "
                  >
                    <BiShow size={16} />
                  </button>

                  <button
                    className="
                      h-9 w-9
                      rounded-lg
                      border border-gray-200
                      flex items-center justify-center
                      text-gray-500
                      hover:bg-gray-100
                      hover:text-black
                      transition-all duration-150
                    "
                  >
                    <Pencil size={16} />
                  </button>
                  

                  {/* Delete */}
                  <button
                    className="
                      h-9 w-9
                      rounded-lg
                      border border-gray-200
                      flex items-center justify-center
                      text-gray-500
                      hover:bg-red-50
                      hover:text-red-600
                      hover:border-red-200
                      transition-all duration-150
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default StudentList;