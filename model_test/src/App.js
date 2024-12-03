// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // 첫 페이지 컴포넌트
import NextPage from "./components/NextPage"; // 다음 페이지 컴포넌트
import LastPage from "./components/LastPage"; // 마지막 페이지 컴포넌트
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesomeIcon 임포트
import { faUser } from '@fortawesome/free-solid-svg-icons'; // 사람 아이콘 임포트
import "./App.css"; // App.css 스타일 불러오기

function App() {
  const [showServiceIntro, setShowServiceIntro] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleServiceIntro = () => {
    setShowServiceIntro(!showServiceIntro);
  };

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  // 개발자 정보 배열
  const developers = [
    {
      name: "구승율",
      role: "PM / 백엔드 개발자",
      email: "role0606@naver.com",
      contact: "010-6663-9528"
    },
    {
      name: "이인호",
      role: "백엔드 개발자",
      email: "younghee@example.com",
      contact: "010-2345-6789"
    },
    {
      name: "김영우",
      role: "프론트엔드 개발자",
      email: "youngsu@example.com",
      contact: "010-3456-7890"
    }
  ];

  return (
    <Router>
      <div className="App">
        {/* 공통 네비게이션 바 */}
        <div className="black-nav">
          <div className="nav-item" onClick={toggleServiceIntro}>
            서비스 소개
          </div>
          <div className="nav-item" onClick={toggleContact}>
            Contact
          </div>
        </div>

        {/* 사이드바 오버레이 */}
        {(showServiceIntro || showContact) && (
          <div
            className="overlay"
            onClick={() => {
              setShowServiceIntro(false);
              setShowContact(false);
            }}
          ></div>
        )}

        {/* 서비스 소개 사이드바 */}
        <div className={`sidebar left ${showServiceIntro ? "show" : ""}`}>
          <div className="sidebar-content">
            <button className="close-button" onClick={toggleServiceIntro}>
              &times;
            </button>
            <h2>서비스 소개</h2>
            <p>
              저희 서비스는 감정에 맞는 음식을 추천해주는 서비스입니다.
              <br />
              오늘의 기분을 알려주시면 저희가 맞춤형 추천을 해드려요!
            </p>
          </div>
        </div>

        {/* Contact 사이드바 */}
        <div className={`sidebar right ${showContact ? "show" : ""}`}>
          <div className="sidebar-content">
            <button className="close-button" onClick={toggleContact}>
              &times;
            </button>
            <h2>Contact</h2>
            <div className="developer-list">
              {developers.map((dev, index) => (
                <div key={index} className="developer-card">
                  <FontAwesomeIcon icon={faUser} className="developer-icon" />
                  <div className="developer-info">
                    <p><strong>{dev.name}</strong></p>
                    <p>{dev.role}</p>
                    <p>이메일: {dev.email}</p>
                    <p>연락처: {dev.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 라우팅 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/next" element={<NextPage />} />
          <Route path="/last" element={<LastPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;