import React from "react";
import {
  FiClock,
  FiCalendar,
  FiUser,
  FiLayers,
  FiEye,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const statusColor = {
  scheduled:
    "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200",
  ongoing:
    "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200",
  completed:
    "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200",
  cancelled:
    "bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200",
};

const ClassCard = ({ classes = [], setAttendance }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Class Management
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage all scheduled and ongoing classes
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
          <p className="text-xs uppercase tracking-wide opacity-80">
            Total Classes
          </p>
          <h3 className="text-xl font-bold">{classes.length}</h3>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100">

        {/* HEADER */}
        <div className="grid grid-cols-12 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
          <div className="col-span-3">Class Details</div>
          <div className="col-span-2">Faculty</div>
          <div className="col-span-3">Module</div>
          <div className="col-span-2">Time Slot</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* ROWS */}
        {classes.map((cls, index) => (
          <div
            key={cls.id}
            onClick={() => {
              navigate(`/class-management/${cls.id}`);

              setTimeout(() => {
                setAttendance(true);
              }, 100);
            }}
            className={`grid grid-cols-12 items-center px-6 py-5 cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:scale-[1.01] hover:shadow-lg border-t border-gray-100 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
            }`}
          >

            {/* CLASS INFO */}
            <div className="col-span-3">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <FiCalendar size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {cls.classDate}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Class ID #{cls.id}
                  </p>
                </div>

              </div>
            </div>

            {/* FACULTY */}
            <div className="col-span-2">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <FiUser />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {cls.faculty?.name || "N/A"}
                  </p>

                  <p className="text-xs text-gray-500">
                    Faculty
                  </p>
                </div>

              </div>
            </div>

            {/* MODULE */}
            <div className="col-span-3">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <FiLayers />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {cls.module?.moduleName}
                  </p>

                </div>

              </div>
            </div>

            {/* TIME */}
            <div className="col-span-2">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <FiClock />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {cls.startTime}
                  </p>

                  <p className="text-xs text-gray-500">
                    Ends {cls.endTime}
                  </p>
                </div>

              </div>
            </div>

            {/* STATUS */}
            <div className="col-span-2">

              <span
                className={`inline-flex items-center px-4 py-2 rounded-2xl text-xs font-bold capitalize shadow-sm ${
                  statusColor[cls.status] ||
                  "bg-gray-100 text-gray-700 border"
                }`}
              >
                {cls.status}
              </span>

            </div>

            {/* ACTION */}

          </div>
        ))}

        {/* EMPTY STATE */}
        {classes.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center">

            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <FiEye size={28} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-700">
              No Classes Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Generated classes will appear here
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default ClassCard;