import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const StudentAutocomplete = ({
  apiGet,
  onSelect
}) => {

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {

      apiGet(
        "/admin/autocomplete",
        { prefix: search },
        (data) => {
          setSuggestions(data || []);
        },
      );

    }, 300);

    return () => clearTimeout(timer);

  }, [search]);

  return (
    <div className="px-5 py-4 border-b border-gray-100 bg-white">
      {/* Search */}
      <div className="relative">
        <FiSearch
          className="
            absolute
            left-4
            top-4
            text-gray-400
            text-sm
          "
        />
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-gray-50
            border
            border-gray-200
            rounded-2xl
            pl-11
            pr-4
            py-3
            text-sm
            text-gray-700
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-100
            focus:border-blue-400
            transition
          "
        />
        {/* Suggestions */}
        {!suggestions ? null : suggestions.length > 0 && (
          <div
            className="
              absolute
              left-0
              right-0
              mt-2
              bg-white
              border
              border-gray-200
              rounded-2xl
              shadow-lg
              overflow-hidden
              z-50
            "
          >
            {suggestions?.map((student) => (
              <div
                key={student.id}
                onClick={() => {
                  onSelect(student);
                  setSearch(student.name);
                  setSuggestions([]);
                }}
                className="
                  px-4
                  py-3
                  hover:bg-gray-50
                  cursor-pointer
                  border-b
                  border-gray-100
                  last:border-none
                "
              >
                <div className="font-medium text-sm text-gray-800">
                  {student}
                </div>

                <div className="text-xs text-gray-500">
                  {/* {student?.courses?.length || 0} Courses */}
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAutocomplete;