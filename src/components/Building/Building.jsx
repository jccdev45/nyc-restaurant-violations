import React from "react";
import { useState } from "react";

export default function Building({ current, total, bldg }) {
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

  function cleanItUp(dirty) {
    let regExWords = /\s'|\s/g;
    let spaced = dirty.split(regExWords);

    spaced.forEach((word) => {
      let first = word.charAt(0).toUpperCase();
      let remain = word.slice(1);
      let newWord = first.concat(remain);
      dirty = dirty.replace(word, newWord);
    });
    return dirty;
  }

  function dateClean(date) {
    let regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm;
    let dateArr = date.split(regEx);

    let i = dateArr.length;

    let mapped = dateArr.map((item) => item);

    while (i--) {
      if (regEx.test(mapped[i])) {
        let yyyyMMDD = dateArr.splice(i, 1).toString();
        let splitDate = yyyyMMDD.split("-");
        return `${splitDate[1]} / ${splitDate[2]} / ${splitDate[0]}`;
      }
    }
  }

  function listifyDesc(desc) {
    let split = desc.split(".");
    return split.map((sent, index) => {
      return sent.length > 1 ? (
        <li key={index} className="my-2">
          {sent}
        </li>
      ) : null;
    });
  }

  function toggleModal() {
    setOpen(!open);
  }

  const cardStyle = {
    border: `2px solid blue`,
  };

  return (
    <div
      className="flex flex-col items-center justify-between w-full px-6 py-4 m-5 mx-5 border-2 border-gray-200 border-solid rounded shadow-lg lg:w-1/4"
      style={open ? cardStyle : null}
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
          className="px-5 py-3 text-white bg-blue-500 rounded"
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
              className="relative z-40 flex flex-col items-center w-3/4 px-10 py-5 mx-auto my-12 overflow-y-auto bg-white rounded lg:w-3/4"
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
                style={{ transition: `all .15s ease ` }}
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
