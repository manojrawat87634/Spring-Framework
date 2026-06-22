import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../pages/auth/LoginPage/logo.png";
import SelfModal from "../SelfModal/SelfModal";
import RegisterPage from "../../pages/auth/RegisterPage/RegisterUser";

const LaptopNavbar = ({ navItems }) => {
    const [showCreateUser, setShowCreateUser] = useState(false);

    const commonBtnClass =
        "px-4 py-2 text-sm font-semibold rounded border border-gray-300 hover:bg-gray-100 transition";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-50">
                <nav className="flex items-center h-full px-6 md:px-12 gap-4">
                    {/* Logo */}
                    <div className="mr-auto">
                        <img src={logo} alt="App Logo" className="h-10" />
                    </div>

                    {/* Navigation Items */}
                    {navItems.map((item, index) =>
                        item.type === "button" ? (
                            <button
                                key={index}
                                onClick={item.handleClick}
                                className={item.className}
                                aria-label={item.label}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <NavLink
                                key={index}
                                to={item.route}
                                className={({ isActive }) =>
                                    `text-[16px] font-medium px-3 py-2 rounded transition ${isActive
                                        ? "text-blue-600 bg-blue-100"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    )}
                </nav>
            </header>

            {/* SelfModal for Add User */}
            <SelfModal
                ModuleCompItem={RegisterPage}
                isItemOpen={showCreateUser}
                setIsItemOpen={setShowCreateUser}
                position=""
                setData=""
            />
        </>
    );
};

export default LaptopNavbar;