export default function BatchTimelineCard() {
  const moduleData = {
    batch_module_id: 1,
    module_name: 'Core Java',
    status: 'ACTIVE',
    started_at: '2026-05-20',
    schedule_count: 3,
    schedules: [
      {
        id: 1,
        day_of_week: 'MONDAY',
        start_time: '19:00',
        end_time: '20:00',
        faculty: {
          id: 1,
          name: 'Rahul Sharma',
        },
      },
      {
        id: 2,
        day_of_week: 'WEDNESDAY',
        start_time: '19:00',
        end_time: '20:00',
        faculty: {
          id: 1,
          name: 'Rahul Sharma',
        },
      },
      {
        id: 3,
        day_of_week: 'FRIDAY',
        start_time: '19:00',
        end_time: '20:00',
        faculty: {
          id: 1,
          name: 'Rahul Sharma',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div>
            <p className="text-sm text-gray-500 font-medium">
              Batch Module ID • {moduleData.batch_module_id}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {moduleData.module_name}
            </h1>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                {moduleData.status}
              </span>

              <span className="text-gray-600 text-sm">
                Started At:
                <strong className="ml-1">
                  {moduleData.started_at}
                </strong>
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 min-w-[240px] border border-gray-200">
            <p className="text-sm text-gray-500">Total Schedules</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1">
              {moduleData.schedule_count}
            </h2>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Schedule Timeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleData.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {schedule.day_of_week}
                  </h3>

                  <span className="text-sm px-3 py-1 rounded-full bg-black text-white">
                    #{schedule.id}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      Time:
                    </span>{' '}
                    {schedule.start_time} - {schedule.end_time}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      Faculty:
                    </span>{' '}
                    {schedule.faculty.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Module Progress
            </h2>

            <span className="text-sm font-semibold text-gray-700">
              {moduleData.progress}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-black h-4 rounded-full transition-all duration-500"
              style={{ width: `${moduleData.progress}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Weekly Schedule
            </h2>

            <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition">
              Edit Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moduleData.schedule.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-4 bg-gray-50"
              >
                <p className="text-base font-semibold text-gray-900">
                  {item.split('•')[0]}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {item.split('•')[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
