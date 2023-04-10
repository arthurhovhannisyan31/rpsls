#!/bin/bash

yarn watch &
P1=$!
yarn nodemon:dev &
P2=$!
wait $P1 $P2
