# micro:coin

## ~ avatar

Have you heard about BitCoin and all those new Crypto currencies? Well micro:bit has **micro:coin** now! 

## ~

## How does a @boardname@ make coins?

Each @boardname@ contains a **block chain**, a sequence of **blocks**, that is public and can't be modified. Each block represents a **coin**. To mine new coins, the user shakes 
the @boardname@ and, if they are in luck, their coin added to the chain as a new block! 
Once the block is added, it is broadcasted to the other @boardname@ (the block chain is public and can't be modified so it's ok to share it). Other @boardname@s receive the block, validate the transaction and update their block chain as needed.

Pressing ``A`` shows the number of block you added to the chain, that's your score.
Pressing ``B`` shows you the length of the chain.

Happy mining!

## Coins, blocks, chains

A _block chain_ is a list of _blocks_ that record transactions of a crypto-currency like BitCoin. A block might contain information like the time it was created (mined) and who mined it. The most important part of the block is it's _hash_. This is a special number made from the information in the last block of the block list combined with the hash number of previous block in the list. The new block contains information for the current transaction and this new hash number. The new block is added to the list of previous blocks. This list is then transmitted to the crypto currency network. It's really hard (like impossible) to tamper or forge a hash which allows the block chain to be transmitted publicly.

## ~ hint

Build yourself a [@boardname@ wallet](/projects/wallet) to hold your coins!

## ~

## Code

The code uses blocks from [radio-blockchain](https://makecode.microbit.org/pkg/microsoft/pxt-radio-blockchain) package.

* Click on **Advanced**, then **Extensions**
* search for **blockchain** and add **radio-blockchain**

```blocks
// shaking is mining...
input.onGesture(Gesture.Shake, () => {
    led.stopAnimation()
    basic.clearScreen()
    basic.pause(200) // display a short pause
    if (Math.randomRange(0, 2) == 0) { // 30% chances to add a transaction
        // we found a coin!!!
        blockchain.addBlock(1);
        basic.showIcon(IconNames.Diamond);
    } else {
        // missed!
        basic.showIcon(IconNames.Asleep);
    }
})

// show my coins
input.onButtonPressed(Button.A, () => {
    led.stopAnimation()
    let coins = blockchain.valuesFrom(blockchain.id()).length;
    basic.showNumber(coins);
    basic.showString("COINS");
})

// show the block chain size
input.onButtonPressed(Button.B, () => {
    led.stopAnimation()
    basic.showNumber(blockchain.length());
    basic.showString("BLOCKS");
})

// instructions on how to play
basic.showString("A=COINS B=CHAIN SHAKE=MINE")
```

## How does the blockchain code work?

The [radio-blockchain](https://makecode.microbit.org/pkg/microsoft/pxt-radio-blockchain) package uses radio to transmit blocks between @boardname@s. You can see how this package works by reading the JavaScript sources at https://github.com/microsoft/pxt-radio-blockchain. To go right to the blockchain code, see this file:

[main.ts](https://github.com/Microsoft/pxt-radio-blockchain/blob/master/main.ts) - contains the complete JavaScript source for the blockhain. Have a good read!

## References

* ["A blockchain in 200 lines of code"](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54). _medium.com_.
* ["Let’s Build the Tiniest Blockchain"](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b). _medium.com_.
* ["How does the blockchain work?"](https://medium.com/@micheledaliessi/how-does-the-blockchain-work-98c8cd01d2ae). _medium.com_.

```package
radio
radio-blockchain=github:Microsoft/pxt-radio-blockchain#v0.1.4
```
