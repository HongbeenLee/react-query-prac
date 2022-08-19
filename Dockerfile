# 위에서부터 Layer0,1,2...
# 빈번히 변경되는 파일일수록 아래에 위치하도록 작성

# 기본적으로 리눅스의 퓨어 baseImage
# node에서 만든 이미지를 사용하면 편하다. alpine(알파인)은 최소한의 리눅스버전을 의미함.
FROM node:alpine

# 디렉토리 지정
WORKDIR /app

# 의존성 설치를 위해 package.json, yarn.lock 복사
COPY ./package*.json .
COPY yarn.lock .

# 의존성 설치
RUN yarn install --production

# 필요한 모든 파일 복사
COPY . .

# ENV NODE_OPTIONS=--openssl-legacy-provider
# next.js 앱 빌드
RUN yarn run build

# 컨테이너 포트 설정
EXPOSE 3000

# USER root

# 애플리케이션 실행
CMD ["yarn", "run", "start"]