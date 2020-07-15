import React from "react";

export default function Filter({
  value,
  category,
  categories,
  handleChangeCategory,
  handleChangeSearch,
}) {
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

  return (
    <div>
      <select onChange={handleChangeCategory} value={category}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cleanItUp(cat)}
            {/* {cat} */}
          </option>
        ))}
      </select>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 focus:outline-none focus:shadow-outline"
        placeholder="Search"
        value={value}
        onChange={handleChangeSearch}
      />
    </div>
  );
}
