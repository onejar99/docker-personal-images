#!/bin/bash

cd /gitbook
CMD=$*
eval $CMD
CMD_RESULT=$?

echo "CMD=[$CMD]"
echo "CMD_RESULT=[$CMD_RESULT]"
echo "PWD=[`pwd`]"

if [ $CMD_RESULT -eq 0 ] ; then
    #if [ "$CMD" = 'gitbook build' -o "$CMD" = 'gitbook install && gitbook build' ]; then
    result=$(echo $CMD | grep "gitbook build")
    if [ "$result" != "" ] ; then
    #if [ "$CMD" == "*gitbook build*" ]; then
        echo '[INFO] check favicon.ico'
        if [ -f ./favicon.ico ] && [ -d ./_book/gitbook/images ]; then
            cp -f ./favicon.ico ./_book/gitbook/images/favicon.ico
            echo '[INFO] favicon.ico found, copy to static model site'
        else
            echo '[INFO] use default favicon.ico'
        fi
    fi
else
    echo '[ERROR] Command failed'
fi
