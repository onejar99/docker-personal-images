#!/bin/bash

#pwd=/etc/apache2
#whoami=root

clearLoggerFile=/var/log/custom/clearErrorLog.txt
removeTarget=$(date +"%Y-%m-" -d "1 year ago")
removeLogFilePattern=/var/log/custom/php_errors.log.${removeTarget}*

echo "[`date +"%Y-%m-%d %H:%M:%S"`] delete obsolete log: ${removeLogFilePattern}"  >> ${clearLoggerFile}
eval "rm ${removeLogFilePattern}" 2>&1 >> ${clearLoggerFile}
echo "[`date +"%Y-%m-%d %H:%M:%S"`] (result: " $? ")"   >> ${clearLoggerFile}
