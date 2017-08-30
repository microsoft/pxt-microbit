#!/bin/sh
yotta build
arm-none-eabi-objdump -d `find -name main.c.o` > disasm
node genapplet.js disasm Reset_Handler
rm disasm
