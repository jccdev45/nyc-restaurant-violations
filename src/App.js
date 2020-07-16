import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./shared/layout";
import Buildings from "./components/Building/Buildings";

function App() {
  const apiLimit = "$limit=20";
  const byNewest = "&$order=inspection_date DESC";
  const baseUrl = `https://cors-anywhere.herokuapp.com/data.cityofnewyork.us/resource/43nn-pn8j.json?${apiLimit}${byNewest}`;

  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const [api] = useState(baseUrl);

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

  const searchSubmit = async (search) => {
    setLoading(true);

    await axios({
      method: "GET",
      url: `${api}&$q=${search}`,
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

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Layout handleSubmit={searchSubmit}>
        <div
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1512749355846-eb142b5cc4a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80)`,
            backgroundSize: `cover`,
            height: `30rem`,
          }}
          className="flex items-center"
        >
          <div className="w-1/2 mx-auto py-10 container rounded text-center bg-gray-200">
            <span className="p-10 flex flex-col text-2xl text-blue-400">
              Welcome to NYC Health Inspections & Violations Search.
            </span>
          </div>
        </div>
        {/* <img
          className="object-cover h-auto w-full"
          style={{ height: `30rem` }}
          src="https://images.unsplash.com/photo-1512749355846-eb142b5cc4a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80"
          alt=""
        />
        <div className="w-1/2 mx-auto my-20 py-10 container rounded text-center bg-gray-200">
          <span className="p-10 flex flex-col text-2xl text-blue-400">
            Welcome to NYC Health Inspections & Violations Search.
          </span>
        </div> */}
        <Buildings loading={loading} buildings={buildings} />
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
