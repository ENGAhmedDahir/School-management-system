import React from 'react';

const Schedule = () => {
  const scheduleData = [
    { day: 'Starday', time: '7:00 AM - 8:30 AM', subject: 'Mathematics' },
    { day: 'Starday', time: '9:00 AM - 10:30 PM', subject: 'Physics' },
    { day: 'Starday', time:  '10:30 AM - 11:30 AM', subject: 'Chemistry' },
    { day: 'Starday', time:  '11:00 AM - 12:30 PM', subject: 'History' },
    { day: 'Sunday', time: '7:00 AM - 8:30 AM', subject: 'English' },
    { day: 'Sunday', time: '8:30 AM - 9:30 PM', subject: 'Biology' },
    { day: 'Sunday', time: '9:30 AM - 10:30 AM', subject: 'Islamic' },
    { day: 'Sunday', time: '10:30 AM - 12:00 PM', subject: 'Geography' },
    { day: 'Monday', time: '7:00 AM - 8:30 AM', subject: 'Af soomaali' },
    { day: 'Monday', time: '8:30 AM - 9:30 AM', subject: 'Physical ' },
    { day: 'Monday', time: '9:30 AM - 10:30 AM', subject: 'Technology' },
    { day: 'Tuesday', time: '7:00 AM - 8:30 AM', subject: 'Biology' },
    { day: 'Tuesday', time: '8:30 AM - 9:30 AM', subject: 'Islamic' },
    { day: 'wednesday', time: '7:00 AM - 9:00 AM', subject: 'Arabic' },
    { day: 'Wednesday', time: '9:00 AM - 11:30 AM', subject: 'mathetics' },
  
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Weekly Schedule</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">Day</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Subject</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((entry, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } text-gray-700`}
              >
                <td className="border px-4 py-2">{entry.day}</td>
                <td className="border px-4 py-2">{entry.time}</td>
                <td className="border px-4 py-2">{entry.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
