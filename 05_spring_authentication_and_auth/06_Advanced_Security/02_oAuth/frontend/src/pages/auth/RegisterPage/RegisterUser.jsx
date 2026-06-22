import React, { useContext } from "react";
import DynamicForm from "../../../Component/ComonForm/CommonForm";
import { MdEmail, MdLock, MdVerifiedUser } from 'react-icons/md';
import logo from "../../../assets/img/logo.png"
import { DataContext } from "../../../context";
import { useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { BiPhone, BiUser } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa";
import UploadFromExcel from "./UploadFromExcel/UploadFromExcel";

const RegisterPage = ({ setIsItemOpen, getData }) => {
  const navigate = useNavigate();

  const userTypes = ["admin", "manager", "technician", "user"];
  const registerFields = [
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Enter Student Name', required: true, icon: MdVerifiedUser },
    { name: 'email', type: 'email', label: 'Email Address', placeholder: 'Enter your Email', required: true, icon: MdEmail },
    { name: 'phone', type: 'text', label: 'Phone Number', placeholder: 'Enter your Phone', required: true, icon: BiPhone },
  ];

  const { setToken, setUser } = useContext(DataContext);

  return <>
    <DynamicForm
      fields={registerFields}
      heading="Create New User"
      buttonTitle="Add new Student"
      postUrl="/api/register"
      getData={getData}
      theme="light"
      setIsItemOpen={setIsItemOpen}
      // logo={logo}
      ExtraContent={UploadFromExcel}
    />
  </>
}

export default RegisterPage;