import React, { useState, useRef } from "react";
import Layout from "./shared/layout";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";
import useFetchData from "./utility/useFetchData";

const scrollToBldg = (ref) => window.scrollTo(0, ref.current.offsetTop);

function App() {
  const [params] = useState({});
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const { buildings, loading, error } = useFetchData(params, search);

  const bldgRef = useRef(null);

  const handleParamChange = (e) => {
    // const param = e.target.name;
    const value = e.target.value;
    setInput(value);
    // setParams((prevParams) => {
    //   return { ...prevParams, [param]: value };
    // });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    scrollIt();
    setSearch(input);
  };

  const scrollIt = () => {
    scrollToBldg(bldgRef);
  };

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Layout
        input={input}
        handleChange={handleParamChange}
        handleSubmit={handleSearchSubmit}
      >
        <Hero />
        <div ref={bldgRef}>
          {error ? (
            <div style={{ display: `grid`, placeItems: `center` }}>
              <h1>Unexpected error, please try refreshing.</h1>
            </div>
          ) : (
            <Main buildings={buildings} loading={loading} />
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
