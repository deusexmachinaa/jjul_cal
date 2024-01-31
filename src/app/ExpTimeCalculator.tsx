// "use client";
// import React, { useState, useEffect } from "react";

// const ExpTimerCalculator: React.FC = () => {
//   const [initialExp, setInitialExp] = useState<string>("");
//   const [finalExp, setFinalExp] = useState<string>("");
//   const [timer, setTimer] = useState<number>(0);
//   const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
//   const [expDifference, setExpDifference] = useState<number | null>(null);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (isTimerRunning) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev + 1);
//       }, 1000);
//     } else if (!isTimerRunning && timer !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isTimerRunning, timer]);

//   const handleStartStopTimer = () => {
//     if (isTimerRunning) {
//       const initialExpNum = parseInt(initialExp);
//       const finalExpNum = parseInt(finalExp);
//       if (
//         !isNaN(initialExpNum) &&
//         !isNaN(finalExpNum) &&
//         finalExpNum >= initialExpNum
//       ) {
//         setExpDifference(finalExpNum - initialExpNum);
//       }
//       setTimer(0);
//     }
//     setIsTimerRunning(!isTimerRunning);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg text-black mx-4 my-4">
//       <h2 className="text-xl font-bold mb-4">경험치 측정 타이머</h2>

//       {/* 경험치 입력 필드 */}
//       <div className="mb-2">
//         <label
//           className="block text-gray-700 text-sm font-bold mb-1"
//           htmlFor="initialExp"
//         >
//           타이머 시작 시 경험치
//         </label>
//         <input
//           className="border border-gray-300 p-2 rounded-lg w-full"
//           type="text"
//           id="initialExp"
//           value={initialExp}
//           onChange={(e) => setInitialExp(e.target.value)}
//         />
//       </div>

//       <div className="mb-2">
//         <label
//           className="block text-gray-700 text-sm font-bold mb-1"
//           htmlFor="finalExp"
//         >
//           타이머 종료 시 경험치
//         </label>
//         <input
//           className="border border-gray-300 p-2 rounded-lg w-full"
//           type="text"
//           id="finalExp"
//           value={finalExp}
//           onChange={(e) => setFinalExp(e.target.value)}
//         />
//       </div>

//       {/* 타이머 및 시작/중지 버튼 */}
//       <div className="flex justify-between items-center mb-4">
//         <span>타이머: {timer}초</span>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleStartStopTimer}
//         >
//           {isTimerRunning ? "중지" : "시작"}
//         </button>
//       </div>

//       {/* 경험치 차이 표시 */}
//       {expDifference != null && (
//         <p>경험치 차이: {expDifference.toLocaleString()}</p>
//       )}
//     </div>
//   );
// };

// export default ExpTimerCalculator;
