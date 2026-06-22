import React from "react";
import { FiMail, FiPhone, FiCalendar } from "react-icons/fi";

const StudentHeader = ({ student }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
      {/* TOP */}
      <div className="flex items-start justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-lg font-medium text-gray-700">
            {student.name?.charAt(0) || "S"}
          </div>

          {/* Info */}
          <div className="space-y-1">

            {/* Name */}
            <h2 className="text-base font-semibold text-gray-800">
              {student.name}
            </h2>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                <span className="font-medium text-gray-700">
                  {student.courses.length}
                </span>{" "}
                Courses
              </span>

              <span>
                ₹
                <span className="font-medium text-gray-700">
                  {student.payment || 0}
                </span>{" "}
                Paid
              </span>
            </div>

            {/* Joined */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <FiCalendar />
              Joined {student.date}
            </div>

          </div>
        </div>

        {/* BUTTON (match your blue theme) */}
        <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          + Enroll
        </button>
      </div>

      {/* DIVIDER */}
      <div className="my-4 border-t border-gray-200" />

      {/* CONTACT */}
      <div className="flex items-center gap-10 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <FiMail className="text-gray-400" />
          <span>{student.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiPhone className="text-gray-400" />
          <span>{student.phone}</span>
        </div>

      </div>
    </div>
  );
};

export default StudentHeader;