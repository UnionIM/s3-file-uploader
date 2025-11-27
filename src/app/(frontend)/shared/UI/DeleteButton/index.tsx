"use client";

import { FC, ButtonHTMLAttributes } from "react";

const DeleteButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600 transition"
  >
    Delete
  </button>
);

export default DeleteButton;
