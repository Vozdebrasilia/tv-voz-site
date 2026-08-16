#!/usr/bin/env bash
set -euo pipefail

text_files=()
while IFS= read -r -d '' file; do
  [[ "$file" == "tests/v33-safe-studio-test.sh" ]] && continue
  case "$file" in
    *.html|*.js|*.md|*.css|*.json|*.sh) text_files+=("$file") ;;
  esac
done < <(git ls-files -z)

# The obsolete provider, its clips, remote playback and synthetic speech stay absent.
! rg -n -i 'D-ID|D ID|d-id\.com|DID_API|assets/v33-did|speechSynthesis|SpeechSynthesisUtterance|playback_url|watermark' "${text_files[@]}"
! find . -type f -iname '*.mp4' -print -quit | grep -q .
! rg -n -i '<iframe[^>]+(youtube|youtu\.be)|youtube\.com/(embed|iframe)|youtu\.be/.+\?(.*&)?embed' "${text_files[@]}"

# Safe mode contains only the fixed approved presenter images and no media controls.
grep -q 'src="./studio-deijanete-source.png"' index.html
grep -q 'src="./studio-paulo-source.png"' index.html
grep -q 'class="live-studio v33-static-presenters"' index.html
! rg -n '<(video|audio|iframe)|INICIAR JORNAL AO VIVO|v33-presenter-video' index.html v33-safe-studio.js

# The four animated institutional indicators remain present with their exact targets.
grep -q 'data-format="mil" data-suffix="+" data-target="200"' index.html
grep -q 'data-format="milhoes" data-suffix="+" data-target="200"' index.html
grep -q 'data-format="plus" data-suffix="+" data-target="1000"' index.html
grep -q 'data-format="mil" data-suffix="+" data-target="10000"' index.html
grep -q 'initEcoStatsAnimation()' index.html
