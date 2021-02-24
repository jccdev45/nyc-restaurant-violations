import { useReducer, useEffect } from "react";
import axios from "axios";
// import { data } from "../assets/testData";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
};

const baseUrl = `https://data.cityofnewyork.us/resource/43nn-pn8j.json?`;

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, buildings: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, buildings: action.payload.buildings };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        buildings: [],
      };
    default:
      return state;
  }
}

export default function useFetchData(search) {
  const [state, dispatch] = useReducer(reducer, {
    buildings: [],
    loading: true,
  });

  useEffect(() => {
    // TEST DATA
    // dispatch({ type: ACTIONS.MAKE_REQUEST });
    // dispatch({ type: ACTIONS.GET_DATA, payload: { buildings: data } });

    // API DATA
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(baseUrl, {
        cancelToken: cancelToken.token,
        headers: {
          "X-App-Token": process.env.REACT_APP_RESTAURANT_VIOLATIONS_APP_TOKEN,
        },
        params: {
          $limit: 100,
          $where: "latitude > 40",
          $q: search,
          $order: 'inspection_date DESC'
        },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { buildings: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
    return () => {
      cancelToken.cancel();
    };
  }, [search]);

  return state;
}
