import React from "react";
import Overlay from "../Overlay/Overlay";

const SelfModal = ({
  isItemOpen,
  setIsItemOpen2,
  UpperComp = null,
  setIsItemOpen,
  ModuleCompItem,
  setData = null,
  position = "center",
  width = "full",
  getData,
  stepArr = null,
  
  data = null
}) => {
  return (
    <>
      <div
        style={{
          zIndex: 70,
        }}
        className="fixed top-0 "
      >
        {isItemOpen ? (
          <Overlay
            setIsItemOpen={setIsItemOpen}
            isItemOpen={isItemOpen}
          />
        ) : null}
      </div>
      <div
        className={`flex ${position == "end" ? "justify-end" : "justify-center items-center"}`}
      >
        <div className={`fixed top-20 ${width} z-[100]`}>
          {isItemOpen ? (
            <>
              <div className={`flex items-center justify-${position} `}>
                <div
                  className={`w-full mx-4 sm:mx-12 z-30 bg-white rounded-xl 
overflow-hidden flex flex-col 
${position === "end" ? "h-full" : "h-auto"}`}
                >
                  {UpperComp ? <UpperComp steps={stepArr ? stepArr : []} /> : null}
                  {setData == null ? <ModuleCompItem 
                  setIsItemOpen2={setIsItemOpen2}
                  getData={getData} setIsItemOpen={setIsItemOpen} data={data} /> :
                    <ModuleCompItem 
                    setIsItemOpen2={setIsItemOpen2}
                    setData={setData} getData={getData} data={data} setIsItemOpen={setIsItemOpen} />}
                </div>
              </div>
            </>
          ) : null}
        </div>

      </div>
    </>
  );
};

export default SelfModal;