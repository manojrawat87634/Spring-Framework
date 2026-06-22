import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

import genrateInitalValues from '../generateInitialValues';
import generateValidationSchema from '../generateValidationSchema';
import axios from 'axios';
import { DataContext } from '../../context';

const DynamicForm = ({
  fields,
  heading,
  buttonTitle,
  postUrl,
  setIsItemOpen,
  theme = 'light',
  logo,
  handleSubmit,
  showToast = false,
  getData = async () => { },
  errorMessages = {},
  ExtraContent,
  gradientColors = null
}) => {
  const initialValues = genrateInitalValues(fields);
  const validationSchema = generateValidationSchema(fields);
  const isDark = theme === 'dark';

  const { apiPost } = useContext(DataContext);
  console.log(initialValues)
  return (
    <div className="
      rounded-2xl w-full bg-white
      shadow-xl border border-gray-100
">
      <div className="px-4 sm:px-6 md:px-7 py-8">
        {/* Logo + Heading */}
        <div className="text-center mb-4">
          {logo && <img className="mx-auto w-40 sm:w-48 mb-4" src={logo} alt="logo" />}
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-wide">
            {heading}
          </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
            try {
              setSubmitting(true);
              console.log(values);
              if (handleSubmit) {
                await handleSubmit(values, { setSubmitting, resetForm, setFieldError });
                getData();
              } else {
                const res = await apiPost(postUrl, values, setSubmitting, () => {
                  if (showToast){
                    toast.success('Form submitted successfully!');
                  }
                  // getData();
                  resetForm();
                  setIsItemOpen(false);
                });
                if (res == null){return;}
                getData(res);
              }
            } catch (error) {
              console.log(error);
              toast.error(errorMessages.submitFailed || 'Submission failed.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {fields.map(
    ({
      isMulti,
      name,
      type,
      placeholder,
      options = [],
      icon: Icon,
      onChange,
      onFieldChange,
      required,
      label,
    }) => (
      <div
        key={name}
        className={`${type === "time" ? "sm:col-span-1" : "sm:col-span-2"}`}
      >
        {/* Label */}
        {((label) && (type == "time") || (type == 'date'))? (
          <label
            htmlFor={name}
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          {type === "select" ? (
            <Select
              name={name}
              isMulti={!!isMulti}
              options={options.map((opt) => ({
                value: opt.value || opt,
                label: opt.label || opt,
              }))}
              className="react-select-container"
              classNamePrefix="react-select"
              value={
                isMulti
                  ? options
                      .map((opt) => ({
                        value: opt.value || opt,
                        label: opt.label || opt,
                      }))
                      .filter((opt) =>
                        (values[name] || []).includes(opt.value)
                      )
                  : options
                      .map((opt) => ({
                        value: opt.value || opt,
                        label: opt.label || opt,
                      }))
                      .find((opt) => opt.value === values[name]) || null
              }
              onChange={(selected) => {
                if (onFieldChange) {
                  onFieldChange(selected);
                }

                if (isMulti) {
                  const valuesArray = selected
                    ? selected.map((opt) => opt.value)
                    : [];

                  setFieldValue(name, valuesArray);

                  if (onChange) onChange(valuesArray, setFieldValue);
                } else {
                  const value = selected ? selected.value : "";

                  setFieldValue(name, value);

                  if (onChange) onChange(value, setFieldValue);
                }
              }}
              placeholder={placeholder || `Select ${label}`}
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "44px",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  boxShadow: state.isFocused
                    ? "0 0 0 1px #3b82f6"
                    : "none",
                }),
              }}
            />
          ) : (
            <>
              <Field
                type={type || "text"}
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                className={`
                  peer w-full rounded-lg border border-gray-300
                  bg-white
                  ${Icon ? "pl-11" : "pl-3"}
                  pr-3 py-2.5
                  text-sm font-medium
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500
                  transition-all duration-200
                `}
              />

              {Icon && (
                <Icon
                  size={20}
                  className="
                    absolute left-3 top-1/2 -translate-y-1/2
                    text-gray-400
                    peer-focus:text-blue-500
                    transition-colors
                  "
                />
              )}
            </>
          )}
        </div>

        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    )
  )}
</div>
              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
    w-full rounded-lg px-6 py-2.5 
    font-semibold uppercase tracking-wide text-white hover:shadow-xl
     bg-blue-600 hover:bg-blue-700

    shadow-md transition-all duration-200
    flex items-center justify-center gap-2
    ${isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-lg active:scale-[0.98]"
                    }
  `}
                  style={{
                    background: gradientColors ? gradientColors : ""
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    buttonTitle
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {ExtraContent && (
          <div className="p-1  pt-4">
            <ExtraContent setIsItemOpen={setIsItemOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
