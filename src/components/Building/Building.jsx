import React from "react";
import { useState, useRef, useEffect } from "react";
import { cleanItUp, dateClean, listifyDesc } from "../../utility/sanitize";

export default function Building({ markerClick, current, total, bldg }) {
  let {
    action,
    boro,
    building,
    critical_flag,
    cuisine,
    dba,
    grade,
    inspection_date,
    inspection_type,
    street,
    violation_description,
    zipcode,
  } = bldg;

  const [open, setOpen] = useState(false);
  // const [hoverRef, isHovered] = useHover();
  const [selected, toggleSelected] = useState(false);

  function toggleModal() {
    setOpen(!open);
  }

  function clickMarker() {
    toggleSelected(!selected);
    markerClick(bldg);
  }

  const cardStyle = {
    border: `2px solid blue`,
    backgroundColor: `rgba(0, 0, 100, 0.1)`,
  };

  return (
    <div
      // ref={hoverRef}
      className="flex flex-col items-center justify-between w-full px-6 py-4 mx-auto my-5 transition duration-100 ease-in-out bg-white border-2 border-gray-200 border-solid rounded shadow-lg cursor-pointer hover:border-blue-600 hover:bg-transparent"
      style={selected ? cardStyle : null}
      onClick={clickMarker}
    >
      <div className="flex items-center justify-between w-full">
        <span>
          {critical_flag === "N" ? null : (
            <img
              src="https://freesvg.org/img/a14.png"
              alt="Critical"
              className="w-10 h-auto"
            />
          )}
        </span>
        <span>{dateClean(inspection_date)}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <div
          className={grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"}
        >
          {grade ? grade : "N/A"}
        </div>
        <div className="text-xl font-bold text-right">{cleanItUp(dba)}</div>
      </div>
      <div className="flex flex-col justify-end w-full text-right">
        <div className="text-lg">
          {`${building} `} {cleanItUp(street)}
        </div>
        <div className="text-lg">{` ${boro}, ${zipcode}`}</div>
      </div>
      <div className="flex items-center justify-between w-full text-2xl">
        <span>
          <span className="mx-1 text-blue-300">{current + 1} of</span>
          <span className="text-blue-500">{total}</span>
        </span>
        <button
          onClick={toggleModal}
          className="px-5 py-3 text-white transition duration-100 ease-in-out bg-blue-500 rounded hover:bg-blue-700"
          style={{ transition: `all .15s ease ` }}
        >
          Details
        </button>
      </div>
      {/* TODO: MODAL SECTION TO BE EXTRACTED */}
      {open ? (
        <div
          style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
          className="fixed top-0 left-0 z-30 w-screen h-screen transition-opacity bg-gray-200"
        >
          <div
            className="fixed top-0 left-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto"
            // onClick={toggleModal}
          >
            {/* MODAL */}
            <div
              // style={{ marginTop: `25vh` }}
              className="relative z-40 flex flex-col items-center w-3/4 px-5 py-10 overflow-y-auto bg-white rounded lg:w-3/4"
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={
                    grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"
                  }
                >
                  {grade ? grade : "N/A"}
                </div>
                <div className="text-xl font-bold">{cleanItUp(dba)}</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex">
                  {cuisine ? cuisine : "No cuisine type listed"}
                </div>
                <div className="flex flex-col w-full text-right">
                  <div className="text-lg">
                    {`${building} `} {cleanItUp(street)}
                  </div>
                  <div className="text-lg">{` ${boro}, ${zipcode}`}</div>
                </div>
              </div>
              <div className="text-lg">{`${inspection_type}`}</div>
              <h3>{`${action}`}</h3>

              <ul className="list-disc list-inside">
                {listifyDesc(violation_description)}
              </ul>
              <button
                onClick={toggleModal}
                className="px-5 py-3 text-white bg-blue-500 rounded"
                style={{ transition: `all .15s ease-in-out ` }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);

  // const handleMouseOver = () => setValue(true);
  // const handleMouseOut = () => setValue(false);
  const handleClick = () => {
    setValue(!value);
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      // node.addEventListener("mouseover", handleMouseOver);
      // node.addEventListener("mouseout", handleMouseOut);
      node.addEventListener("click", handleClick);

      return () => {
        // node.removeEventListener("mouseover", handleMouseOver);
        // node.removeEventListener("mouseout", handleMouseOut);
        node.removeEventListener("click", handleClick);
      };
    }
  }, [ref, value]);

  return [ref, value];
}
