import React from "react";
import Portal from "../utils/Portal";

export const TestModal = ({ color }: { color?: string }) => {
  return (
    <Portal>
      <div style={{ backgroundColor: color || "red" }}>modal</div>
    </Portal>
  );
};
