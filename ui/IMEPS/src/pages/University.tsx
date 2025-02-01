import React from "react";

const universities = [
  { name: "University of Example 1", location: "Country 1" },
  { name: "University of Example 2", location: "Country 2" },
  { name: "University of Example 3", location: "Country 3" },
];

const University: React.FC = () => {
  return (
    <div className="university">
      <h1>Universities</h1>
      <ul>
        {universities.map((university, index) => (
          <li key={index}>
            <h2>{university.name}</h2>
            <p>{university.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default University;
