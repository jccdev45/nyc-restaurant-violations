import React from "react";

export default function Building({ current, total, bldg }) {
  let {
    action,
    boro,
    building,
    critical,
    cuisine,
    dba,
    grade,
    inspection_date,
    inspection_type,
    street,
    violation_description,
    zipcode,
  } = bldg;

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

  return (
    <div className="max-w-sm h-sm px-6 py-4 r flex flex-col justify-between items-center m-5 rounded shadow-lg border-solid border-2 border-gray-200">
      <div className="w-full flex items-center justify-between">
        <div
          className={grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"}
        >
          {grade ? grade : "N/A"}
        </div>
        <div className="font-bold text-xl">{cleanItUp(dba)}</div>
      </div>
      {/* <div className="flex justify-start"> */}
      <div className="w-full flex flex-col justify-end text-right">
        <div className="text-lg">
          {`${building} `} {cleanItUp(street)} {` ${boro}, ${zipcode}`}
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-center">
          {`${inspection_type}`} ({dateClean(inspection_date)})
        </h3>
        <h3>{`${action}`}</h3>

        <p>{violation_description}</p>
      </div>
      <div className="justify-center">
        <span className="text-blue-300">{current + 1}</span> of{" "}
        <span className="text-blue-500">{total}</span>
      </div>
    </div>
    // <div className="max-w-sm lg:max-w-full h-full px-6 py-4 r flex justify-between items-center m-5 ounded shadow-lg border-solid border-2 border-gray-200">
    //   <div
    //     className={grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"}
    //   >
    //     {grade ? grade : "N/A"}
    //   </div>
    //   <div className="flex justify-start">
    //     <div className="font-bold text-xl">{cleanItUp(dba)}</div>
    //     <div className="flex flex-col">
    //       <div className="text-lg">
    //         {`${building} `} {cleanItUp(street)}
    //       </div>
    //       <div className="text-lg">{`${boro} ${zip},`}</div>
    //     </div>
    //   </div>
    //   <div className="flex flex-col justify-end items-end text-right">
    //     <h3>
    //       {`${inspection_type}`} ({dateClean(inspection_date)})
    //     </h3>
    //     <h3>{`${action}`}</h3>

    //     <p>{violation_description}</p>
    //   </div>
    // </div>
  );
}
