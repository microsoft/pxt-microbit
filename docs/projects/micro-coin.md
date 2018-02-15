# micro:coin

Have you heard about BitCoin and all those new Crypto currencies? Well micro:bit has **micro:coin** now! 

## How does it work?

Each @boardname@ contains a **coin**, which is made of a **block chain**. To mine new blocks in the coin, the user shakes 
the @boardname@ and hopes that they will be in luck! The block chain is public and can't be modified so it's ok to share it.

## ~hint

**Coins, blocks, chains**

In the world of crypto currency, a _coin_ is a list of _blocks_ that record transfers (transactions) of the coin. A block might contain information like the time it was created (mined) and who mined it. The most important part of the block is it's _hash_. This is a special number made from the information in the last block of the block list combined with the hash number of previous block in the list. The new block contains information for the current transaction and this new hash number. The new block is added to the list of previous blocks. This list is then transmitted to the crypto currency network.

The block list sent to the network is called a _blockchain_. Other currency miners see it and try to calculate again the same hash number found in the last block of the chain. By doing this, they are verifying that the block is correct and the transaction was valid. Crypto currency systems reward miners for doing this by adding some currency to their accounts.

## ~

When a new block is found, it's added to the coin and broadcasted to the other @boardname@.
When a block is received, the current chain is updated and so on.

Each block is tagged with the device serial number so your score is the number of blocks you successfully added to the chain.

Happy mining!

## Full source code

## ~ hint

JavaScript only! This program uses features that won't work in blocks...

## ~

```typescript
/*
* micro:coin, A minimalistic blockchain for micro:bit
* 
* DISCLAIMER: this is just an example.
*
*
* References:
* https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54
* https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b
*
*/

/**
 * Message types sent over radio.
 */
enum Message {
    // ask peer to get the full chain
    QueryChain = 1,
    // a block flying around
    Block = 2
}


/**
 * A block is an immutable (can't change it) piece of a block chain.
 * The block chain is like a list where each block is built from
 * the previous block.
 */
class Block {
    // index in the chain
    index: number;
    // timestamp on the device when the block was created
    timestamp: number;
    // in this implementation, data is the device serial number
    data: number;
    // hash of the previous block as a single unsigned byte
    previousHash: number; // uint8
    // hash of the current block as a single unsigned byte
    hash: number; // uint8

    /**
     * Construct the block and computes the hash
     */
    constructor(
        index: number,
        timestamp: number,
        data: number,
        previousHash: number) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
    }

    /**
     * Compute the hash of the current block
     */
    computeHash() {
        let s = "" + this.index + this.timestamp + this.data + this.previousHash;
        /**
         * This function takes a string and hashes it into a number. It simply takes the sum of characters,
         * it's not great but will work for a super-simple example.
         */
        let sum = 0;
        for (let i = 0; i < s.length; i++)
            sum += s.charCodeAt(i);
        return sum % 0xff;
    }

    /**
     * Create the next block with the given data
     */
    next(data: number) {
        return new Block(this.index + 1, input.runningTime(), data, this.hash);
    }

    /**
     * Render the block as a string
     */
    toString() {
        return `block ${this.index} ${this.timestamp} ${this.data} ${this.hash}`;
    }

    /**
     * Send the block over radio
     */
    broadcast() {
        serial.writeLine(`broadcast ${this}`);
        /**
        * We pack all the block data into a buffer and send it over radio
        */
        const buf = pins.createBuffer(16);
        buf.setNumber(NumberFormat.UInt8LE, 0, Message.Block);
        buf.setNumber(NumberFormat.UInt8LE, 1, this.hash);
        buf.setNumber(NumberFormat.UInt8LE, 2, this.previousHash);
        buf.setNumber(NumberFormat.Int32LE, 4, this.index);
        buf.setNumber(NumberFormat.Int32LE, 4 + 4, this.timestamp);
        buf.setNumber(NumberFormat.Int32LE, 4 + 8, this.data);
        radio.sendBuffer(buf)
    }

    /**
     * Try to read the block from the buffer. If anything is wrong, return undefined.
     */
    static receive(buf: Buffer): Block {
        // check the message type
        if (buf.getNumber(NumberFormat.UInt8LE, 0) != Message.Block)
            return undefined;
        // read all the parts of the block back from the buffer
        const b = new Block(
            buf.getNumber(NumberFormat.Int32LE, 4), // index
            buf.getNumber(NumberFormat.Int32LE, 4 + 4), // timestamp
            buf.getNumber(NumberFormat.Int32LE, 4 + 8), // data
            buf.getNumber(NumberFormat.UInt8LE, 2) // previoushash
        );
        const h = buf.getNumber(NumberFormat.UInt8LE, 1); // hash
        if (b.hash != h) {
            serial.writeLine(`received invalid block ${b.hash} != ${h}`);
            return undefined;
        }
        serial.writeLine(`received ${b}`);
        return b;
    }
}

/**
 * A coin is made of chains
 */
class Coin {
    id: number; // device serial number
    chain: Block[];

    /**
     * Constructs a new coin with the given id
     */
    constructor(id: number) {
        this.id = id;
        this.chain = [];
        // if ID is set, this coin is a mirror of a peer coin
        // otherwise add genesis block
        if (!this.id) {
            this.chain.push(new Block(0, input.runningTime(), 0, 0));
            this.id = control.deviceSerialNumber();
        }
    }

    /**
     * Grab the last block in the chain
     */
    lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Add a new block in the chain
     */
    addBlock() {
        this.chain.push(this.lastBlock().next(this.id));
        this.lastBlock().broadcast();
    }

    /**
     * Test if we have all the blocks in the chain available
     */
    isComplete() {
        for (let i = 0; i < this.chain.length; ++i)
            if (!this.chain[i]) return false; // missing block            
        return this.lastBlock().index == this.chain.length - 1;
    }

    /**
     * Test if the block chain is valid
     */
    isValid() {
        if (!this.isComplete()) {
            serial.writeLine("coin not complete");
            return false;
        }
        for (let i = 0; i < this.chain.length - 1; ++i) {
            const prev = this.chain[i];
            const next = this.chain[i + 1];
            if (prev.index + 1 != next.index) {
                serial.writeLine("invalid index");
                return false;
            }
            if (prev.hash != next.previousHash) {
                serial.writeLine("invalid prev hash");
            }
            if (next.computeHash() != next.hash) {
                serial.writeLine("invalid hash");
                return false;
            }
        }
        return true;
    }

    /**
     * Insert a block received over the radio
     */
    insert(block: Block) {
        this.chain[block.index] = block;
    }

    /**
     * We've received a coin and we are trying to replace the chain if it's been updated.
     */
    replace(other: Coin) {
        if (other.isValid() && other.chain.length > me.chain.length) {
            serial.writeLine("replacing chain");
            this.chain = other.chain.slice(0, other.chain.length);
            this.lastBlock().broadcast()
            basic.showIcon(IconNames.SmallSquare)
        }
    }

    /**
     * Broadcast the chains
     */
    broadcastChain() {
        for (let i = 0; i < this.chain.length; ++i) {
            this.chain[i].broadcast();
        }
    }
}

/**
 * Request all peers (or a single on) for the entire chain
 */
function broadcastQueryChain(serialNumber: number = 0) {
    const msg = pins.createBuffer(6);
    msg.setNumber(NumberFormat.UInt8LE, 0, Message.QueryChain);
    msg.setNumber(NumberFormat.Int32LE, 2, serialNumber);
    radio.sendBuffer(msg);
}

const me = new Coin(0);
const peers: Coin[] = [];

/**
 * Get or create a coin to store the chain of a peer
 */
function peer(id: number): Coin {
    for (let i = 0; i < peers.length; ++i) {
        if (peers[i].id == id) return peers[i];
    }
    const r = new Coin(id);
    peers.push(r);
    return r;
}

/**
 * Settings for the radio receiver
 */
radio.setGroup(42);
radio.setTransmitSerialNumber(true);
radio.onDataPacketReceived(({ receivedBuffer, serial: serialNumber }) => {
    // processing a message received by ppers
    let id: number;
    switch (receivedBuffer[0]) {
        case Message.QueryChain:
            // so a peer asking to broadcast the chain
            serial.writeLine("msg: query chain");
            id = receivedBuffer.getNumber(NumberFormat.Int32LE, 2);
            // either all peers should send or just me
            if (!id || id == me.id) {
                me.broadcastChain();
                me.broadcastChain(); // send it twice as we might loose patterns
            }
            break;
        case Message.Block:
            // so we've received a block from a peer
            serial.writeLine("msg: block");
            const other = peer(serialNumber);
            const block = Block.receive(receivedBuffer);
            if (!block) return; // something got corrupted
            other.insert(block);
            serial.writeLine(`check ${other.lastBlock().index} > ${me.lastBlock().index}`)
            // if the other chain is longer, we should update ours maybe
            if (other.lastBlock().index > me.lastBlock().index) {
                if (!other.isComplete()) {
                    // we don't have the entire chain
                    serial.writeLine(`peer incomplete`)
                    broadcastQueryChain(serialNumber);
                } else {
                    // we have a full chain, try replacing it
                    serial.writeLine(`peer complete, try replace`)
                    me.replace(other);
                }
            }
            break;
    }
})

// shaking is mining...
input.onGesture(Gesture.Shake, () => {
    led.stopAnimation()
    basic.clearScreen()
    basic.pause(200) // display a short pause
    if (Math.random(3) == 0) { // 30% change to mine
        // gold!!!
        me.addBlock();
        basic.showIcon(IconNames.Diamond);
    } else {
        // missed!
        basic.showIcon(IconNames.Asleep);
    }
})

// show my score
input.onButtonPressed(Button.A, () => {
    led.stopAnimation()
    let score = 0;
    for (let i = 0; i < me.chain.length; ++i) {
        if (me.chain[i].data == me.id)
            score++;
    }
    basic.showNumber(score);
})

// show the block chain size
input.onButtonPressed(Button.B, () => {
    led.stopAnimation()
    basic.showNumber(me.chain.length - 1);
})
input.onButtonPressed(Button.AB, () => {
    led.stopAnimation()
    for (let i = 1; i < me.chain.length; ++i) {
        basic.showNumber(me.chain[i].data);
    }
})

// ask neighbors for chains
broadcastQueryChain();
basic.showString("A=SCORE B=CHAIN SHAKE=MINE", 100)
```


```package
radio
```