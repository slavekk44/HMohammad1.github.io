#!/bin/sh
FOLDER="../../"
SERVER_ENV=devserver

screen -dmS scrapmap-main /bin/bash -c "cd \"$FOLDER\"; npm run $SERVER_ENV"
