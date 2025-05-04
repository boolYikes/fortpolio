#!/bin/bash

VOL_NAME="jenkins-home"
CONT_NAME="jenkins"

docker volume inspect "$VOL_NAME" > /dev/null 2>&1 \
    && echo "Volume '$VOL_NAME' already exists." \
    || (docker volume create "$VOL_NAME" && echo "Volume '$VOL_NAME' created.")

sudo chmod 666 /var/run/docker.sock

if docker ps -a --format '{{.Names}}' | grep -qw "$CONT_NAME"; then
    echo "Container '$CONT_NAME' exists. Removing..."
    docker rm -f "$CONT_NAME"
fi

echo "Starting Jenkins..."
docker run -d --name jenkins \
    -p 8081:8080 -p 50000:50000 \
    -v "$VOL_NAME":/var/jenkins_home \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --network deeverse_proxy \
    --restart=on-failure \
    jenkins/jenkins:lts-jdk17