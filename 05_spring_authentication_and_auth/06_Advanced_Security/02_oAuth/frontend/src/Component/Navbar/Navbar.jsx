import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../pages/auth/LoginPage/logo.png";
import SelfModal from "../SelfModal/SelfModal";
import RegisterPage from "../../pages/auth/RegisterPage/RegisterUser";
import ChangePasswordForm from "../../pages/auth/ChangePasswordForm/ChangePasswordForm";
import { CiPower } from "react-icons/ci";
import { RiShutDownFill } from "react-icons/ri";
import { BsPower } from "react-icons/bs";
import LoadingSpinner from "../CustomLoader";
import { FaSpinner } from "react-icons/fa";
import { DataContext } from "../../context";

const Navbar = ({ user }) => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [logoutBtn, setLogoutBtn] = useState(false);
  const dropdownRef = useRef(null);

  const commonBtnClass =
    "px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 transition w-full text-left";

  const { logoutFunc } = useContext(DataContext);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const navItems = [
    { name: "Student's", label: "Student's Console", route: "/enrolled-student", user: ["admin"] },
    { name: "BatchManagement", label: "Batch Management", route: "/batch-management", user: ["admin"] },
    { name: "Class Management", label: "Classes Management", user: ["admin"], route: '/class-management' },
    { name: "Fee Management", label: "Fee Management", user: ["admin"], route: '/fee-management' },

    {
      label: (
        <div
          className="w-9   h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-md font-semibold cursor-pointer"
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
      ),
      user: ["user", 'admin', 'technician'],
      type: "button",
      options: [
        {
          name: "RegisterUser",
          label: "Add Student",
          user: "admin",
          className: `${commonBtnClass} hover:text-blue-600`,
          handleClick: () => {
            setShowCreateUser(true);
            setIsDropdownOpen(false);
          },
        },
        {
          name: "ChangePassword",
          label: "Change Password",
          user: "all",
          className: `${commonBtnClass} hover:text-blue-600`,
          handleClick: () => {
            // setChangePasswordForm(true);
            setIsDropdownOpen(false);
          },
        },
        {
          name: "Logout",
          label: logoutBtn ? <FaSpinner className="animate-spin text-blue-600" /> : <div className="flex">{<BsPower size={19} />} Logout </div>,
          user: "all",
          className: `${commonBtnClass} bg-red-500 text-white hover:bg-red-600`,
          handleClick: () => {
            setLogoutBtn(true);
            logoutFunc(() => {
              setIsDropdownOpen(false);
              setLogoutBtn(false);
            })
          },
        },
      ],
    },
  ];

  if (!user) {
    return null;
  }
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20  bg-white shadow-md z-50">
        <nav className="flex items-center justify-between h-full px-6 md:px-12">

          {/* Logo */}
          <img src={logo} alt="App Logo" className="h-10" />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 items-center">
            {navItems
              .filter(item => item.user.includes(user?.role)).map((item, index) =>
                item.options ? (
                  <div key={index} className="relative" ref={dropdownRef}>
                    <div onClick={() => setIsDropdownOpen(prev => !prev)}>
                      {item.label}
                    </div>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-12 w-60 p-4 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2 flex flex-col items-center text-center gap-2">
                        {item.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={opt.handleClick}
                            className={`${opt.className} text-center w-full`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                ) : (
                  <NavLink
                    key={index}
                    to={item.route}
                    className={({ isActive }) =>
                      `text-[15px] font-medium px-3 py-2 rounded transition ${isActive ? "text-blue-600 bg-blue-100" : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </nav>
      </header>

      {/* Add User Modal */}
       <SelfModal
        ModuleCompItem={RegisterPage}
        isItemOpen={showCreateUser}
        getData={()=>{
          navigate('/enrolled-student/')
        }}
        setIsItemOpen={setShowCreateUser}
      />
      {/*
      <SelfModal
        ModuleCompItem={ChangePasswordForm}
        isItemOpen={changePasswordForm}
        setIsItemOpen={setChangePasswordForm}
      /> */}
    </>
  );
};

export default Navbar;
