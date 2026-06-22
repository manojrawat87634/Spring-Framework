import React from "react";

import BatchCard from "../../../Component/Cards/BatchCard";
import { useNavigate } from "react-router-dom";

const BatchList = ({ 
  batches, 
  setShowBatch,
  setscheduleModuleDetail,
  setShowBatchDetails,
  setScheduleBatch, 
  setAddStudentForm, 
  setConfirmGenerateClass 
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Batch Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all training batches
          </p>
        </div>
        <button
          onClick={() => {
            setShowBatch(true);
            navigate('/batch-management/?form=create-batch');
          }}

          className="bg-green-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-green-700 transition font-medium"
        >
          + Create Batch
        </button>
      </div>
      {/* Container */}
      <div className="bg-white rounded-2xl shadow-sm p-3">
        {/* Header Row */}
        <div className="grid grid-cols-12 px-5 py-4 border-b border-gray-100 text-md font-bold text-gray-700  tracking-[0.09em]">
          <div className="col-span-2">Batch</div>

          <div className="col-span-2">
            Students
          </div>

          <div className="col-span-3">
            Schedule
          </div>

          <div className="col-span-1">
            Status
          </div>

          <div className="col-span-2">
            Actions
          </div>

          <div className="col-span-2">
            Workflow
          </div>
        </div>
        {/* Rows */}
        <div className="flex flex-col gap-3">
          {batches?.map((batch) => {
            return <BatchCard
            setscheduleModuleDetail={setscheduleModuleDetail}
              setShowBatchDetails={setShowBatchDetails}
              batch={batch} setScheduleBatch={setScheduleBatch}
              setConfirmGenerateClass={setConfirmGenerateClass}
              setAddStudentForm={setAddStudentForm} />
          })}
        </div>
      </div>
    </div>
  );
};

export default BatchList;