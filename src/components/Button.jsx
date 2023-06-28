import React from "react";

export default function Button({ children, onClick = () => {}, className }) {
  return (
    <button onClick={onClick} className={"bg-blue-100 text-black p-1 rounded active:translate-y-px " + className}>
      {children}
    </button>
  );
}
