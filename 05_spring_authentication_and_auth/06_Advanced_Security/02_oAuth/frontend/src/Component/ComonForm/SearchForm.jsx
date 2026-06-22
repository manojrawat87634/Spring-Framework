import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import genrateInitalValues from "../generateInitialValues";
import generateValidationSchema from "../generateValidationSchema";
import { FaSpinner } from "react-icons/fa";
import { DataContext } from "../../context";

const SearchForm = ({
    fields = [],
    heading = "Search Filters",
    onSearch,
    submitButtonText = "Apply Filters",
    route,
    setData,
    setShowModal,
    gradientColors = "linear-gradient(to right, #2563EB, #1D4ED8)"
}) => {

    const initialValues = genrateInitalValues(fields);
    const validationSchema = generateValidationSchema(fields);

    const { apiGet } = useContext(DataContext);

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "42px",
            borderRadius: "10px",
            borderColor: state.isFocused ? "#2563EB" : "#E5E7EB",
            boxShadow: state.isFocused
                ? "0 0 0 3px rgba(37,99,235,0.10)"
                : "none",
            "&:hover": {
                borderColor: "#2563EB",
            },
            paddingLeft: "2rem",
            fontSize: "14px",
            backgroundColor: "#fff",
            transition: "all 0.2s ease",
        }),

        valueContainer: (base) => ({
            ...base,
            paddingLeft: 0,
        }),

        placeholder: (base) => ({
            ...base,
            color: "#9CA3AF",
            fontWeight: 400,
        }),

        singleValue: (base) => ({
            ...base,
            color: "#111827",
            fontWeight: 500,
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: "#9CA3AF",
        }),

        menu: (base) => ({
            ...base,
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 20,
        }),
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="text-[15px] font-semibold text-gray-800">
                        {heading}
                    </h2>

                    <p className="text-xs text-gray-500 mt-0.5">
                        Refine your student results
                    </p>
                </div>

                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-7 7v5l-4 2v-7L3 6V4z"
                        />
                    </svg>
                </div>
            </div>

            <div className="p-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                        if (onSearch) {
                            onSearch(values, {
                                setSubmitting,
                                resetForm
                            });
                        } else {

                            Object.keys(values).forEach((key) => {
                                if (
                                    values[key] === null ||
                                    values[key] === undefined ||
                                    values[key] === ""
                                ) {
                                    delete values[key];
                                }
                            });
                            apiGet(route, values, setData, () => {
                                if (setShowModal) {
                                    setShowModal(false);
                                }
                            });
                        }
                    }}
                >
                    {({
                        isSubmitting,
                        setFieldValue,
                        values,
                        resetForm,
                    }) => (

                        <Form>

                            {/* Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {fields.map(({
                                    name,
                                    type = "text",
                                    placeholder,
                                    options = [],
                                    icon: Icon,
                                    component,
                                    onChange,
                                }) => (

                                    <div key={name} className="relative">

                                        {/* Select */}
                                        {type === "select" ? (
                                            <>
                                                <Select
                                                    name={name}
                                                    options={options}
                                                    placeholder={
                                                        placeholder ||
                                                        `Select ${name}`
                                                    }
                                                    styles={selectStyles}
                                                    value={
                                                        options.find(
                                                            (opt) =>
                                                                opt.value === values[name]
                                                        ) || null
                                                    }
                                                    onChange={(selected) => {

                                                        const value =
                                                            selected?.value || "";

                                                        setFieldValue(name, value);

                                                        if (onChange) {
                                                            onChange(
                                                                value,
                                                                setFieldValue,
                                                                values
                                                            );
                                                        }
                                                    }}
                                                    isClearable
                                                />

                                                {Icon && (
                                                    <Icon
                                                        size={15}
                                                        className="absolute top-[14px] left-3 text-gray-400 z-10"
                                                    />
                                                )}
                                            </>
                                        ) : component ? (
                                            component
                                        ) : (

                                            <>
                                                <Field
                                                    type={type}
                                                    name={name}
                                                    placeholder={placeholder}
                                                    onChange={(e) => {

                                                        const value =
                                                            e.target.value;

                                                        setFieldValue(name, value);

                                                        if (onChange) {
                                                            onChange(
                                                                value,
                                                                setFieldValue,
                                                                values
                                                            );
                                                        }
                                                    }}
                                                    className="
                                                        w-full
                                                        text-sm
                                                        pl-10
                                                        pr-3
                                                        py-2.5
                                                        rounded-xl
                                                        border
                                                        border-gray-200
                                                        bg-white
                                                        focus:ring-4
                                                        focus:ring-blue-100
                                                        focus:border-blue-500
                                                        outline-none
                                                        transition-all
                                                        duration-200
                                                    "
                                                />

                                                {Icon && (
                                                    <Icon
                                                        size={15}
                                                        className="
                                                            absolute
                                                            top-[13px]
                                                            left-3
                                                            text-gray-400
                                                        "
                                                    />
                                                )}
                                            </>
                                        )}

                                        <ErrorMessage
                                            name={name}
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">

                                <button
                                    type="button"
                                    onClick={() => resetForm()}
                                    className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        text-gray-700
                                        text-sm
                                        font-medium
                                        hover:bg-gray-50
                                        transition
                                    "
                                >
                                    Clear
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        background: gradientColors
                                    }}
                                    className="
                                        min-w-[140px]
                                        px-5
                                        py-2
                                        rounded-xl
                                        text-white
                                        text-sm
                                        font-semibold
                                        shadow-sm
                                        hover:shadow-md
                                        transition-all
                                        duration-200
                                        disabled:opacity-70
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    {isSubmitting ? (
                                        <FaSpinner
                                            className="animate-spin"
                                            size={18}
                                        />
                                    ) : (
                                        submitButtonText
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SearchForm;