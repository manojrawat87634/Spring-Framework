import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../context";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../../../Component/CustomLoader";
import { EmptyState } from "./StudentTab";

const AttendanceAnalysis = () => {
    
    const { apiGet } = useContext(DataContext);

    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {

        apiGet(
            `/admin/student-attendance-analysis/${id}`,
            {},
            setData
        );

    }, [id]);

    /*
    -----------------------------------
    LOADING
    -----------------------------------
    */
    if (!data) {
        return <LoadingSpinner />;
    }

    /*
    -----------------------------------
    EXTRACT ANALYSIS
    -----------------------------------
    */
    const analysis = data?.data;

    /*
    -----------------------------------
    NO ATTENDANCE DATA
    -----------------------------------
    */
    if (
        !analysis ||
        analysis.totalClasses === 0
    ) {

        return (
            <div className=" flex items-center justify-center">
                <EmptyState
                    title="No Attendance Found"
                    buttonText="Attendance Not Marked Yet"
                    onCl={() => {}}
                />

            </div>
        );
    }

    /*
    -----------------------------------
    ATTENDANCE COLOR
    -----------------------------------
    */
    const getAttendanceColor = (percentage) => {

        if (percentage >= 85) {
            return "text-green-600";
        }

        if (percentage >= 75) {
            return "text-yellow-500";
        }

        return "text-red-500";
    };

    /*
    -----------------------------------
    PROGRESS COLOR
    -----------------------------------
    */
    const getProgressColor = (percentage) => {

        if (percentage >= 85) {
            return "bg-green-500";
        }

        if (percentage >= 75) {
            return "bg-yellow-500";
        }

        return "bg-red-500";
    };

    return (

        <div className="bg-gray-100 p-4 ">

            <div className="max-w-5xl mx-auto space-y-4">

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-white rounded-2xl p-4 shadow-sm">

                        <p className="text-xs text-gray-500">
                            Total
                        </p>

                        <h2 className="text-2xl font-semibold mt-2 text-gray-800">
                            {analysis.totalClasses}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm">

                        <p className="text-xs text-gray-500">
                            Present
                        </p>

                        <h2 className="text-2xl font-semibold mt-2 text-green-600">
                            {analysis.presentCount}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm">

                        <p className="text-xs text-gray-500">
                            Absent
                        </p>

                        <h2 className="text-2xl font-semibold mt-2 text-red-500">
                            {analysis.absentCount}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm">

                        <p className="text-xs text-gray-500">
                            Attendance
                        </p>

                        <h2
                            className={`text-2xl font-semibold mt-2 ${getAttendanceColor(
                                analysis.attendancePercentage
                            )}`}
                        >
                            {analysis.attendancePercentage?.toFixed(1)}%
                        </h2>

                    </div>

                </div>

                {/* PROGRESS */}
                <div className="bg-white rounded-2xl shadow-sm p-5">

                    <div className="flex justify-between items-center mb-3">

                        <h2 className="text-sm font-medium text-gray-700">
                            Attendance Performance
                        </h2>

                        <span
                            className={`text-sm font-semibold ${getAttendanceColor(
                                analysis.attendancePercentage
                            )}`}
                        >
                            {analysis.attendancePercentage?.toFixed(1)}%
                        </span>

                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                        <div
                            className={`h-full rounded-full ${getProgressColor(
                                analysis.attendancePercentage
                            )}`}
                            style={{
                                width: `${analysis.attendancePercentage}%`,
                            }}
                        />

                    </div>

                </div>

                {/* INSIGHT */}
                <div className="bg-white rounded-2xl shadow-sm p-4">

                    <h2 className="text-sm font-medium text-gray-700 mb-3">
                        Insight
                    </h2>

                    {
                        analysis.attendancePercentage >= 85 &&
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm">
                            Excellent attendance consistency.
                        </div>
                    }

                    {
                        analysis.attendancePercentage >= 75 &&
                        analysis.attendancePercentage < 85 &&
                        <div className="bg-yellow-100 text-yellow-700 px-4 py-3 rounded-xl text-sm">
                            Attendance needs improvement.
                        </div>
                    }

                    {
                        analysis.attendancePercentage < 75 &&
                        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                            Critical attendance shortage.
                        </div>
                    }

                </div>

            </div>

        </div>
    );
};

export default AttendanceAnalysis;