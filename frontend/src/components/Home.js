import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [inputEmotion, setInputEmotion] = useState(""); // 감정 입력 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  const handleSearch = () => {
    if (inputEmotion.trim() === "") {
      alert("감정을 입력해주세요!"); // 빈 입력 방지
      return;
    }
    navigate("/next", { state: { emotion: inputEmotion } }); // 입력 감정 전달
  };

  const handleEmotionClick = (emotion) => {
    navigate("/next", { state: { emotion } }); // 해당 감정을 바로 전달
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 키를 누르면 검색 동작 실행
    }
  };

  return (
    <div className="App-header">
      {/* 낙엽 이미지 */}
      <img
        src="/leave.png"
        alt="낙엽"
        className="leaf large"
        style={{ top: "10%", left: "10%" }}
      />
      <img
        src="/leave.png"
        alt="낙엽"
        className="leaf small"
        style={{ top: "20%", right: "20%" }}
      />
      <img
        src="/leave.png"
        alt="낙엽"
        className="leaf large"
        style={{ bottom: "15%", left: "25%" }}
      />
      <img
        src="/leave.png"
        alt="낙엽"
        className="leaf small"
        style={{ bottom: "20%", right: "30%" }}
      />

      {/* 헤더 제목 대신 이미지 삽입 */}
      <div className="header-logo">
        <img
          src="/title.svg" // 업로드한 이미지 경로
          alt="와구와구 로고"
          className="header-image"
        />
      </div>
      <p>
        오늘의 감정을 입력해주시면
        <br />
        저희가 감정에 맞는 음식을 추천해드릴게요!
      </p>

      {/* 감정 입력란 */}
      <div className="emotion-input">
        <input
          type="text"
          placeholder="오늘의 감정을 입력해주세요"
          value={inputEmotion}
          onChange={(e) => setInputEmotion(e.target.value)} // 입력 값 업데이트
          onKeyDown={handleKeyPress} // Enter 키 입력 처리
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {/* 감정 버튼 (선택 가능) */}
      <div className="emotion-tags">
        <button onClick={() => handleEmotionClick("나 오늘 너무 화났어!")}>화나요</button>
        <button onClick={() => handleEmotionClick("나 오늘 너무 행복해")}>행복해요</button>
        <button onClick={() => handleEmotionClick("나 오늘 너무 슬퍼 ㅠㅠ")}>슬퍼요</button>
        <button onClick={() => handleEmotionClick("나 오늘 너무 놀랐다!!!")}>놀랐어요</button>
        <button onClick={() => handleEmotionClick("하늘은 푸르다")}>그저그래요</button>
      </div>
    </div>
  );
}

export default Home;
