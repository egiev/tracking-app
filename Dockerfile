FROM ubuntu:20.04

RUN apt-get update --fix-missing && \
    apt-get -y upgrade

RUN apt-get -y install sudo && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
    apt-get install nodejs


