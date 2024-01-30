"use cliet";
import React, { useState } from "react";

const ExpEstimateCalculator: React.FC = () => {
  const [myLevel, setMyLevel] = useState<string>("");
  const [partyLevel, setPartyLevel] = useState<string>("");
  const [selectedMinutes, setSelectedMinutes] = useState<string>("");
  const [expAmount, setExpAmount] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<{
    totalExp?: number;
    myExp?: number;
    partyExpShare?: number;
  }>({});

  const calculateExpEstimate = (
    myLevel: number,
    partyLevel: number,
    minutes: number,
    expAmount: number
  ): { myExpPerHour: number; partyExpPerHour: number } => {
    const multiplier = 60 / minutes;
    const totalExp = expAmount * multiplier;

    const totalLevel = myLevel + partyLevel;
    const myLevelRatio = myLevel / totalLevel;
    const partyLevelRatio = partyLevel / totalLevel;

    const myExpPerHour = totalExp * (0.2 + 0.8 * myLevelRatio) * 1.1;
    const partyExpPerHour = totalExp * 0.8 * partyLevelRatio * 1.1;

    return { myExpPerHour, partyExpPerHour };
  };

  const handleEstimate = () => {
    const myLevelNum = parseInt(myLevel);
    const partyLevelNum = parseInt(partyLevel);
    const selectedMinutesNum = parseInt(selectedMinutes);
    const expAmountNum = parseInt(expAmount); // 사용자가 입력한 경험치량

    if (
      !isNaN(myLevelNum) &&
      !isNaN(partyLevelNum) &&
      !isNaN(selectedMinutesNum) &&
      !isNaN(expAmountNum)
    ) {
      const { myExpPerHour, partyExpPerHour } = calculateExpEstimate(
        myLevelNum,
        partyLevelNum,
        selectedMinutesNum,
        expAmountNum
      );
      setCalculationResult({
        totalExp: myExpPerHour + partyExpPerHour,
        myExp: myExpPerHour,
        partyExpShare: partyExpPerHour,
      });
    } else {
      setCalculationResult({});
    }
  };
  // 입력 처리 함수
  const handleLevelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      if (/^\d*$/.test(value)) {
        setState(value);
      }
    } else {
      setState(""); // 숫자가 아니거나 음수일 경우 빈 문자열로 설정
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-black mx-4 my-4">
      <h2 className="text-xl font-bold mb-4 text-center">경험치 견적 계산기</h2>

      {/* 사용자의 레벨 입력 필드 */}
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="myLevel"
        >
          내 레벨
        </label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          inputMode="numeric"
          id="myLevel"
          value={myLevel}
          onChange={(e) => handleLevelChange(e, setMyLevel)}
        />
      </div>

      {/* 파티원의 레벨 입력 필드 */}
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="partyLevel"
        >
          파티원 레벨
        </label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          inputMode="numeric"
          id="partyLevel"
          value={partyLevel}
          onChange={(e) => handleLevelChange(e, setPartyLevel)}
        />
      </div>

      {/* 선택한 분 단위 입력 필드 */}
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="selectedMinutes"
        >
          혼자 사냥시 선택한 분 단위
        </label>
        <select
          className="border border-gray-300 p-2 rounded-lg w-full"
          id="selectedMinutes"
          value={selectedMinutes}
          onChange={(e) => setSelectedMinutes(e.target.value)}
        >
          <option value="">분 단위 선택</option>
          <option value="5">5분</option>
          <option value="10">10분</option>
          <option value="15">15분</option>
          <option value="20">20분</option>
          <option value="30">30분</option>
        </select>
      </div>

      {/* 총 경험치량 입력 필드 */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="expAmount"
        >
          {selectedMinutes} 분당 경험치량
        </label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          inputMode="numeric"
          id="expAmount"
          value={expAmount}
          onChange={(e) => handleLevelChange(e, setExpAmount)}
        />
      </div>

      {/* 계산하기 버튼 */}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEstimate}
        >
          계산하기
        </button>
      </div>

      {/* 계산 결과 표시 영역 */}
      <div className="mt-4 text-black">
        <h2 className="text-lg font-semibold text-center">계산 결과</h2>
        {calculationResult.totalExp != null && (
          <p>
            1 시간당 전체 경험치: {calculationResult.totalExp.toLocaleString()}
          </p>
        )}
        {calculationResult.myExp != null && (
          <p>내 1 시간당 경험치: {calculationResult.myExp.toLocaleString()}</p>
        )}
        {calculationResult.partyExpShare != null && (
          <p>
            파티원 1 시간당 경험치:{" "}
            {calculationResult.partyExpShare.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpEstimateCalculator;
