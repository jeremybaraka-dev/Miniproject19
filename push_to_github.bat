@echo off
echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Committing changes...
git commit -m "Complete Deployment: Glass Navbar & Mobile Carousel"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/jeremycodes-tech/singularity.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
