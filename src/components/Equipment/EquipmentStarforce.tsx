import React from 'react';
import './EquipmentStarforce.css';

type StarForceBarProps = {
  filled: number | string;
  total?: number;
};

export default function EquipmentStarforce({ filled, total = 25 }: StarForceBarProps) {
    const count = Math.max(0, Math.min(Number(filled), total));
    const groupCount = Math.ceil(total / 5);
  
    const groups = Array.from({ length: groupCount }, (_, groupIdx) => {
      return Array.from({ length: 5 }, (_, i) => {
        const starIndex = groupIdx * 5 + i;
        const isFilled = starIndex < count;
        return (
          <span key={i} className={`star ${isFilled ? 'filled' : 'unfilled'}`}>
            ★
          </span>
        );
      });
    });
  
    // Chunk into rows of max 3 groups
    const rows = [];
    for (let i = 0; i < groups.length; i += 3) {
      rows.push(groups.slice(i, i + 3));
    }
  
    return (
      <div className="starforce-bar">
        {rows.map((row, i) => (
          <div key={i} className="starforce-row">
            {row.map((group, j) => (
              <div key={j} className="star-group">
                {group}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  