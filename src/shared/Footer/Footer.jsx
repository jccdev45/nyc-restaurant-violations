import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-start p-5 bg-gray-300">
      <div className="flex flex-col items-center">
        <span>Creation & Design:</span>
        <span> Jordan Cruz-Correa</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
