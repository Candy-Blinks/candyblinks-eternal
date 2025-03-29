import React, { useState } from "react";

const ToggleSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        enabled ? "bg-gray-600" : "bg-gray-800"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <div
        className={`h-5 w-5 rounded-full bg-gray-400 transition-transform ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
