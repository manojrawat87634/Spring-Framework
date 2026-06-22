import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../../context";
import { FaFileExcel } from "react-icons/fa";

export default function UploadFromExcel({setIsItemOpen}) {
    const { apiMPost, apiPost } = useContext(DataContext);

    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    //  Trigger file picker
    const handleClick = () => {
        fileInputRef.current.click();
    };

    //  Handle file selection
    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Optional validation
        if (!file.name.endsWith(".xlsx")) {
            alert("Only .xlsx files allowed");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log(formData);
            const data = await apiMPost(
                "/convert-excel/",   // 🔗 your Django endpoint
                formData,
                setLoading,
            );
            console.log(data);
            // console.log(data?.clean_data);
            await apiPost('/admin/add-students', data?.data?.clean_data, setLoading);
            setIsItemOpen(false);
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div className="border-t-2 border-gray-400 pt-2 text-center">
            <p className="text-sm text-gray-600 mb-2">
                Or add multiple students at once
            </p>

            <button
                onClick={handleClick}
                disabled={loading}
                className="
                    inline-flex items-center gap-2
                    bg-green-600 hover:bg-green-700
                    text-white text-sm font-medium
                    px-4 py-2 rounded-lg
                    shadow-md hover:shadow-lg
                    transition-all
                    disabled:opacity-50
                "
            >
                <FaFileExcel />
                {loading ? "Uploading..." : "Import from Excel"}
            </button>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx"
                className="hidden"
            />

            <p className="text-xs text-gray-400 mt-1">
                Upload .xlsx file
            </p>
        </div>
    );
}