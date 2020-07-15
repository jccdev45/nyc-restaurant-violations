import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export default function Layout({
  children,
  value,
  category,
  categories,
  handleChangeCategory,
  handleChangeSearch,
}) {
  return (
    <>
      <Nav
        value={value}
        categories={categories}
        category={category}
        handleChangeCategory={handleChangeCategory}
        handleChangeSearch={handleChangeSearch}
      />
      <div className="flex-grow">{children}</div>
      <Footer />
    </>
  );
}
