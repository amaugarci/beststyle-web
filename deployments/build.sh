#!/bin/bash

ls 
pwd
npm install 

if [ "${EVN}" = "pre" ];then
    echo "pre"
    cp -f ./.env_pre ./.env
    npm run build
else
    echo "pro"
    # cp -f ./site/${SITE}/.env.production ./.env.production
    # cat ./.env.production
    # cp -f ./site/${SITE}/index.js ./src/router
    # cat ./src/router/index.js
    cp -f ./.env_pro ./.env
    npm run build
fi