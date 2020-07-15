import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./shared/layout";
import Buildings from "./components/Building/Buildings";

function App() {
  const [buildings, setBuildings] = useState("buildings", []);
  const [word, setWord] = useState("");
  const [filtered, setFiltered] = useState([]);

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
  }, [setBuildings]);

  const handleChange = (e) => {
    setWord(e);
    let defaultList = buildings.map((building) => {
      return {
        action: building.action,
        boro: building.boro,
        bldg: building.building,
        critical: building.critical_flag,
        cuisine: building.cuisine_description,
        dba: building.dba.toLowerCase(),
        grade: building.grade,
        grade_date: building.grade_date,
        inspection_date: building.inspection_date,
        inspection_type: building.inspection_type,
        lat: building.latitude,
        lng: building.longitude,
        phone: building.phone,
        record_date: building.record_date,
        score: building.score,
        street: building.street,
        violation_code: building.violation_code,
        violation_description: building.violation_description,
        zip: building.zipcode,
      };
    });

    if (e !== "") {
      let newList = [];
      newList = defaultList.filter((building) =>
        building.dba.includes(word.toLowerCase())
      );
      setFiltered(newList);
    } else {
      setFiltered(buildings);
    }
  };

  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Layout value={word} handleChange={(e) => handleChange(e.target.value)}>
        <Buildings buildings={word.length < 1 ? [] : filtered} />
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
