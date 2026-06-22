import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../Component/CustomLoader";

const BatchScheduleDetail = ({ setIsItemOpen }) => {
  const { apiGet } = useContext(DataContext);

  const [batchData, setData] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (id == undefined) return;

    apiGet(`/admin/batches-schedules/${id}`, {}, setData);
  }, [id]);

  if (!batchData) {
    return <LoadingSpinner />;
  }

  return (
    <div className=" bg-[#f7f7f7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="flex items-center justify-between mb-4">
          <div>
           <h1 className="text-[32px] tracking-tight font-[350] text-[#404145]">
              Batch Schedules
            </h1>
          </div>

          <button
           className="bg-[#1dbf73] hover:bg-[#19a463] text-white text-[13px] font-semibold px-4 py-2 rounded"
           >
            CREATE SCHEDULE
          </button>
        </div>

   

        {/* Table */}
<div className="bg-white border border-[#e4e5e7] rounded-sm">
          {/* Header */}
         
          <div
          className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#e4e5e7] text-[11px] uppercase text-[#95979d] font-semibold tracking-wide">
            <div className="col-span-2">Module</div>

            <div className="col-span-2">Faculty</div>

            <div className="col-span-4">Schedules</div>

            <div className="col-span-2">Started</div>

            <div className="col-span-1">Status</div>

            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          <div className="max-h-[55vh] overflow-y-auto">
            {batchData.modules.map((module) => (
            <div
              key={module.batch_module_id}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#f1f1f2] items-center hover:bg-[#fafafa] transition-colors duration-150"
            >
              {/* Module */}
              <div className="col-span-2">
                <h2 className="text-sm font-medium text-gray-900">
                  {module.module_name}
                </h2>
              </div>

              {/* Faculty */}
              <div className="col-span-2">
                <p className="text-sm text-gray-700">
                  {module.faculty || "Not Assigned"}
                </p>
              </div>

              {/* Days */}
              <div className="col-span-4">
                <div className="flex flex-wrap gap-1">
                  {module.days?.length > 0 ? (
                    module.days.map((day) => (
                      <span
                        key={day}
                        className="px-2 py-1  text-gray-700 text-xs rounded"
                      >
                        {day}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      No Schedule
                    </span>
                  )}
                </div>
              </div>

              {/* Started */}
              <div className="col-span-2">
                <p className="text-sm text-gray-500">
                  {module.started_at || "Not Started"}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    module.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : module.status === "UPCOMING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {module.status}
                </span>
              </div>

              {/* Action */}
              <div className="col-span-1 flex justify-end">
                <button className="text-sm text-gray-500 hover:text-black">
                  View
                </button>
              </div>
            </div>
          ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchScheduleDetail;