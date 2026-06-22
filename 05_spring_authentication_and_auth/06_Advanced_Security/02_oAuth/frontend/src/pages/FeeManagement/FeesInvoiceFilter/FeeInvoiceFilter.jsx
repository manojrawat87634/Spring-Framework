import React from "react";
import {
    FaBook,
    FaLayerGroup,
    FaUserCheck
} from "react-icons/fa";
import SearchForm from "../../../Component/ComonForm/SearchForm";

const InvoiceFilter = ({
    data, 
    setData,
    setIsItemOpen
}) => {
console.log(data);
    const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // 1-12
const currentYear = currentDate.getFullYear();

const fields = [
    {
        name: "year",
        type: "select",
        placeholder: "Select Year",
        options: Array.from({ length: 10 }, (_, index) => ({
            label: String(currentYear - 5 + index),
            value: currentYear - 5 + index,
        })),
        value: currentYear,
    },
    {
        name: "month",
        type: "select",
        placeholder: "Select Month",
        options: [
            { label: "January", value: 1 },
            { label: "February", value: 2 },
            { label: "March", value: 3 },
            { label: "April", value: 4 },
            { label: "May", value: 5 },
            { label: "June", value: 6 },
            { label: "July", value: 7 },
            { label: "August", value: 8 },
            { label: "September", value: 9 },
            { label: "October", value: 10 },
            { label: "November", value: 11 },
            { label: "December", value: 12 },
        ],
        value : currentMonth,
    }
];

    return (
        <SearchForm
            heading="Filter invoices"
            fields={fields}
            route="/admin/unpaid-fees"
            setShowModal={setIsItemOpen}
            setData={setData}
            submitButtonText="Apply Filters"
            gradientColors="linear-gradient(to right, #2563EB, #1D4ED8)"
        />
    );
};

export default InvoiceFilter;