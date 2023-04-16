#!/bin/bash

docker login  -u admin -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong001.com/

if [ "${EVN}" = "pre" ];then
    docker tag pre-learn-web:${VERSION}-${BUILD_ID} docker.biyong001.com/pre/learn-web:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/pre/learn-web:${VERSION}-${BUILD_ID}
else
    docker tag learn-web:${VERSION}-${BUILD_ID} docker.biyong001.com/learn/learn-web:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/learn/learn-web:${VERSION}-${BUILD_ID}
fi