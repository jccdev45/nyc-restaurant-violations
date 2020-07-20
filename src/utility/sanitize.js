import React from 'react'

export function cleanItUp(dirty) {
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

export function dateClean(date) {
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

export function listifyDesc(desc) {
  let split = desc.split(".");
  return split.map((sent, index) => {
    return sent.length > 1 ? (
      <li key={index} className="my-2">
        {sent}
      </li>
    ) : null;
  });
}
