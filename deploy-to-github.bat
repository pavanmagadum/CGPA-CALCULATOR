@echo off
echo ========================================
echo   CGPA Calculator - GitHub Deployment
echo ========================================
echo.

echo 1. Make sure you have created a GitHub repository named 'cgpa-calculator'
echo 2. Copy your repository URL from GitHub
echo.

set /p REPO_URL="Enter your GitHub repository URL (https://github.com/yourusername/cgpa-calculator.git): "

if "%REPO_URL%"=="" (
    echo Error: No repository URL provided!
    pause
    exit /b 1
)

echo.
echo Adding remote origin...
git remote add origin %REPO_URL%

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your CGPA Calculator is now on GitHub!
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Click on 'Settings' tab
echo 3. Scroll down to 'Pages' section
echo 4. Under 'Source', select 'Deploy from a branch'
echo 5. Select 'main' branch and '/ (root)' folder
echo 6. Click 'Save'
echo.
echo Your site will be live at:
echo https://yourusername.github.io/cgpa-calculator
echo (Replace 'yourusername' with your actual GitHub username)
echo.
echo Note: It may take 5-10 minutes for your site to go live.
echo.
pause