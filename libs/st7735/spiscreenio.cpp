#include "SPIScreenIO.h"

namespace codal
{

SPIScreenIO::SPIScreenIO(SPI &spi) : spi(spi) {}

void SPIScreenIO::send(const void *txBuffer, uint32_t txSize)
{
    spi.transfer((const uint8_t *)txBuffer, txSize, NULL, 0);
}

void SPIScreenIO::startSend(const void *txBuffer, uint32_t txSize, PVoidCallback doneHandler,
                            void *handlerArg)
{
    spi.startTransfer((const uint8_t *)txBuffer, txSize, NULL, 0, doneHandler, handlerArg);
}

} //