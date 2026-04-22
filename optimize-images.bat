@echo off
REM Image Optimization Script for Windows
REM Make sure ImageMagick is installed: https://imagemagick.org/script/download.php

echo 🖼️ Optimizing Images...

REM Check if ImageMagick mogrify is available
where mogrify >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Found ImageMagick! Optimizing...
    mogrify -quality 80 -strip background.jpg
    for /r Images %%f in (*.jpg *.png) do (
        mogrify -quality 80 -strip "%%f"
    )
    echo ✅ Image optimization complete!
) else (
    echo ⚠️  ImageMagick not found. Using online TinyPNG instead:
    echo Open: https://tinypng.com
    echo 1. Upload background.jpg
    echo 2. Download optimized version
    echo 3. Replace original file
    echo.
    echo For batch processing, install ImageMagick first:
    echo https://imagemagick.org/script/download.php
)

pause
