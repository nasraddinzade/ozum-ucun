@echo off
echo ============================================
echo   OZUM UCUN - Google Play Publisher
echo ============================================
echo.

REM Step 1: Login to Expo (only needed once)
echo [1/3] Logging in to Expo...
eas whoami >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Please log in to your Expo account:
    eas login
) ELSE (
    echo Already logged in.
)

echo.
echo [2/3] Linking project to Expo...
eas project:init

echo.
echo [3/3] Building release AAB for Google Play...
echo This will take 10-15 minutes in the cloud.
eas build --platform android --profile production

echo.
echo ============================================
echo Build complete!
echo Download the .aab file from the link above.
echo Upload it to Google Play Console.
echo ============================================
pause
