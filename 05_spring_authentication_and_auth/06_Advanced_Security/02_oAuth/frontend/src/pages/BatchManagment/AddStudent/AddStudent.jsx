import React, { useContext } from "react";
import DynamicForm from "../../../Component/ComonForm/CommonForm";
import { MdEmail, MdLock, MdVerifiedUser } from 'react-icons/md';
import logo from "../../../assets/img/logo.png"
import { DataContext } from "../../../context";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { BiPhone, BiUser } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

const AddStudent = ({ setIsItemOpen, data, getData }) => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const userTypes = ["admin", "manager", "technician", "user"];
   const scheduleFields = [
  {
    name: "user_ids",
    type: "select",
    label: "Select Student",
    required: true,
    icon: FiUser,
    isMulti : true,
    options: data?.student?.map((e, i)=>{
        return {
            label : e.name,
        value : e.id
        };
    }),
    valueKey: "id",
    labelKey: "name",
  },
];


  const { setToken, setUser } = useContext(DataContext);

  return <>
        <DynamicForm
          fields={scheduleFields}
          heading="Add Student"
          buttonTitle="Add Student"
          postUrl={`/admin/batch/add-student/${id}/`}
          theme="light"
         getData={getData}   
          setIsItemOpen={setIsItemOpen}
          logo={logo}
          gradientColors={"black"}
        />
  </>

}

export default AddStudent;