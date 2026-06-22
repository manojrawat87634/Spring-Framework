const CourseCard = ({ course }) => {
  const progress = course.progress ?? 65; // replace later with backend value

  const radius = 28;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
      
      {/* 🔵 Circular Progress */}
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#3b82f6"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-500"
          />
        </svg>

        {/* % Text */}
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
          {progress}%
        </span>
      </div>

      {/* 📚 Course Info */}
      <div className="flex-1">
        <h3 className="text-md font-semibold text-gray-900">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {course.enrolledAt
            ? new Date(course.enrolledAt).toLocaleDateString()
            : "N/A"}
        </p>

        {/* Status */}
        <div className="mt-2 text-xs">
          {progress === 100 ? (
            <span className="text-green-600 font-medium">Completed</span>
          ) : (
            <span className="text-blue-600 font-medium">In Progress</span>
          )}
        </div>
      </div>

      {/* Action */}
      <button className="text-sm px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
        View
      </button>
    </div>
  );
};

export default CourseCard;