# Example
# Recommendations:
#   Make it interactive
echo Please enter the full path to the file
read -r FROMDIRECTORY

echo Please enter the target IP
read TARGETIP

echo Please enter the directory of the target server
read TARGETDIRECTORY

echo Please enter the username
read TARGETUSER

echo Copying $FROMDIRECTORY from this machine to $TARGETUSER@$TARGETIP:$TARGETDIRECTORY

pscp -P 22 ${FROMDIRECTORY} $TARGETUSER@$TARGETIP:$TARGETDIRECTORY

# pscp -P 22 E:\_SHARE_WITH_SERVER\to-server\dormitary-system\mongodb-windows-x86_64-4.4.4-signed.msi Administrator@121.4.146.70:C:\