import React, { useState, useEffect } from 'react';

const Overlay = ({ setIsItemOpen, isItemOpen }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(isItemOpen);

  // Sync the state with the parent
  useEffect(() => {
    setIsOverlayOpen(isItemOpen);
  }, [isItemOpen]);

  return (
    <>
      <div
        className={`${isOverlayOpen ? '' : 'hidden'}`}
        onClick={() => {
          setIsOverlayOpen(false);
          setIsItemOpen(false);  // Close the overlay when clicked
        }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 999,  // Ensure it appears above other content
        }}
      ></div>
    </>
  );
}

export default Overlay;
