#!/bin/bash

docker login  -u bourse -p bourseOcRqW9852 https://docker.flct.io/

if [ "${EVN}" = "pre" ];then
    docker tag pre-learn-web:${VERSION}-${BUILD_ID} docker.flct.io/bourse/pre-learn-web:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/bourse/pre-learn-web:${VERSION}-${BUILD_ID}
else
    docker tag learn-web:${VERSION}-${BUILD_ID} docker.flct.io/bourse/learn-web:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/bourse/learn-web:${VERSION}-${BUILD_ID}
fi