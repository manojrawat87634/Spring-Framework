import React from "react";

const AttendanceRowCard = ({ item }) => {

  const {
    user,
    remarks,
    currentStatus,
    updateAttendance,
    updateRemark,
  } = item;

  return (

    <div className="grid grid-cols-12 items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">

      {/* STUDENT */}
      <div className="col-span-4 min-w-0">

        <h3 className="text-sm font-medium text-gray-800 truncate">
          {user?.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Student ID #{user?.id}
        </p>

      </div>

      {/* REMARKS */}
      <div className="col-span-5">

        <input
          type="text"
          placeholder="Add remarks..."
          value={remarks || ""}
          onChange={(e) =>
            updateRemark(
              user.id,
              e.target.value
            )
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />

      </div>

      {/* ATTENDANCE */}
      <div className="col-span-3">

        <label className="inline-flex items-center gap-3 cursor-pointer select-none">

          <input
            type="checkbox"
            checked={currentStatus === true}
            onChange={(e) =>
              updateAttendance(
                user.id,
                e.target.checked
              )
            }
            className="h-4 w-4 accent-green-600 cursor-pointer"
          />

          <span
            className={`text-sm font-medium ${
              currentStatus
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {
              currentStatus
                ? "Present"
                : "Absent"
            }
          </span>

        </label>

      </div>

    </div>

  );

};

export default AttendanceRowCard;