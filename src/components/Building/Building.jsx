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
        return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
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

  return (
    <div className="w-full lg:w-1/4 mx-5 px-6 py-4 r flex flex-col justify-between items-center m-5 rounded shadow-lg border-solid border-2 border-gray-200">
      <div className="flex justify-between items-center w-full">
        <span>
          {critical_flag === "N" ? null : (
            <img src="https://freesvg.org/img/a14.png" className="w-10 h-auto" />
          )}
        </span>
        <span>{dateClean(inspection_date)}</span>
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className={grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"}
        >
          {grade ? grade : "N/A"}
        </div>
        <div className="font-bold text-xl text-right">{cleanItUp(dba)}</div>
      </div>
      <div className="w-full flex flex-col justify-end text-right">
        <div className="text-lg">
          {`${building} `} {cleanItUp(street)}
        </div>
        <div className="text-lg">{` ${boro}, ${zipcode}`}</div>
      </div>
      <div className="w-full flex justify-between items-center text-2xl">
        <span>
          <span className="mx-1 text-blue-300">{current + 1} of</span>
          <span className="text-blue-500">{total}</span>
        </span>
        <button
          onClick={toggleModal}
          className="px-5 py-3 bg-blue-500 text-white rounded"
        >
          Details
        </button>
      </div>
      {/* TODO: MODAL SECTION TO BE EXTRACTED */}
      {open ? (
        <div
          style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
          className="fixed top-0 left-0 w-screen h-screen bg-gray-200 transition-opacity z-30"
        >
          <div className="fixed top-0 left-0 w-full h-full z-40">
            {/* MODAL */}
            <div
              style={{ marginTop: `30vh` }}
              className="flex flex-col items-center w-3/4 lg:w-3/4 mx-auto mt-10 py-5 px-10 relative rounded bg-white z-50"
            >
              <div className="w-full flex items-center justify-between">
                <div
                  className={
                    grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"
                  }
                >
                  {grade ? grade : "N/A"}
                </div>
                <div className="font-bold text-xl">{cleanItUp(dba)}</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex">
                  {cuisine ? cuisine : "No cuisine type listed"}
                </div>
                <div className="w-full flex flex-col text-right">
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
                className="px-5 py-3 bg-blue-500 text-white rounded"
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
