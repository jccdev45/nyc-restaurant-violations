import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export default function Layout({ children, handleSubmit }) {
  return (
    <>
      <Nav handleSubmit={handleSubmit} />
      <div className="flex flex-col flex-grow h-full">{children}</div>
      <Footer />
    </>
  );
}
