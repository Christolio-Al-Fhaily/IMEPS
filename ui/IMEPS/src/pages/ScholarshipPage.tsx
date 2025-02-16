import React from "react";

const bourses = [
  { name: "Scholarship A", details: "Details about ScholarshipPage A" },
  { name: "Scholarship B", details: "Details about ScholarshipPage B" },
  { name: "Scholarship C", details: "Details about ScholarshipPage C" },
];

const ScholarshipPage: React.FC = () => {
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

export default ScholarshipPage;
