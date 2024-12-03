# Emotion Restaurant Recommend System
감정 인식 기반 맛집 추천 시스템

## 소개
Emotion Restaurant Recommend System(ERS)는

**KoBERT 모델**과 **CBF NCF 알고리즘**을 활용하여,

감정 텍스트 인식을 기반으로, CBF와 NCF로 각 감정에 맞는 위치 기반 맛집을 추천하는 서비스입니다.

이 프로젝트는 20년도때 학교에 코로나로 학교에 오지 못해 슬펐던 기억과,

그로인해 주변의 맛집을 모르는 경우 있어 이경우에 어디에 가야되지? 하는 생각으로 프로젝트를 진행하게 되었습니다.

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

## 프로젝트 구조
- 프론트엔드
  - 웹 서비스 : React 사용 
  - 모바일 어플리케이션 : React 사용 (고민중)

- 백엔드
  - 서버 프레임워크 : Flask 혹은 FastAPI 사용
  - 통신 방식 : 미정

- 머신러닝
    - 사용 모델 : KoBERT(NLP)
    - 추천 시스템 : CBF, NCF ( 추천 시스템 )
  기능 : 감정 분석 , 감정에 따른 음식 추천, 음식에 따른 맛집 추천

- Etc
  - 사용 API : kakao Map
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
  - 역할 : 캡스톤디자인 팀장, 백엔드 개발
  
- 이름: 구승율
  - 역할: 백엔드 개발, 서버 구축, 

- 이름: 이인호
  - 역할: 프론트 개발, API 활용 개발

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
