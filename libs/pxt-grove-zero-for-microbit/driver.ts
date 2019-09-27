
namespace driver
{
    export let groveEventId = 8000;
    export let addrBuffer: Buffer = pins.createBuffer(128);
    export let lastStatus: Buffer = pins.createBuffer(128);

    export function i2cSendByte(address: number, data: number)
    {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = data;
        pins.i2cWriteBuffer(address, buf, false);
    }

    export function i2cSendBytes(address: number, data: Buffer)
    {
        pins.i2cWriteBuffer(address, data, false);
    }

    export function i2cReceiveByte(address: number): number
    {
        let buf: Buffer = pins.createBuffer(1);
        buf = pins.i2cReadBuffer(address, 1, false);
        return buf[0];
    }

    export function i2cReceiveBytes(address: number, len: number): Buffer
    {
        let buf: Buffer = pins.createBuffer(len);
        buf = pins.i2cReadBuffer(address, len, false);
        return buf;
    }

    export function getEventStatus(currentDeviceAddress: number): number
    {
        let data: Buffer = pins.createBuffer(4);
        i2cSendByte(currentDeviceAddress, 0x01);
        data = i2cReceiveBytes(currentDeviceAddress, 4);
        return data[0];
    }

    let init = false;
    let monitoredAddresses: number[][];

    export function subscribeToEventSource(address: number) {
        // Lazily allocate fiber and array
        if (!init) {
            init = true;
            monitoredAddresses = [];
 
            // Only allocate one fiber for all events to reduce memory
            control.inBackground(() => {
                while (true) {
                    for (const addr of monitoredAddresses)  {
                        const address = addr[0];
                        const eventId = addr[1];

                        const newStatus = driver.getEventStatus(address);
                        if (newStatus != driver.lastStatus[address]) {
                            driver.lastStatus[address] = newStatus;
                            control.raiseEvent(eventId, driver.lastStatus[address]);
                        }
                    }
                    basic.pause(50);
                }
            });
        }

        for (const addr of monitoredAddresses) {
            if (addr[0] === address) {
                return addr[1];
            }
        }

        let eventId = 0;
        driver.lastStatus[address] = 0;
        if(driver.addrBuffer[address] == 0)eventId = driver.groveEventId + address;
        else eventId = driver.addrBuffer[address];

        monitoredAddresses.push([address, eventId]);
        return eventId;
    }
}
