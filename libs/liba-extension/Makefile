CXX = arm-none-eabi-g++
AR = arm-none-eabi-ar

# must match the cpu_opts used by the codal-microbit-v2 target so the object
# file is link-compatible (Cortex-M4F, thumb2)
MCUFLAGS := -mcpu=cortex-m4 -mthumb -mfpu=fpv4-sp-d16 -mfloat-abi=softfp
CXXFLAGS ?= -Wall -Wextra -O2 -std=c99 $(MCUFLAGS)

TARGET := myadd.a
OBJECTS := myadd.o

.PHONY: all clean

all: $(TARGET)

$(TARGET): $(OBJECTS)
	$(AR) rcs $@ $^

myadd.o: myadd.c
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(OBJECTS) $(TARGET)