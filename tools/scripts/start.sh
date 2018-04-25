#!/usr/bin/env bash

rm -rf .git

git init

yarn install || npm install
