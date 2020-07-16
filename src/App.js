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
          <div className="w-3/4 mx-auto py-10 flex flex-col container rounded text-center bg-gray-200">
            <span className="w-3/4 mx-auto p-10 flex flex-col text-2xl text-blue-400">
              <div>Welcome to NYC Health Inspections & Violations Search.</div>
              <div className="text-lg">
                Find out just how dirty your favorite restaurant is but don't
                let it stop you from living your best, filthy life you animal.
              </div>
            </span>
            <ul className="flex flex-wrap justify-center break-normal list-outside mx-auto list-disc text-xl">
              <li className="mx-5">N - Not Yet Graded</li>
              <li className="mx-5">N/A - No Grade Found</li>
              <li className="mx-5">A/B/C - Self-Explanatory</li>
              <li className="mx-5">Z - Grade Pending</li>
              <li className="mx-5">
                P - "Grade Pending" issued on re-opening following an inspection
                that resulted in a closure
              </li>
            </ul>
          </div>
        </div>
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
