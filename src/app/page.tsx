"use client";
import React, { useState } from "react";

export default function Home() {
  const [myLevel, setMyLevel] = useState<number>(0); // 숫자 타입으로 변경
  const [partyLevel, setPartyLevel] = useState<number>(0); // 숫자 타입으로 변경
  const [baseExp, setBaseExp] = useState<number>(0); // 숫자 타입으로 변경
  const [result, setResult] = useState<{
    totalExp?: number;
    partyExpShare?: number;
  }>({});

  function calculateExpShare(
    myLevel: number,
    partyLevel: number,
    myExp: number
  ): { totalExp: number; partyExpShare: number } {
    const totalLevel = myLevel + partyLevel;
    const myLevelRatio = myLevel / totalLevel;
    const partyLevelRatio = partyLevel / totalLevel;

    // 사냥한 사람의 경험치 비율로 총 경험치 계산
    const totalExp = myExp / (0.2 + 0.8 * myLevelRatio);

    // 쩔받는 사람의 경험치 계산
    const partyExpShare = totalExp * 0.8 * partyLevelRatio;

    return { totalExp, partyExpShare };
  }

  const handleCalculate = () => {
    const myLevelNum = Number(myLevel); // String을 Number로 변환
    const partyLevelNum = Number(partyLevel); // String을 Number로 변환
    const baseExpNum = Number(baseExp); // String을 Number로 변환

    if (!isNaN(myLevelNum) && !isNaN(partyLevelNum) && !isNaN(baseExpNum)) {
      const { totalExp, partyExpShare } = calculateExpShare(
        myLevelNum,
        partyLevelNum,
        baseExpNum
      );
      setResult({ totalExp, partyExpShare });
    } else {
      setResult({}); // 빈 객체로 초기화
    }
  };

  const handleLevelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setState(value);
    } else {
      setState(0); // 숫자가 아니거나 음수일 경우 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">쩔 경험치 계산기</h1>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="myLevel"
          >
            내 레벨
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="number"
            id="myLevel"
            value={myLevel}
            onChange={(e) => handleLevelChange(e, setMyLevel)}
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="partyLevel"
          >
            파티원 레벨
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="number"
            id="partyLevel"
            value={partyLevel}
            onChange={(e) => handleLevelChange(e, setPartyLevel)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="baseExp"
          >
            내가 얻은 경험치
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="number"
            id="baseExp"
            value={baseExp}
            onChange={(e) => handleLevelChange(e, setBaseExp)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCalculate}
        >
          계산하기
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">계산 결과</h2>
          {result.totalExp != null && (
            <p>총 경험치: {result.totalExp.toFixed(2)}</p>
          )}
          {result.partyExpShare != null && (
            <p>파티원이 얻은 경험치: {result.partyExpShare.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
