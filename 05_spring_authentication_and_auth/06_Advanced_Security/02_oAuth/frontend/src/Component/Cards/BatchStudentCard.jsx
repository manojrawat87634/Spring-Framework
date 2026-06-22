import React, { useContext, useState } from "react";
import { CgRemove } from "react-icons/cg";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiTrash2,
} from "react-icons/fi";
import { VscLoading } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import ButtonLoader from "../Buttons/ButtonLoader";
import { DataContext } from "../../context";

const BatchStudentCard = ({
  student,
  getData
}) => {
    const [button, setButton] = useState(false);
    const { id } = useParams();
    const { apiDelete } = useContext(DataContext);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:shadow-md transition-all duration-200">
      
      <div className="grid grid-cols-12 items-center gap-4">

        {/* Student */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-3">
          
          <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <FiUser className="text-xl text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              {student?.name}
            </h2>

            <p className="text-xs text-gray-400">
              ID: #{student?.id}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiMail className="text-gray-400" />
            <span className="truncate">
              {student?.email}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiPhone className="text-gray-400" />
            {student?.phone}
          </div>
        </div>

        {/* Action */}
        <div className="col-span-12 md:col-span-2 flex md:justify-end">
          <button
          onClick={()=>{
            apiDelete(`/admin/batch-remove-student/${student.id}/${id}`, {}, setButton, getData);
          }}         className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            {
                button ? <ButtonLoader />: <CgRemove />
            }
            
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchStudentCard;