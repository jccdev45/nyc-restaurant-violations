import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./shared/layout";
import Buildings from "./components/Building/Buildings";

function App() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "GET",
        url: `https://cors-anywhere.herokuapp.com/data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=10`,
        headers: {
          app_token: process.env.REACT_APP_RESTAURANT_VIOLATIONS_APP_TOKEN,
        },
      })
        .then((res) => setBuildings(res.data))
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto flex flex-wrap">
        <Buildings buildings={buildings} />
      </div>
    </Layout>
  );
}

export default App;
