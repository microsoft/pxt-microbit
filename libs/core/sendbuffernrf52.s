.syntax unified

#ifndef NRF51

// put it in RAM
.section .data.neopixel_send_buffer_nrf52
.global neopixel_send_buffer_nrf52
.thumb
.type   neopixel_send_buffer_nrf52, %function




neopixel_send_buffer_nrf52:
    push {r4,r5,r6,r7,lr}
    
    lsrs r7, r1, #20 // r7 - brightness
    ands r1, #0xff
    movs r4, #1
    lsls r1, r4, r1 // r1 - mask

    mov r4, r2 // ptr
    mov r5, r3 // len
    mov r3, r0 // port+0x500
    
    b .start
.nextbit:
    str r1, [r3, #0x8]    // pin := hi

    movs r2, #8
    tst r6, r0
    it eq
    movseq r2, #3

.d1:
    subs r2, #1
    bne .d1

    str r1, [r3, #0xC]    // pin := lo

    movs r2, #4
    tst r6, r0
    it eq
    movseq r2, #6

    lsrs r6, r6, #1     // r6 >>= 1 
    beq .reload

    nop
    nop
    nop

.d0:
    subs r2, #1
    bne .d0

    b .nextbit

.reload:    
    subs r2, #2 // offset following operations
.d2:
    subs r2, #1
    bne .d2

    // not just a bit - need new byte
    adds r4, #1         // r4++    
    subs r5, #1         // r5--      
    ble .stop           // if (r5<=0) goto .stop  
.start:
    movs r6, #0x80      // reset mask
    ldrb r0, [r4, #0]  // r0 := *r4 
    muls r0, r7      
    lsrs r0, r0, #8     // r0 >>= 8
    str r1, [r3, #0xC]   // pin := lo   
    b .nextbit         //

.stop:    
    str r1, [r3, #0xC]   // pin := lo

    pop {r4,r5,r6,r7,pc}

#endif
