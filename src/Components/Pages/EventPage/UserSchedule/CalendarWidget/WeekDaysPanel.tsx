import React from 'react';

export const WeekDaysPanel = () => (
  <div className="grid grid-cols-7 border-b border-gray-300">
    {'Mon_Tue_Wed_Thu_Fri_Sat_Sun'.split('_').map((day, i) => (
      <span
        key={day}
        className={`font-thin text-center select-none ${i > 4 ? 'text-red-500' : ''}`}
      >
        {day.substring(0, 3)}
      </span>
    ))}
  </div>
);
