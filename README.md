# Emotion Restaurant Recommend System
감정 인식 기반 맛집 추천 시스템

## 소개
Emotion Restaurant Recommend System(ERS)는

**KoBERT 모델**과 **CBF NCF 알고리즘**을 활용하여,

감정 텍스트 인식을 기반으로, CBF와 NCF로 각 감정에 맞는 위치 기반 맛집을 추천하는 서비스입니다.

현대인은 수많은 외식 선택지 앞에서 시간과 에너지를 소비하며, 감정 상태에 따라 만족할 수 있는 음식을 선택하기 어려운 상황에 놓여 있다. 본 프로젝트는 사용자의 감정을 분석하고, 이를 바탕으로 감정에 맞는 음식을 추천함으로써 음식 선택 과정을 효율화하고자 한다. 또한, 사용자에게 감정에 맞는 음식점 정보를 제공하여 시간 절약과 심리적 만족도를 높이고자 한다.
이 프로젝트는 2020년 코로나19로 인해 학교에 오지 못했던 시기의 경험에서 시작되었다. 당시 주변 맛집에 대한 정보를 알지 못해 어디로 가야 할지 고민했던 경험을 바탕으로, 감정과 연계된 맛집 추천 시스템을 개발하게 되었다.

## 주요 기능
- 텍스트로 감정 인식을 하여 해당 감정에 맞는 음식과 해당 음식 카테고리에 맞는 맛집을 실시간 위치 기반으로 맛집 추천

1. KoBERT로 감정 데이터를 수집하여, 텍스트를 분석하여 해당 텍스트의 감정을 인식합니다.
2. 추출된 감정을 통하여, 감정에 따른 감정 완화 음식을 추천합니다 (CBF)
3. 음식에 따른 카카오API를 활용하여, 위치에 따른 맛집을 추천합니다. (NCF)
4. GPS 데이터를 수집하여 군중의 위치와 이동 패턴을 실시간으로 분석합니다.

- 검색 창처럼, 자신의 감정을 입력합니다.
- 감정을 기반으로 감정 안화를 위한 음식을 추천하며 자동적으로
- 해당 음식에 관한 맛집을 자신의 위치를 기반으로 추천합니다.
- 사용자 인터페이스(UI/UX)

## 프로젝트 파일 구조
```
📦backend
 ┣ 📂model
 ┃ ┣ 📜food_emotion.xlsx
 ┃ ┣ 📜model_statedict.pkl
 ┃ ┣ 📜ncf_model_with_data.pkl
 ┃ ┗ 📜recommendation_system.pkl
 ┃ ┣ 📂__pycache__
 ┃ ┃ ┗ 📜ncf_recommend.cpython-37.pyc
 ┃ ┣ 📜api_request.py
 ┃ ┣ 📜ncf_recommend.py
 ┣ 📂__pycache__
 ┃ ┣ 📜cbf.cpython-37.pyc
 ┃ ┣ 📜inference_nsmc.cpython-312.pyc
 ┃ ┣ 📜main.cpython-312.pyc
 ┃ ┣ 📜main.cpython-37.pyc
 ┃ ┣ 📜model.cpython-312.pyc
 ┃ ┣ 📜model.cpython-37.pyc
 ┃ ┗ 📜ncf_recommend.cpython-37.pyc
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜cbf.py
 ┣ 📜index.html
 ┣ 📜main.py
 ┣ 📜model.py
 ┣ 📜requirements.txt
 ┣ 📜test.py
 ┗ 📜train_data.csv
📦frontend
 ┣ 📂public
 ┃ ┣ 📜angry.png
 ┃ ┣ 📜chicken.png
 ┃ ┣ 📜cool.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜gg.png
 ┃ ┣ 📜happy.png
 ┃ ┣ 📜index.html
 ┃ ┣ 📜laugh.png
 ┃ ┣ 📜leave.png
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo512.png
 ┃ ┣ 📜manifest.json
 ┃ ┣ 📜robots.txt
 ┃ ┣ 📜sad.png
 ┃ ┣ 📜scare.png
 ┃ ┣ 📜sick.png
 ┃ ┣ 📜smiling.png
 ┃ ┣ 📜suprised.png
 ┃ ┣ 📜title.svg
 ┃ ┣ 📜wink.png
 ┃ ┣ 📜되돌아가기.png
 ┃ ┗ 📜새로고침.png
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Home.css
 ┃ ┃ ┣ 📜Home.js
 ┃ ┃ ┣ 📜LastPage.css
 ┃ ┃ ┣ 📜LastPage.js
 ┃ ┃ ┣ 📜NextPage.css
 ┃ ┃ ┗ 📜NextPage.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┗ 📜setupTests.js
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
 ```

## 프로젝트 구조도

![image](https://github.com/user-attachments/assets/e6d0d913-508b-4e9a-87dc-a5e008b03434)

## 프로젝트 구조
- 프론트엔드
  - 웹 서비스 : React
  - 모바일 어플리케이션 : React 형식으로 PC/모바일 환경 동적으로 고려하여 구축 -> ReactNative 사용 및 연동 계획

- 백엔드
  - 서버 프레임워크 : FastAPI
  - 통신 방식 : RESTAPI

- 머신러닝
    - 사용 모델 : KoBERT(NLP)
    - 추천 시스템 : CBF, NCF ( 추천 시스템 )
  기능 : 감정 분석 , 감정에 따른 음식 추천, 음식에 따른 맛집 추천

- Etc
  - 사용 API : KaKaoMAP API With Web
  - 클라우드 인프라 : Colab, AWS(혹은 GCP, OCI)

## 깃허브 기여 방법
**1. 저장소 포크**
  이 저장소를 포크합니다.
  
**2. 브랜치 생성**
  새로운 기능이나 버그 수정을 위한 브랜치를 생성합니다.
  
**3. 변경 사항 커밋**
  기능을 추가하거나 버그를 수정한 후 커밋합니다.
  
**4. 푸시 및 Pull Request 생성**
  변경 사항을 푸시하고 Pull Request를 생성합니다.
  
**5. 리뷰 및 병합**
  리뷰 후 프로젝트에 병합됩니다.
  
**주의 : master 브랜치에 바로 병합요청 하지 말것 **


## 팀 구성
- 이름 : 김영우
  - 역할 : 캡스톤디자인 팀장, 프론트 엔드
  
- 이름: 구승율
  - 역할: 백엔드 개발, 서버 구축,  API활용 및 개발, API연동, 데이터셋 크롤링 및 전처리

- 이름: 이인호
  - 역할: 백엔드 개발, API 활용 및 개발

공통 : 머신러닝 모델 개발 및 , 데이터 수집 및 분석

## 연락처
- 이메일: role0606@naver.com
- 이슈 트래커: GitHub Issues

# Reference
- TensorFlow 공식 문서: https://www.tensorflow.org/
- FastAPI 공식 문서: https://fastapi.tiangolo.com/

- KoBERT 공식 모델 : https://github.com/SKTBrain/KoBert/

- Florian Strub 외 2인. 「Hybrid Recommender System based on Autoencoders」. 2016
- Xiangana He 외 5인. 「Neural Collaborative Filtering」. 2017
- Maxim Naumov 외 23인. 「Deep Learning Recommendation Model for Personalization and Recommendation Systems」. 2019
