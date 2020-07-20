import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "./shared/layout";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";

// import { data } from "./assets/testData";

const scrollToBldg = (ref) => window.scrollTo(0, ref.current.offsetTop);

function App() {
  const apiLimit = "$limit=100";
  const byNewest = "&$order=inspection_date DESC";
  const baseUrl = `https://cors-anywhere.herokuapp.com/data.cityofnewyork.us/resource/43nn-pn8j.json?${apiLimit}${byNewest}`;

  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);

  const bldgRef = useRef(null);

  useEffect(() => {
    // FOR TEST DATA
    // setBuildings(data);
    // setLoading(false);

    // For API data
    const fetchData = async () => {
      await axios({
        method: "GET",
        url: `https://cors-anywhere.herokuapp.com/data.cityofnewyork.us/resource/43nn-pn8j.json?${apiLimit}${byNewest}`,
        headers: {
          app_token: process.env.REACT_APP_RESTAURANT_VIOLATIONS_APP_TOKEN,
        },
      })
        .then((res) => {
          setBuildings(res.data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  const searchSubmit = async (search) => {
    setLoading(true);

    await axios({
      method: "GET",
      url: `${baseUrl}&$q=${search}`,
      headers: {
        app_token: process.env.REACT_APP_RESTAURANT_VIOLATIONS_APP_TOKEN,
      },
    })
      .then((res) => {
        setBuildings(res.data);
        setLoading(false);
        scrollIt();
      })
      .catch((error) => console.error(error));
  };

  const scrollIt = () => {
    scrollToBldg(bldgRef);
  };

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Layout handleSubmit={searchSubmit}>
        <Hero />
        <div ref={bldgRef}>
          <Main buildings={buildings} loading={loading} />
        </div>
      </Layout>
    </div>
  );
}

export default App;
