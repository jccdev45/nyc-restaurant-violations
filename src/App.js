import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./shared/layout";
import Buildings from "./components/Building/Buildings";

function App() {
  const apiLimit = "$limit=200";
  const byNewest = "&$order=inspection_date DESC";
  const baseUrl = `https://cors-anywhere.herokuapp.com/data.cityofnewyork.us/resource/43nn-pn8j.json?${apiLimit}${byNewest}`;

  const [buildings, setBuildings] = useState([]);
  const [word, setWord] = useState("");
  // const [api, setApi] = useState(baseUrl);
  const [category, setCat] = useState("");
  const [categories, setCats] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);

  useEffect(() => {
    fetchData();
  }, [setBuildings]);

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: `${baseUrl}`,
      headers: {
        app_token: process.env.REACT_APP_RESTAURANT_VIOLATIONS_APP_TOKEN,
      },
    })
      .then((res) => {
        setBuildings(res.data);

        let catList = Object.keys(res.data[0]).map((category) => {
          return category;
        });
        setCats(catList);
      })
      .catch((error) => console.error(error));
  };

  const handleChangeCategory = (e) => {
    setCat(e);
  };

  const handleChangeSearch = (e) => {
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
      // let cat = category;
      newList = defaultList.filter((building) =>
        building.dba.includes(word.toLowerCase())
      );
      setFilteredBuildings(newList);
    } else {
      setFilteredBuildings(buildings);
    }
  };

  // const searchSubmit = search => {
  //   setApi(`${baseUrl}&$q=${search}`);

  //   await axios({
  //     method: "GET",
  //     url: `${api}`,
  //     headers: {
  //       app_token: process.env.REACT_APP_RESTAURANT_VIOLATIONS_APP_TOKEN,
  //     },
  //   })
  //     .then((res) => {
  //       setBuildings(res.data);
  //     })
  //     .then(
  //       axios.spread((keys) => {
  //         console.log(keys);
  //         // setCats(keys.data)
  //       })
  //     )
  //     .catch((error) => console.error(error));
  // }

  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Layout
        value={word}
        category={category}
        categories={categories}
        handleChangeCategory={(e) => handleChangeCategory(e.target.value)}
        handleChangeSearch={(e) => handleChangeSearch(e.target.value)}
      >
        <Buildings buildings={word.length < 1 ? [] : filteredBuildings} />
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
