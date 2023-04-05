# create index.js file in Microsoft Powershell and  write server code into it

New-Item -Path '.' -Name index.js -ItemType file

Out-File -FilePath './index.js' -InputObject 'const express = require("express");
const app = express();
const port = process.env.PORT || 3000;'








