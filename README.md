# renue-web-app

## Helpers

- Convert .mov wideo with alpha channel into webm format while preserving transparency:

  ffmpeg -i "input.mov" -f webm -c:v libvpx -b:v 2M -acodec libvorbis -auto-alt-ref 0 output.webm -hide_banner
