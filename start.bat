@echo off
echo Starting SmartStay AI Pro Development Servers...

start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting in separate windows.
