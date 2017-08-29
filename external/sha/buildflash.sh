#!/bin/sh
yotta build
arm-none-eabi-objdump -d build/bbc-microbit-classic-gcc/source/CMakeFiles/sha.dir/Users/michal/src/pxt-microbit/external/sha/source/main.c.o > disasm
node /Users/michal/src/uf2-samd21/scripts/genapplet.js disasm Reset_Handler
rm disasm
