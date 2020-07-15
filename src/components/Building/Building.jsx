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
    street,
    violation_description,
    zip,
  } = building;

  let regEx = /\s'|\s/g;
  let spaceArr = dba.split(regEx);

  function cleanItUp(dirty) {
    spaceArr.forEach((word) => {
      let first = word.charAt(0).toUpperCase();
      let remain = word.slice(1);
      let newWord = first.concat(remain);
      dirty = dirty.replace(word, newWord);
    });
    return dirty;
  }

  return (
    <div className="max-w-sm lg:max-w-full px-6 py-4 rounded shadow-lg flex flex-col m-5 border-solid border-2 border-gray-200">
      <div className="flex justify-start">
        <div className="font-bold text-xl">{cleanItUp(dba)}</div>
      </div>
      <p>{}</p>
    </div>
  );
}
