import { useState } from "react";

function TTip({ children, text, position = "top" }) {
  const [show, setShow] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative inline-block z-100">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>

      {show && (
        <div
          className={`absolute ${positionClasses[position]} left-1/2 transform -translate-x-1/2 
          bg-gray-800 text-white px-3 py-1.5 rounded-full text-[10px] whitespace-nowrap z-50
          `}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default TTip;
