import { useState } from "react";

export default function SkillsGrid({ skills = [] }) {
  const [showAll, setShowAll] = useState(false);

  const VISIBLE_COUNT = 12; // number of skills in first 2 rows (adjust as needed)
  const visibleSkills = showAll ? skills : skills?.slice(0, VISIBLE_COUNT);

  return (
    <div className="px-6 pb-6">
      <h3 className="text-lg font-semibold mb-2">Skills</h3>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* See More / See Less button */}
      {skills.length > VISIBLE_COUNT && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}
