# V33 Human Clips Design

## Goal
Use only the two real human videos supplied by the user as the on-air presenter motion in V33, with no D-ID generation, no YouTube embed, no browser TTS, and no fake mouth/head animation.

## Architecture
The existing studio DOM and presenter slots remain unchanged. Two short, clean, cropped MP4 clips are stored locally in the repository under `assets/v33-human/` and mounted as `<video>` elements over the existing presenter photographs. The photographs remain the safe visual fallback; when media is ready, the real clips occupy the same fixed presenter positions. A single lightweight player sequences Deijanete then Paulo and exposes the existing start/next/pause controls.

## Media rules
- Real source footage only.
- No D-ID endpoint, watermark, remote playback, or generated presenter asset.
- No YouTube iframe/embed.
- No `speechSynthesis` or CSS/JS mouth/head animation.
- Native source audio stays attached to each clip at playback rate 1.0.
- Deijanete clothing and appearance are taken directly from the supplied real footage.

## UI behavior
- Both presenters remain in the fixed V33 bench positions.
- Before playback, the real video first frames may sit paused in the presenter slots; existing photographs remain fallback if media fails.
- `INICIAR JORNAL AO VIVO` starts a one-pass sequence: Deijanete, then Paulo.
- `PRÓXIMA MANCHETE` skips the currently speaking clip to the next presenter.
- `PAUSAR` pauses the active clip.
- Existing top counters and all surrounding V33 layout remain untouched.

## Failure behavior
If either human clip cannot load, the studio drops back to the approved static presenter photographs and disables playback rather than showing broken or synthetic media.

## Verification
Automated checks must assert both local human MP4 paths are used, playback rates remain 1, controls are enabled, and forbidden D-ID/YouTube/TTS/fake-animation patterns are absent. Visual validation must confirm that the cropped clips show only the real presenters and no provider watermark.