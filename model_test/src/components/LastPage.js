// LastPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LastPage.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function LastPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);

    const selectedFoodCategory = location.state?.foodCategory || "전체";

    // 카카오 지도 API 스크립트를 동적으로 로드하는 함수
    const loadKakaoMapScript = () => {
        return new Promise((resolve, reject) => {
            if (window.kakao && window.kakao.maps) {
                // 이미 스크립트가 로드된 경우
                resolve(window.kakao);
                return;
            }

            // 스크립트 중복 로드 방지
            const existingScript = document.getElementById("kakao-map-script");
            if (existingScript) {
                existingScript.onload = () => {
                    window.kakao.maps.load(() => {
                        resolve(window.kakao);
                    });
                };
                return;
            }

            const script = document.createElement("script");
            script.id = "kakao-map-script";
            script.src =
                "https://dapi.kakao.com/v2/maps/sdk.js?appkey=1a861a21e933ebb79b537a5418598c75&autoload=false&libraries=services";
            script.async = true;

            script.onload = () => {
                window.kakao.maps.load(() => {
                    resolve(window.kakao);
                });
            };

            script.onerror = (error) => reject(error);
            document.head.appendChild(script);
        });
    };

    // 현재 위치 정보를 가져오는 useEffect
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error(
                        "현재 위치를 가져올 수 없어 기본 위치를 사용합니다.",
                        error
                    );
                    // 기본 위치를 대구대 좌표로 설정
                    setUserLocation({
                        latitude: 35.889806567182,
                        longitude: 128.85937035234,
                    });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation을 지원하지 않는 브라우저입니다.");
            // 기본 위치를 대구대 좌표로 설정
            setUserLocation({
                latitude: 35.889806567182,
                longitude: 128.85937035234,
            });
        }
    }, []);

    // 추천 데이터를 가져오는 useEffect
    useEffect(() => {
        if (!selectedFoodCategory) return;

        const fetchRecommendations = async () => {
            try {
                const response = await fetch("http://localhost:8000/recommend-ncf", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ food_category: selectedFoodCategory }),
                });
                const data = await response.json();

                if (data.recommendations) {
                    setRecommendations(data.recommendations);
                } else {
                    console.error("추천 데이터를 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [selectedFoodCategory]);

    // 카카오 지도 로드 및 초기화 useEffect
    useEffect(() => {
        if (!userLocation) return;

        loadKakaoMapScript()
            .then((kakao) => {
                const container = document.getElementById("map");
                const options = {
                    center: new kakao.maps.LatLng(
                        userLocation.latitude,
                        userLocation.longitude
                    ),
                    level: 5,
                };
                const newMap = new kakao.maps.Map(container, options);
                setMap(newMap);

                // 현재 위치 마커 추가
                const userMarkerPosition = new kakao.maps.LatLng(
                    userLocation.latitude,
                    userLocation.longitude
                );
                const userMarker = new kakao.maps.Marker({
                    position: userMarkerPosition,
                    title: "현재 위치",
                    clickable: true,
                });
                userMarker.setMap(newMap);

                // 마커 상태 업데이트
                setMarkers([userMarker]);
            })
            .catch((error) => {
                console.error(
                    "카카오 지도 스크립트를 로드하는 중 오류가 발생했습니다.",
                    error
                );
            });
    }, [userLocation]);

    // 음식점 클릭 시 처리 함수
    const handleRestaurantClick = (restaurant) => {
        if (map && restaurant.address) {
            try {
                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(restaurant.address, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const latitude = parseFloat(result[0].y);
                        const longitude = parseFloat(result[0].x);
                        const restaurantPosition = new window.kakao.maps.LatLng(
                            latitude,
                            longitude
                        );

                        // 지도 중심을 클릭된 맛집 위치로 부드럽게 이동
                        map.panTo(restaurantPosition);

                        // 이전 마커 제거
                        markers.forEach((marker) => marker.setMap(null));

                        // 새로운 마커 추가
                        const marker = new window.kakao.maps.Marker({
                            position: restaurantPosition,
                            title: restaurant.name,
                            clickable: true,
                        });
                        marker.setMap(map);

                        // 기존 인포윈도우 닫기
                        if (infoWindow) {
                            infoWindow.close();
                        }

                        // 마커 클릭 시 인포윈도우 표시
                        const newInfoWindow = new window.kakao.maps.InfoWindow({
                            content: `<div style="padding:10px;"><strong>${restaurant.name}</strong><br>${restaurant.address}</div>`,
                        });

                        window.kakao.maps.event.addListener(marker, "click", () => {
                            // 기존 인포윈도우 닫기
                            if (infoWindow) {
                                infoWindow.close();
                            }
                            newInfoWindow.open(map, marker);
                            setInfoWindow(newInfoWindow);
                        });

                        // 바로 인포윈도우 열기
                        newInfoWindow.open(map, marker);
                        setInfoWindow(newInfoWindow);

                        // 마커 상태 업데이트
                        setMarkers([marker]);

                        // 현재 위치 마커 추가
                        const userMarkerPosition = new window.kakao.maps.LatLng(
                            userLocation.latitude,
                            userLocation.longitude
                        );
                        const userMarker = new window.kakao.maps.Marker({
                            position: userMarkerPosition,
                            title: "현재 위치",
                            clickable: true,
                        });
                        userMarker.setMap(map);

                        setMarkers((prevMarkers) => [...prevMarkers, userMarker]);
                    } else {
                        console.error("주소 변환 실패:", restaurant.address);
                    }
                });
            } catch (error) {
                console.error("Geocoder를 사용 중 오류 발생:", error);
            }
        }
    };

    // 평점을 별 아이콘과 숫자로 변환하는 함수
    const renderStars = (rating) => {
        const stars = [];
        let fullStars = Math.floor(rating);
        const decimalPart = rating - fullStars;
        let halfStar = false;

        if (decimalPart >= 0.75) {
            fullStars += 1;
        } else if (decimalPart >= 0.25) {
            halfStar = true;
        }

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="star full-star" />);
        }

        if (halfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star half-star" />);
        }

        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="star empty-star" />);
        }

        return (
            <div className="star-rating">
                {stars}
                <span className="rating-number">{rating.toFixed(1)}</span>
            </div>
        );
    };

    // 음식점 소개 메시지를 생성하는 함수
    const generateRestaurantDescription = (restaurant) => {
        const messages = [
            `${restaurant.name}은(는) 높은 평점을 받은 인기 맛집입니다.`,
            `${restaurant.name}에서 특별한 식사를 즐겨보세요!`,
            `많은 사람들이 추천하는 ${restaurant.name}을(를) 방문해보세요.`,
        ];
        return messages[restaurant.restaurant_id % messages.length];
    };

    // 홈으로 가는 함수
    const handleHome = () => {
        navigate("/");
    };

    // 현재 위치로 돌아가는 함수
    const handleCurrentLocation = () => {
        if (map && userLocation) {
            const userPosition = new window.kakao.maps.LatLng(
                userLocation.latitude,
                userLocation.longitude
            );
            map.panTo(userPosition);

            // 이전 마커 제거
            markers.forEach((marker) => marker.setMap(null));

            // 현재 위치 마커 추가
            const userMarker = new window.kakao.maps.Marker({
                position: userPosition,
                title: "현재 위치",
                clickable: true,
            });
            userMarker.setMap(map);

            setMarkers([userMarker]);

            // 기존 인포윈도우 닫기
            if (infoWindow) {
                infoWindow.close();
            }
        }
    };

    // 새로고침 함수
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="lastpage-container">
            {loading ? (
                <h2>로딩 중...</h2>
            ) : (
                <>
                    <div className="content-container">
                        <div className="recommendation-list">
                            {recommendations.map((restaurant, index) => (
                                <div
                                    key={index}
                                    className="restaurant-card"
                                    onClick={() => handleRestaurantClick(restaurant)}
                                >
                                    <h2 className="restaurant-name">{restaurant.name}</h2>
                                    {renderStars(restaurant.rating)}
                                    <p className="restaurant-address">{restaurant.address}</p>
                                    <p className="restaurant-description">
                                        {generateRestaurantDescription(restaurant)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* 카카오 지도를 표시할 영역 */}
                        <div className="map-container-wrapper">
                            <div id="map" className="map-container"></div>
                            <div className="map-buttons">
                                <button
                                    className="current-location-button"
                                    onClick={handleCurrentLocation}
                                >
                                    현위치로 돌아가기
                                </button>
                                <button className="refresh-button" onClick={handleRefresh}>
                                    새로고침
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="home-button" onClick={handleHome}>
                        홈으로
                    </button>
                </>
            )}
        </div>
    );
}

export default LastPage;
