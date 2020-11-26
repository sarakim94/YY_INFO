-- Porject Start --
* BE
-- ./config.json 파일 생성
{
    "user": "***",
    "password": "***",
    "server": "192.168.0.**",
    "database": "***",
    "charset": "utf8mb4"
}

npm install
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
nodemon main.js

* FE
npm install
$env:NODE_ENV="production"
npm run dev