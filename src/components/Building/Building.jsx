import React from "react";

export default function Building({ building }) {
  let {
    action,
    boro,
    bldg,
    critical,
    cuisine,
    dba,
    grade,
    inspection_date,
    inspection_type,
    street,
    violation_description,
    zip,
  } = building;

  function cleanItUp(dirty) {
    let regExWords = /\s'|\s/g;
    let spaceArr = dba.split(regExWords);

    spaceArr.forEach((word) => {
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
    <div className="max-w-sm lg:max-w-full px-6 py-4 rounded shadow-lg flex m-5 border-solid border-2 border-gray-200">
      <div className="text-4xl font-blue-400">{grade}</div>
      <div className="flex justify-start">
        <div className="font-bold text-xl">{cleanItUp(dba)}</div>
        <div className="text-lg">
          {`${bldg} `} {cleanItUp(street)}
        </div>
        <div className="text-lg">{`${boro} ${zip},`}</div>
      </div>
      <div className="flex flex-col justify-end items-end">
        <h3>
          {`${inspection_type} on`} {dateClean(inspection_date)}
        </h3>
        <h3>{`${action}:`}</h3>

        <p>{violation_description}</p>
      </div>
    </div>
  );
}
