#!/bin/bash

# SETUP SCRIPT
# run this script to install all the required tools and packages.

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "SETUP SCRIPT FOR CODIO DYNAMIC WEBSITE ASSIGNMENT TEMPLATE"
echo "This installer will delete all the files currently in your Codio Box."
echo

if [ -v CODIO_HOSTNAME ]
then
	echo "Codio box detected"
	echo "continuing setup"
else
	echo "no Codio box detected"
	echo "exiting setup"
	exit 0
fi
sudo chown -R codio:codio .
echo
echo "============== ${green}DELETING${reset} OLD FILES ==================="
rm -rf *
rm -rf .*
rm -rf .guides
echo
echo "============== CLONING ${green}REPOSITORY${reset} ==================="
git clone https://github.coventry.ac.uk/web/Codio-Assignment-Template.git .
chmod +x .githooks/*
git remote rm origin
rm -rf install.sh # delete this script so it can't be run from inside the project!
rm .codio
mv codio.json .codio
echo
echo "============= DELETING ${green}TEMPORARY FILES${reset} =============="
rm -rf *.db  # delete any old database files
rm -rf package-lock.json
rm -rf .settings
rm -rf .sqlite_history
rm -rf .bash_history
rm -rf .git # delete the repository we have cloned (if any)
echo
echo "============== UPDATING ${green}DEBIAN${reset} TOOLS ==============="
sudo add-apt-repository -y ppa:git-core/ppa
sudo apt update -y
sudo apt upgrade -y
echo
echo "============= INSTALLING ${green}DEBIAN${reset} TOOLS =============="
sudo apt install -y psmisc lsof tree sqlite3 sqlite3-doc build-essential gcc g++ make git
git --version
echo
echo "============== CHANGING ${green}BASH PROMPT${reset} ================"
echo "PS1='$ '" >> ~/.profile
source ~/.profile
echo "=============== INSTALLING ${green}ACT${reset} TOOL ================"
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
echo
echo "========= INSTALLING NODE USING ${green}NODESOURCE${reset} ========="
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
echo
echo "=========== INSTALLING THE ${green}NODE PACKAGES${reset} ==========="
echo
rm -rf node_modules
rm -rf package-lock.json
npm install
npm install --save-dev eslint ava # we WILL ensure these are installed!
npm audit fix
echo
echo "=========== SETTING THE ${green}FILE PERMISSIONS${reset} ==========="
sudo chown -R codio:codio .
echo
echo "============== RUNNING THE ${green}UNIT TESTS${reset} =============="
npm test
echo
echo "================ RUNNING THE ${green}LINTER${reset} ================"
npm run linter
echo
echo "===== CHECKING THE VERSION OF ${green}NODEJS${reset} INSTALLED ====="
node -v
echo
echo "================= ${green}SETUP COMPLETED ${reset} ================="
