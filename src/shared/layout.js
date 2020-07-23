import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export default function Layout({ children, value, handleSubmit, handleChange }) {
  return (
    <>
      <Nav value={value} handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className="flex flex-col flex-grow h-full">{children}</div>
      <Footer />
    </>
  );
}
