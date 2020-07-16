import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "./shared/layout";
import Buildings from "./components/Building/Buildings";
import Hero from "./components/Hero/Hero";

const scrollToBldg = (ref) => window.scrollTo(0, ref.current.offsetTop);

function App() {
  const apiLimit = "$limit=20";
  const byNewest = "&$order=inspection_date DESC";
  const baseUrl = `https://cors-anywhere.herokuapp.com/data.cityofnewyork.us/resource/43nn-pn8j.json?${apiLimit}${byNewest}`;

  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const bldgRef = useRef(null);

  useEffect(() => {
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

  const scrollIt = () => {
    scrollToBldg(bldgRef);
  };

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

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Layout handleSubmit={searchSubmit}>
        <Hero />
        <div className="pt-16" ref={bldgRef}>
          <Buildings loading={loading} buildings={buildings} />
        </div>
      </Layout>
    </div>
  );
}

// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue];
// }

export default App;
