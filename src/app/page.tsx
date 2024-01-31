"use client";
import React, { useEffect, useState } from "react";
import ExpEstimateCalculator from "./ExpEstimateCalculator";

export default function Home() {
  const [myLevel, setMyLevel] = useState<string>(""); // 내 레벫
  const [partyLevel, setPartyLevel] = useState<string>(""); // 파티원 레벨
  const [baseExp, setBaseExp] = useState<string>(""); // 내가 적은 경험치
  const [startExp, setStartExp] = useState<string>("");
  const [endExp, setEndExp] = useState<string>("");
  const [result, setResult] = useState<{
    myExp?: string;
    totalExp?: string;
    partyExpShare?: string;
  }>({});

  // 필드 표시 상태
  const [showExpFields, setShowExpFields] = useState<boolean>(false);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 값 불러오기
  useEffect(() => {
    const savedMyLevel = localStorage.getItem("myLevel");
    const savedPartyLevel = localStorage.getItem("partyLevel");
    const savedShowExpFields = localStorage.getItem("showExpFields");
    setShowExpFields(savedShowExpFields === "true");
    if (savedMyLevel) setMyLevel(savedMyLevel);
    if (savedPartyLevel) setPartyLevel(savedPartyLevel);
  }, []);

  // myLevel이나 partyLevel이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("myLevel", myLevel);
    localStorage.setItem("partyLevel", partyLevel);
  }, [myLevel, partyLevel]);

  function calculateExpShare(
    myLevel: number,
    partyLevel: number,
    myExp: number
  ): { totalExp: number; myExp: number; partyExpShare: number } {
    const totalLevel = myLevel + partyLevel;
    const myLevelRatio = myLevel / totalLevel;
    const partyLevelRatio = partyLevel / totalLevel;

    // 사냥한 사람의 경험치 비율로 총 경험치 계산
    const totalExp = myExp / (0.2 + 0.8 * myLevelRatio);

    // 쩔받는 사람의 경험치 계산
    const partyExpShare = totalExp * 0.8 * partyLevelRatio;

    return { totalExp, myExp, partyExpShare };
  }

  // 필드 표시 상태 토글 함수
  const toggleExpFields = () => {
    const newShowExpFields = !showExpFields;
    setShowExpFields(newShowExpFields);
    localStorage.setItem("showExpFields", newShowExpFields.toString());
  };

  const handleCalculate = () => {
    const myLevelNum = parseInt(myLevel); // String을 Number로 변환
    const partyLevelNum = parseInt(partyLevel); // String을 Number로 변환
    const baseExpNum = parseInt(baseExp); // String을 Number로 변환

    if (!isNaN(myLevelNum) && !isNaN(partyLevelNum) && !isNaN(baseExpNum)) {
      const { totalExp, myExp, partyExpShare } = calculateExpShare(
        myLevelNum,
        partyLevelNum,
        baseExpNum
      );
      setResult({
        totalExp: totalExp.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        myExp: myExp.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        partyExpShare: partyExpShare.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      });
    } else {
      setResult({});
    }
  };

  // 시작 및 종료 경험치를 계산하여 baseExp 설정
  const calculateAndSetBaseExp = () => {
    const startExpNum = parseInt(startExp);
    const endExpNum = parseInt(endExp);
    if (!isNaN(startExpNum) && !isNaN(endExpNum)) {
      const expDifference = endExpNum - startExpNum;
      if (expDifference < 0) {
        alert("종료 경험치가 시작 경험치보다 작습니다.");
        return;
      }
      setBaseExp(expDifference.toString());
    }
  };

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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {/* 견적 계산기 카드 */}
      <ExpEstimateCalculator />
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        {/* 쩔 경험치 계산기 카드 */}
        <h1 className="text-xl font-bold mx-4 my-4 text-center">
          쩔 경험치 계산기
        </h1>
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
        {/* 토글 버튼 */}
        <div className="mb-2 flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleExpFields}
          >
            {showExpFields ? "숨기기" : "경험치 차이 계산"}
          </button>
        </div>
        {/* 시작 경험치 입력 필드 */}
        {showExpFields && (
          <>
            <div className="mb-2">
              <label
                htmlFor="startExp"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                내 시작 경험치
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={startExp}
                onChange={(e) => setStartExp(e.target.value)}
              />
            </div>

            {/* 종료 경험치 입력 필드 */}
            <div className="mb-2">
              <label
                htmlFor="endExp"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                내 종료 경험치
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={endExp}
                onChange={(e) => setEndExp(e.target.value)}
              />
            </div>

            {/* 계산 버튼 */}
            <div className="my-4 flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  calculateAndSetBaseExp();
                }}
              >
                경험치 차이 계산
              </button>
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="baseExp"
          >
            내가 얻은 경험치
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="text"
            inputMode="numeric"
            id="baseExp"
            value={baseExp}
            onChange={(e) => handleLevelChange(e, setBaseExp)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCalculate}
          >
            계산하기
          </button>
        </div>
        <div className="mt-4 text-black">
          <h2 className="text-lg font-semibold text-center ">계산 결과</h2>
          {result.totalExp != null && <p>총 경험치: {result.totalExp}</p>}
          {result.myExp != null && <p>내가 얻은 경험치: {result.myExp}</p>}
          {result.partyExpShare != null && (
            <p>파티원이 얻은 경험치: {result.partyExpShare}</p>
          )}
        </div>
      </div>
    </div>
  );
}
