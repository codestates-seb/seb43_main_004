#!/bin/bash
# 빌드 파일의 이름이 콘텐츠와 다르다면 다음 줄의 .jar 파일 이름을 수정하시기 바랍니다.
BUILD_JAR=$(ls /home/ec2-user/action/server/wrieating/build/libs/wrieating-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)

# 환경 변수 로드
source ~/.bash_profile

# 환경변수 설정
export profile=deploy
export PATH=$PATH:/home/ec2-user/tools/gradle-7.3.3/bin
export JWT_SECRET_KEY=${JWT_SECRET_KEY}
export AWS_RDS_PASSWORD=${AWS_RDS_PASSWORD}
export AWS_RDS_URL=${AWS_RDS_URL}

# 빌드 디렉토리로 이동
cd /home/ec2-user/action/server/wrieating/

echo "> 현재 시간: $(date)" >> /home/ec2-user/action/deploy.log

echo "> build 파일명: $JAR_NAME" >> /home/ec2-user/action/deploy.log

echo "> build 파일 복사" >> /home/ec2-user/action/deploy.log
DEPLOY_PATH=/home/ec2-user/action/server/wrieating/
cp $BUILD_JAR $DEPLOY_PATH

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


DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
echo "> DEPLOY_JAR 배포"    >> /home/ec2-user/action/deploy.log
sudo nohup java -jar $DEPLOY_JAR >> /home/ec2-user/action/deploy.log 2>/home/ec2-user/action/deploy_err.log &

echo "> 배포가 완료되었습니다." >> /home/ec2-user/action/deploy.log
