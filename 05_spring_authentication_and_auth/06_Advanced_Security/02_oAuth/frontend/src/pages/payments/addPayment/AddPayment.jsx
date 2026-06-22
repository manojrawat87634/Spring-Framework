import {
    MdPayments,
    MdAttachMoney,
    MdNumbers,
} from "react-icons/md";



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
import LoadingSpinner from "../../../Component/CustomLoader";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const AddPayment = ({ setIsItemOpen, getData, data }) => {
    console.log(data);
    const { id } = useParams();
    const navigate = useNavigate();
 const paymentFields = [
    // STEP 1: select enrollment
    {
        name: "enrollmentId",
        type: "select",
        label: "Select Enrollment",
        placeholder: "Select enrollment",
        required: true,
        icon: MdPayments,
        options: data?.student?.feeEnrollment?.map((e) => {
            return {
                label: `${e.course.name} (${new Date(e.enrolledAt).toLocaleDateString()})`,
                value: e.id
            }
        }),
    },

    // STEP 2: select unpaid invoices (MULTI SELECT)
    {
        name: "invoiceIds",
        type: "select",
        isMulti : true,
        label: "Select Unpaid Invoices",
        placeholder: "Select invoices to pay",
        required: true,
        icon: MdPayments,
       options: data?.student?.feeInvoices
  ?.filter(inv => inv.status !== "paid")
  ?.map((inv) => {

    const monthLabel =
      inv.month && inv.year
        ? `${months[inv.month - 1]} ${inv.year}`
        : "-";

    return {
      label: `${inv.feeType.feeName} - ₹${inv.amount} (${monthLabel})`,
      value: inv.id
    };
  }),
    },

    {
        name: "paymentType",
        type: "select",
        label: "Payment Method",
        placeholder: "Select payment method",
        required: true,
        icon: MdPayments,
        options: [
            { label: "Cash", value: "cash" },
            { label: "Online", value: "online" },
            { label: "Net Banking", value: "net_banking" },
        ],
    },

    {
        name: "transactionId",
        type: "text",
        label: "Transaction ID",
        placeholder: "Enter transaction id",
        required: true,
        icon: MdNumbers,
    },
];
    const { setToken, setUser } = useContext(DataContext);
    
    if (!data?.student){
        return <LoadingSpinner />
    }

    return <>
        <DynamicForm
            fields={paymentFields}
            heading="Make Payment"
            buttonTitle="Add Payment"
            postUrl={`/admin/create-payment`}
            getData={getData}
            theme="light"
            setIsItemOpen={setIsItemOpen}
            gradientColors={"black"}
        />
    </>
}

export default AddPayment;