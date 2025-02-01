// src/pages/bourseList/BourseList.tsx
import React from "react";
import "./bourse.css";

const bourses = [
  { name: "Scholarship A", details: "Details about Scholarship A" },
  { name: "Scholarship B", details: "Details about Scholarship B" },
  { name: "Scholarship C", details: "Details about Scholarship C" },
];

const Bourse: React.FC = () => {
  return (
    <div className="bourse">
      <h1>Scholarships</h1>
      <ul>
        {bourses.map((bourse, index) => (
          <li key={index}>
            <h2>{bourse.name}</h2>
            <p>{bourse.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bourse;
