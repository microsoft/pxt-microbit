# Flashing via HID (CMSIS-DAP)

When the web app has access to a HID connection to the board, it can flash
the board via the hardware debugger interface.
The PXT localhost server can proxy HID connections (over a WebSocket),
and native apps can access HID via various custom APIs (which are
likely to have lower latency than the HID proxy).

This is generally done via
writing a little flashing program to the RAM, then writing the page to be
flashed to the RAM, and then running the program. For next page, one keeps
the flashing program, but replaces the data. Internally, the DAPLink
software on the @boardname@ does the same.

The flashing via DAP over HID is quite a bit slower than the regular
drag&drop kind. This is because of overheads of the DAP protocol
and the limited throughput of HID (1 packet, of maximum 64 bytes, per millisecond).
Additionally, the DAP protocol requires every HID packet to be acknowledged
effectively halving the bandwidth.
Thus, typical flashing speeds (using HID proxy) are around 14k/s, with a typical
full flash taking 15s. Theoretical maximum is around 25k/s.

A custom flashing protocol, like [HF2](https://github.com/Microsoft/uf2/blob/master/hf2.md),
can achieve around 60k/s, however this would require updates of DAPLink software,
and is still not very fast.

## Partial flashing

Instead, we take care to only flash the pages that have changed.
In typical software development only a very small fragment of the program 
changes on every re-deployment. Additionally, most of the program is pretty
much constant (two bootloaders, the softdevice, and the compiled C++ runtime).

This is achieved by first deploying a small program which computes
checksums of every page. Then, these checksums are read from the device
and compared with checksums of pages of the `.hex` file to be deployed.
Only pages which checksums that do not match are flashed.

The particular checksum algorithm used is [Murmur3](https://en.wikipedia.org/wiki/MurmurHash#MurmurHash3).
The algorithm is simplified by removing checks for unaligned data, or hashing
the data length, since all blocks hashed are of the same, aligned length.

The Murmur3 hash was chosen since it's very fast (around 4x faster than CRC32 and around 
15x faster than SHA256). Hashing the entire flash takes about 200ms.

In fact, two 32 bit Murmur3 hashes (using different starting seeds) are computed in 
parallel, to produce a 64 bit checksum.

## Hash length analysis

Let's compute the probability of some people running into trouble because
of hash collisions on pages. Assume:
* uniform distribution of hashes
* 10M users
* each user programming for 50h, and flashing every 2 minutes, i.e., 1500 flashes
* each flashing changing 10 pages

With 64 bit hashes, the probability that a collision occurs
`1 - ((2^64 - 1) / 2^64) ^ (1e7 * 1500 * 10)` which is `0.000016`
(Bing says so; Google wrongly said `0`).
With 32 bit, even with only 1M users we get `97%` probability of some collisions.
The uniformity of hashes is questionable, but the `0.000016`
gives us some wiggle room.
