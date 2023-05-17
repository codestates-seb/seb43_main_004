#!/bin/bash

# 빌드 디렉토리로 이동
cd /home/ec2-user/action/server/wrieating/

echo "> 현재 시간: $(/usr/bin/date)" >> /home/ec2-user/action/deploy.log

echo "> 프로젝트 빌드 시작" >> /home/ec2-user/action/deploy.log

# Gradle Wrapper로 프로젝트 빌드
./gradlew clean build >> /home/ec2-user/action/deploy.log 2>&1

if [ $? -ne 0 ]; then
  echo "> 빌드에 실패했습니다. 배포를 종료합니다." >> /home/ec2-user/action/deploy.log
  exit 1
fi

echo "> build 파일 복사" >> /home/ec2-user/action/deploy.log
DEPLOY_PATH=/home/ec2-user/action/server/wrieating/
cp build/libs/*.jar $DEPLOY_PATH

# 빌드된 JAR 파일 확인
BUILD_JAR=$(ls $DEPLOY_PATH*.jar)
JAR_NAME=$(basename $BUILD_JAR)

echo "> build 파일명: $JAR_NAME" >> /home/ec2-user/action/deploy.log

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /home/ec2-user/action/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ec2-user/action/deploy.log
else
  echo "> kill -9 $CURRENT_PID" >> /home/ec2-user/action/deploy.log
  sudo kill -9 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR="$DEPLOY_PATH$JAR_NAME"
echo "> DEPLOY_JAR 배포"    >> /home/ec2-user/action/deploy.log
nohup java -jar "$DEPLOY_JAR" >> /home/ec2-user/action/deploy
