import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaUsers,
  FaTicketAlt,
  FaClock,
  FaCheck,
  FaBoxOpen,
  FaArchive,
  FaChartBar,
} from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { DataContext } from "../../../context";
import SummaryCard from "../../../Component/Cards/SummryCard";
import TicketCard from "../../../Component/Cards/TicketCards";
import UserInfoCard from "../../../Component/Cards/UserInfoCard";

const AdminHomePage = ({data, setData}) => {
  const [activeTab, setActiveTab] = useState("tickets");


  const { summary = {}, tickets = [], users = [] } = data;

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaChartBar className="text-blue-600 text-3xl" />
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-300 mb-8">
        {[
          { id: "tickets", label: "Recent Tickets" },
          { id: "users", label: "Top Active Users" },
          // { id: "overview", label: "Overview" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative px-4 py-2 text-sm font-medium transition-all
        ${activeTab === id
                ? "text-blue-600 after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                : "text-gray-500 hover:text-blue-600"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Tab Panels */}
      <div className="mt-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <SummaryCard icon={FaUser} label="Users" value={summary.totalUsers} bg="bg-blue-100" />
            <SummaryCard icon={FaTicketAlt} label="Tickets" value={summary.totalTickets} bg="bg-purple-100" />
            <SummaryCard icon={FaClock} label="Pending" value={summary.pending} bg="bg-yellow-100" />
            <SummaryCard icon={FaCheck} label="Solved" value={summary.solved} bg="bg-green-100" />
            <SummaryCard icon={FaBoxOpen} label="Taken Inv." value={summary.inventoryTaken} bg="bg-red-100" />
            <SummaryCard icon={FaArchive} label="Available Inv." value={summary.inventoryAvailable} bg="bg-cyan-100" />
          </div>
        )}

        {/* Recent Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4">
            {tickets.length > 0 ? (
              tickets.map((ticket) => <TicketCard key={ticket._id} item={ticket} />)
            ) : (
              <p className="text-gray-500 text-sm col-span-full">No tickets available.</p>
            )}
          </div>
        )}
        {/* Top Active Users Tab */}
        {activeTab === "users" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.length > 0 ? (
              users.map((user) => <UserInfoCard key={user._id} user={user} setData={setData} />)
            ) : (
              <p className="text-gray-500 text-sm col-span-full">No users available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
