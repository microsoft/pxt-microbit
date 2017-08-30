#include <stdint.h>

static const uint32_t sha256_k[] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2};

#define rotr(v, b) (((uint32_t)v >> b) | (v << (32 - b)))

static inline void sha256round(uint32_t *hs, uint32_t *w) {
  for (int i = 16; i < 64; ++i) {
    uint32_t s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >> 3);
    uint32_t s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >> 10);
    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
  }

  uint32_t a = hs[0];
  uint32_t b = hs[1];
  uint32_t c = hs[2];
  uint32_t d = hs[3];
  uint32_t e = hs[4];
  uint32_t f = hs[5];
  uint32_t g = hs[6];
  uint32_t h = hs[7];

  for (int i = 0; i < 64; ++i) {
    uint32_t s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
    uint32_t ch = (e & f) ^ (~e & g);
    uint32_t temp1 = (h + s1 + ch + sha256_k[i] + w[i]);
    uint32_t s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
    uint32_t maj = (a & b) ^ (a & c) ^ (b & c);
    uint32_t temp2 = (s0 + maj);

    h = g;
    g = f;
    f = e;
    e = (d + temp1);
    d = c;
    c = b;
    b = a;
    a = (temp1 + temp2);
  }

  hs[0] += a;
  hs[1] += b;
  hs[2] += c;
  hs[3] += d;
  hs[4] += e;
  hs[5] += f;
  hs[6] += g;
  hs[7] += h;
}

#define INLINE __attribute__((always_inline)) static inline

INLINE void sha256block(uint8_t *buf, uint32_t len, uint32_t *dst) {
  uint32_t hs[] = {0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
                   0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19};

  uint32_t w[64];

  for (uint32_t i = 0; i < len; i += 64) {
    for (uint32_t j = 0; j < 16; j++) {
      uint32_t off = (j << 2) + i;
      w[j] = (buf[off] << 24) | (buf[off + 1] << 16) | (buf[off + 2] << 8) |
             buf[off + 3];
    }
    sha256round(hs, w);
  }

  dst[0] = hs[0];
  dst[1] = hs[1];
}

#define POLYNOMIAL 0xEDB88320

INLINE void makeCRC32tab(uint32_t *table) {
  for (uint32_t b = 0; b < 256; ++b) {
    uint32_t r = b;
    for (uint32_t j = 0; j < 8; ++j) {
      if (r & 1)
        r = (r >> 1) ^ POLYNOMIAL;
      else
        r = (r >> 1);
    }
    table[b] = r;
  }
}

INLINE uint32_t crc(const uint8_t *p, uint32_t len, uint32_t *crcTable) {
  uint32_t crc = ~0U;
  for (uint32_t i = 0; i < len; ++i)
    crc = crcTable[*p++ ^ (crc & 0xff)] ^ (crc >> 8);
  return (~crc);
}

INLINE uint32_t murmur3_core(const uint8_t *data, uint32_t len) {
  uint32_t h = 0x2F9BE6CC;
  const uint32_t *data32 = (const uint32_t *)data;
  uint32_t i = len >> 2;
  do {
    uint32_t k = *data32++;
    k *= 0xcc9e2d51;
    k = (k << 15) | (k >> 17);
    k *= 0x1b873593;
    h ^= k;
    h = (h << 13) | (h >> 19);
    h = (h * 5) + 0xe6546b64;
  } while (--i);
  return h;
}

INLINE void murmur3_core_2(const uint8_t *data, uint32_t len, uint32_t *dst) {
  // compute two hashes with different seeds in parallel, hopefully reducing
  // collisions
  uint32_t h0 = 0x2F9BE6CC;
  uint32_t h1 = 0x1EC3A6C8;
  const uint32_t *data32 = (const uint32_t *)data;
  uint32_t i = len >> 2;
  do {
    uint32_t k = *data32++;
    k *= 0xcc9e2d51;
    k = (k << 15) | (k >> 17);
    k *= 0x1b873593;

    h0 ^= k;
    h1 ^= k;
    h0 = (h0 << 13) | (h0 >> 19);
    h1 = (h1 << 13) | (h1 >> 19);
    h0 = (h0 * 5) + 0xe6546b64;
    h1 = (h1 * 5) + 0xe6546b64;
  } while (--i);

  dst[0] = h0;
  dst[1] = h1;
}

int Reset_Handler(uint32_t *dst, uint8_t *ptr, uint32_t pageSize,
                  uint32_t numPages) {
  uint32_t crcTable[256];
  makeCRC32tab(crcTable);

  for (uint32_t i = 0; i < numPages; ++i) {
#if 0
    sha256block(ptr, pageSize, dst);
#elif 0
    dst[0] = crc(ptr, pageSize, crcTable);
    dst[1] = murmur3_core(ptr, pageSize);
#else
    murmur3_core_2(ptr, pageSize, dst);
#endif
    dst += 2;
    ptr += pageSize;
  }
#ifdef __arm__
  __asm__("bkpt 42");
#endif
  return 0;
}

#if 0
#define PAGE_SIZE 0x400
#define SIZE_IN_WORDS (PAGE_SIZE / 4)

#define setConfig(v)                                                           \
  do {                                                                         \
    NRF_NVMC->CONFIG = v;                                                      \
    while (NRF_NVMC->READY == NVMC_READY_READY_Busy)                           \
      ;                                                                        \
  } while (0)

void overwriteFlashPage(uint32_t *to, uint32_t *from) {
  int same = 1;
  for (int i = 0; i <= (SIZE_IN_WORDS - 1); i++) {
    if (to[i] != from[i]) {
      same = 0;
      break;
    }
  }
  if (same)
    return;

  // Turn on flash erase enable and wait until the NVMC is ready:
  setConfig(NVMC_CONFIG_WEN_Een << NVMC_CONFIG_WEN_Pos);

  // Erase page:
  NRF_NVMC->ERASEPAGE = (uint32_t)to;
  while (NRF_NVMC->READY == NVMC_READY_READY_Busy)
    ;

  // Turn off flash erase enable and wait until the NVMC is ready:
  setConfig(NVMC_CONFIG_WEN_Ren << NVMC_CONFIG_WEN_Pos);

  // Turn on flash write enable and wait until the NVMC is ready:
  setConfig(NVMC_CONFIG_WEN_Wen << NVMC_CONFIG_WEN_Pos);

  for (int i = 0; i <= (SIZE_IN_WORDS - 1); i++) {
    *(to + i) = *(from + i);
    while (NRF_NVMC->READY == NVMC_READY_READY_Busy)
      ;
  }

  // Turn off flash write enable and wait until the NVMC is ready:
  setConfig(NVMC_CONFIG_WEN_Ren << NVMC_CONFIG_WEN_Pos);
}

#endif

#ifndef __arm__
#define PS 1024
#define NP 10

#include <stdio.h>
#include <string.h>

int main() {

  uint8_t buf[NP * PS];
  uint32_t sums[NP * 2];
  memset(buf, 0, sizeof(buf));
  for (int i = 0; i < PS; ++i)
    buf[i] = i;
  for (int i = 0; i < PS; ++i)
    buf[i + PS] = 108;
  Reset_Handler(sums, buf, PS, NP);
  for (int i = 0; i < NP; ++i) {
    printf("%08x %08x\n", sums[i * 2], sums[i * 2 + 1]);
  }

  return 0;
}
#endif
