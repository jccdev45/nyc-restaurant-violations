import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export default function Layout({ children, value, handleChange }) {
  return (
    <>
      <Nav value={value} handleChange={handleChange} />
      <div className="flex-grow">{children}</div>
      <Footer />
    </>
  );
}
