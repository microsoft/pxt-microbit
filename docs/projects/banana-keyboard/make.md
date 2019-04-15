# Maken

## Materiaal

* @boardname@, batterijhouder en 2 AAA batterijen
* Banaan
* Sinaasappel
* 4 krokodilklemmen

## Stappen

### ``|Stap 1|`` - Aardkabel aansluiten

![](/static/mb/lessons/banana-keyboard-1.png)

Pak de **1ste** krokodillenklem en sluit een kant aan op de **GND** aansluitpen van de @boardname@.

### ``|Stap 2|`` - Geluidskabel aansluiten

![](/static/mb/lessons/banana-keyboard-2.png)

![](/static/mb/lessons/banana-keyboard-3.png)

Pak de **2de** krokodilklem en sluit een kant aan op de **0** aansluitpen van de @boardname@.

### ``|Stap 3|`` - Verbind de koptelefoon met aarde

![](/static/mb/lessons/banana-keyboard-4.png)

Pak de **1ste** krokodilklem en sluit de nog niet gebruikte kant aan op de basis van de stekker van de koptelefoon.

### ``|Stap 4|`` - Sluit de koptelefoon aan

![](/static/mb/lessons/banana-keyboard-5.png)

![](/static/mb/lessons/banana-keyboard-6.png)

Pak de **2de** krokodilklem en sluit de nog niet gebruikte kant aan op het uiteinde van de stekker van de koptelefoon.

### ``|Stap 5|`` - De sinaasappel aansluiten

![](/static/mb/lessons/banana-keyboard-7.png)

Pad de **3e** krokodilklem en sluit een kant aan op de **1ste** krokodillenklem, al aangesloten op **GND**.

### ``|Stap 6|`` - Verbind de sinaasappel

![](/static/mb/lessons/banana-keyboard-8.png)

![](/static/mb/lessons/banana-keyboard-9.png)

Pak de **3e** krokodilklem en sluit de nog niet gebruikte kant aan op de sinaasappel.

### ``|Stap 7|`` - De banaan aansluiten

![](/static/mb/lessons/banana-keyboard-10.png)

Pak de **4e** krokodilklem en sluit een kant aan op de **1** aansluitpen van de @boardname@.

### ``|Stap 8|`` - Verbind de banaan

![](/static/mb/lessons/banana-keyboard-11.png)

Pak de **4e** krokodilklem en sluit de nog niet gebruikte kant aan op de banaan.

### ``|Stap 9|`` - Bananen toetsenbord gereed

![](/static/mb/lessons/banana-keyboard-12.png)

Jouw bananen toetsenbord is klaar!

### ``|Stap 10|`` - Test het toetsenbord

Verbind jouw @boardname@ via een USB-kabel met de computer en voer dit script uit:
```blocks
input.onPinPressed(TouchPin.P1, () => {
    music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Quarter));
});
```

#### ~tip

Wil je weten hoe het werkt? Bekijk deze video:

https://www.youtube.com/watch?v=GEpZrvbsO7o

#### ~

Pak de sinaasappel in een hand. Tik met de vingers van je andere hand op de banaan. Jouw bananen toetsenbord is klaar!

## ~button /projects/banana-keyboard/code
VOLGENDE: beat box
## ~
