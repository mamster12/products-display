import React from "react";

export const PriceInput = ({ filter, setFilter }) => {
  return (
    <ul>
      Search:{" "}
      <li>
        <span>Highest Price</span>
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </li>
      <li>
        <span>lower Price</span>
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </li>
    </ul>
  );
};
