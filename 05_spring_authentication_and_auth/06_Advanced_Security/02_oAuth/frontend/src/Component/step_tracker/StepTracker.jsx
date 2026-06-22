import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function StepTracker({ steps }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { id } = useParams("id");

  

  const currentStep =
    searchParams.get("form") || "create-student";

  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep
  );

  return (
    <div className="w-full h-[70px] bg-white border-b border-gray-200 px-5 sm:px-8 flex items-center sticky top-0 z-20">
      <div className="flex items-center w-full max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const active = currentStep === step.id;
          const completed = currentIndex > index;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1"
            >
              <div className="flex items-center w-full">
                <button
                  onClick={() => {
                    if (completed || active) {
                      navigate(step.path);
                    }
                  }}
                  className="
                    flex items-center gap-3 min-w-fit
                    transition-all duration-200
                  "
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full
                      flex items-center justify-center
                      text-[13px] font-semibold
                      transition-all duration-200

                      ${
                        active
                          ? "bg-black text-white scale-105"
                          : completed
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {index + 1}
                  </div>

                  <div className="flex flex-col items-start">
                    <span
                      className={`
                        text-sm font-medium tracking-tight transition-colors
                        ${
                          active
                            ? "text-black"
                            : completed
                            ? "text-gray-700"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>

                {index !== steps.length - 1 && (
                  <div className="flex-1 mx-4 h-[1.5px] bg-gray-200 relative overflow-hidden rounded-full">
                    <div
                      className={`
                        absolute left-0 top-0 h-full rounded-full
                        transition-all duration-500
                        ${
                          completed
                            ? "w-full bg-black"
                            : "w-0 bg-black"
                        }
                      `}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}