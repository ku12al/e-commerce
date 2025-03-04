// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { server } from "../../server.js";

// const CountDown = ({ data }) => {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     if (
//       typeof timeLeft.days === 'undefined' &&
//       typeof timeLeft.hours === 'undefined' &&
//       typeof timeLeft.minutes === 'undefined' &&
//       typeof timeLeft.seconds === 'undefined'
//     ) {
//       axios.delete(`${server}/event/delete-shop-event/${data._id}`);
//     }
//     return () => clearTimeout(timer);
//   });

//   function calculateTimeLeft() {
//     const difference = +new Date(data.Finish_Date) - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }

//     return timeLeft;
//   }

//   const timerComponents = Object.keys(timeLeft).map((interval) => {
//     if (!timeLeft[interval]) {
//       return null;
//     }

//     return (
//       <span className="text-[25px] text-[#475ad2]">
//         {timeLeft[interval]} {interval}{" "}
//       </span>
//     );
//   });

//   return (
//     <div>
//       {timerComponents.length ? (
//         timerComponents
//       ) : (
//         <span className="text-[red] text-[25px]">Time's Up</span>
//       )}
//     </div>
//   );
// };

// export default CountDown;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server.js";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(data?.end_Date));

  useEffect(() => {
    if (!data?.end_Date) return; // Ensure Finish_Date is available

    const interval = setInterval(() => {
      const remainingTime = calculateTimeLeft(data.end_Date);
      setTimeLeft(remainingTime);

      if (Object.keys(remainingTime).length === 0) {
        clearInterval(interval);
        axios.delete(`${server}/event/delete-shop-event/${data._id}`).catch(console.error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]); // Runs when `data` changes

  function calculateTimeLeft(finishDate) {
    if (!finishDate) return {};

    const difference = +new Date(finishDate) - +new Date();
    if (difference <= 0) return {}; // If time is up, return empty object

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <div>
      {Object.keys(timeLeft).length ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <span key={unit} className="text-[25px] text-[#475ad2]">
            {value} {unit}{" "}
          </span>
        ))
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
