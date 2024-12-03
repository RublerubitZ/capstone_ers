// NextPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NextPage.css";

// 이미지 경로를 감정과 매핑
const emotionImages = {
  행복: "/laugh.png",
  분노: "/angry.png",
  슬픔: "/sad.png",
  놀람: "/suprised.png",
  중립: "/gg.png", // 기본 중립 이미지
};

// 감정 가중치 설정
const emotionWeights = {
  행복: 1,
  분노: -1,
  슬픔: -1,
  놀람: 0,
  중립: 0,
};

// 종합 감정 지수 계산 함수
function calculateOverallMoodIndex(scores) {
  const totalScore = Object.values(scores).reduce((sum, value) => sum + value, 0);

  if (totalScore === 0) return 0;

  let weightedScore = 0;

  for (const [emotion, score] of Object.entries(scores)) {
    const weight = emotionWeights[emotion] || 0;
    weightedScore += (score / totalScore) * weight;
  }

  // weightedScore는 -1에서 +1 사이의 값
  // 이를 -5에서 +5 사이로 변환
  const moodIndex = weightedScore * 5;

  // 소수점 첫째 자리까지 반올림
  return Math.round(moodIndex * 10) / 10;
}

// 종합 감정 지수에 따른 메시지 함수
function getOverallMoodMessage(index) {
  if (index >= 4) return "아주 긍정적인 상태입니다!";
  if (index >= 2) return "긍정적인 상태입니다.";
  if (index > 0) return "약간 긍정적인 상태입니다.";
  if (index === 0 || index === -0) return "중립적인 상태입니다.";
  if (index <= -4) return "아주 부정적인 상태입니다. 힘내세요!";
  if (index <= -2) return "부정적인 상태입니다.";
  return "약간 부정적인 상태입니다.";
}

// 프로그레스 바에 표시할 퍼센트 계산 함수
function getOverallMoodPercentage(index) {
  // -5에서 +5까지의 값을 0%에서 50%로 변환
  const percentage = (Math.abs(index) / 5) * 50;

  // 최소 퍼센트 설정 (예: 2%)
  const minPercent = 2;
  return percentage < minPercent && percentage > 0 ? minPercent : percentage;
}

function getOverallMoodColor(index) {
  if (index > 0) return "#2ecc71"; // 긍정적인 색상
  if (index < 0) return "#e74c3c"; // 부정적인 색상
  return "#95a5a6"; // 중립적인 색상
}

function getEmotionColor(emotion) {
  switch (emotion) {
    case "분노":
      return "#ff6b6b";
    case "놀람":
      return "#ffa502";
    case "슬픔":
      return "#1e90ff";
    case "중립":
      return "#95a5a6";
    case "행복":
      return "#2ecc71";
    default:
      return "#bdc3c7";
  }
}

// 위로 및 격려 메시지 함수
function getEncouragingMessage(index) {
  if (index >= 2) return "지금 이 기분을 오래도록 간직하세요!";
  if (index > 0) return "좋은 하루 보내세요!";
  if (index === 0 || index === -0) return "평온한 하루 되세요!";
  if (index <= -2) return "힘든 일이 있나요? 당신은 혼자가 아니에요.";
  return "조금만 더 힘내세요!";
}

// 감정 피드백 메시지 생성 함수
function generateEmotionFeedback(emotion) {
  switch (emotion) {
    case "행복":
      return `현재 매우 행복하신 것 같아요! 이 기분을 유지하면서 주변 사람들과 행복을 나눠보세요.`;
    case "슬픔":
      return `슬픔을 느끼고 계시는군요. 따뜻한 차 한 잔과 함께 휴식을 취해보는 건 어떨까요?`;
    case "분노":
      return `분노를 느끼고 계신 것 같아요. 깊은 호흡을 하며 마음을 진정시켜보세요.`;
    case "놀람":
      return `놀라운 일이 있으셨나요? 새로운 경험은 삶을 풍요롭게 합니다.`;
    case "중립":
      return `평온한 상태입니다. 오늘은 여유롭게 자신만의 시간을 가져보세요.`;
    default:
      return `현재 감정을 잘 파악하기 어려워요. 조금 더 자세히 말씀해주실 수 있나요?`;
  }
}

// 추천 음식과 감정 연관성 설명 함수
function generateFoodRecommendationMessage(recommendation) {
  return `${recommendation["음식이름"]}은(는) ${recommendation["감정"]}한 기분에 잘 어울리는 음식이에요. 맛있게 드시고 기분을 더욱 좋게 만들어보세요!`;
}

export default function NextPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState(""); // 감정 결과
  const [emotionScores, setEmotionScores] = useState({}); // 감정 점수
  const [overallMoodIndex, setOverallMoodIndex] = useState(0); // 종합 감정 지수
  const [recommendations, setRecommendations] = useState([]); // 추천 음식
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const inputText = location.state?.emotion || ""; // Home.js에서 전달받은 감정 입력
    if (!inputText) return;

    const fetchRecommendations = async () => {
      setLoading(true); // 로딩 상태 시작
      try {
        // 1초 딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("http://localhost:8000/predict-and-recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        });
        const data = await response.json();

        setEmotion(data.emotion.emotion); // 감정 결과 저장
        setEmotionScores(data.emotion.scores); // 감정 점수 저장

        // 종합 감정 지수 계산
        const overallIndex = calculateOverallMoodIndex(data.emotion.scores);
        setOverallMoodIndex(overallIndex); // 종합 감정 지수 저장

        setRecommendations(data.recommendations); // 추천 결과 저장
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchRecommendations();
  }, [location.state]);

  const handleReroll = () => {
    setLoading(true);
    const inputText = location.state?.emotion || "";
    if (!inputText) return;

    const fetchRecommendations = async () => {
      try {
        // 1초 딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("http://localhost:8000/predict-and-recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        });
        const data = await response.json();

        setRecommendations(data.recommendations); // 새로운 추천 결과 저장
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchRecommendations();
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="nextpage-container">
      {loading ? (
        <div className="loading-container">
          <div className="spinner">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <p className="loading-text">감정을 분석 중입니다...</p>
        </div>
      ) : (
        <div className="content-container">
          <div className="left-section">
            <h1 className="nextpage-title">오늘의 감정</h1>
            <img
              src={emotionImages[emotion] || emotionImages["중립"]}
              alt={emotion}
              className="emotion-image"
            />
            <div className="recommendation-container">
              <h2>이거 어때?</h2>
              {recommendations.map((item, index) => (
                <div key={index} className="recommendation-item">
                  <button
                    className="recommendation-button"
                    onClick={() =>
                      navigate("/last", { state: { foodCategory: item["카테고리"] } })
                    }
                  >
                    {item["음식이름"]} - {item["카테고리"]}
                  </button>
                </div>
              ))}
            </div>
            {/* 피드백 메시지 컨테이너 */}
            <div className="feedback-container">
              {/* 감정 피드백 메시지 */}
              <div className="emotion-feedback">
                <p>{generateEmotionFeedback(emotion)}</p>
              </div>
              {/* 음식 추천 메시지 */}
              {recommendations.length > 0 && (
                <div className="food-recommendation-message">
                  <p>{generateFoodRecommendationMessage(recommendations[0])}</p>
                </div>
              )}
            </div>
          </div>

          <div className="right-section">
            <h2>감정 분석 결과:</h2>
            <div className="emotion-graph">
              {Object.entries(emotionScores).map(([label, score]) => (
                <div key={label} className="emotion-bar">
                  <span className="emotion-label">{label}</span>
                  <div className="progressbar">
                    <div
                      className="progressbar-fill"
                      style={{ width: `${score}%`, backgroundColor: getEmotionColor(label) }}
                    ></div>
                  </div>
                  <span className="progressbar-text">{score.toFixed(1)}%</span>
                </div>
              ))}
            </div>
            {/* 간격 추가 */}
            <div className="spacer"></div>
            <h2>종합 감정 지수:</h2>
            <div className="overall-mood-index">
              <div className="mood-index-display">
                <span
                  className={`mood-index-number ${
                    overallMoodIndex > 0
                      ? "positive"
                      : overallMoodIndex < 0
                      ? "negative"
                      : "neutral"
                  }`}
                >
                  {overallMoodIndex}
                </span>
                <span className="mood-index-message">
                  {getOverallMoodMessage(overallMoodIndex)}
                </span>
              </div>
              <div className="overall-progressbar">
                <div className="progressbar">
                  <div className="progressbar-center-line"></div>
                  <div
                    className={`progressbar-fill ${
                      overallMoodIndex > 0
                        ? "positive"
                        : overallMoodIndex < 0
                        ? "negative"
                        : "neutral"
                    }`}
                    style={{
                      width: `${getOverallMoodPercentage(overallMoodIndex)}%`,
                      backgroundColor: getOverallMoodColor(overallMoodIndex),
                      left: overallMoodIndex >= 0 ? "50%" : undefined,
                      right: overallMoodIndex < 0 ? "50%" : undefined,
                    }}
                  ></div>
                </div>
              </div>
              {/* 위로 및 격려 메시지 */}
              <div className="encouraging-message">
                <p>{getEncouragingMessage(overallMoodIndex)}</p>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button className="icon-button" onClick={handleReroll}>
              <img src="/새로고침.png" alt="리롤" />
            </button>
            <button className="icon-button" onClick={handleBack}>
              <img src="/되돌아가기.png" alt="되돌아가기" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}