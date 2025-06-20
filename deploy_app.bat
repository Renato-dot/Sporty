@echo off
echo === Pokretanje instalacije aplikacije ===

:: Backend dio
echo --- Backend: Instalacija dependencija ---
cd backend
call npm install

echo --- Backend: Pokretanje servera ---
start cmd /k "npm start"

cd ..

:: Frontend dio
echo --- Frontend: Instalacija Quasar dependencija ---
cd frontend
call npm install
call quasar build

echo --- Frontend build gotov ---
cd ..

:: SQL setup
echo --- Import baze podataka ---
mysql -u root -p < setup.sql

echo === Instalacija završena ===
pause
