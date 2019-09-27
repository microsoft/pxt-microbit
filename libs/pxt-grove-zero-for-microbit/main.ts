enum SensorType {
    //% block=Sound Sensor
    Sound = 6,
    //% block=Gesture Sensor
    Gesture = 0x0c,
    //% block=Knob
    Knob = 0x10,
    //% block=Color Line Follower
    Liner = 0x27

};

enum ColorEvent {
    //% block=black
    Black = 1,
    //% block=red
    R = 2,
    //% block=green
    G = 3,
    //% block=blue
    B = 4,
    //% block=others
    Other = 5
};

enum LinerEvent {
    //% block=middle
    Middle = 1,
    //% block=left
    Left = 3,
    //% block=leftmost
    Leftmost = 4,
    //% block=right
    Right = 5,
    //% block=rightmost
    Rightmost = 6,
    //% block=lost
    Lost = 2
};

enum MotorTpye {
    //% block=servo
    Servo = 0x24,
    //% block=wheel
    Wheel = 0x28
};

enum SpeedTpye {
    //% block=slow
    Slow = 120,
    //% block=medium
    Medium = 200,
    //% block=fast
    Fast = 255
};

enum DirectionTpye {
    //% block=forward
    Forward = 1,
    //% block=backward
    Backward = 2,
    //% block=left
    Left = 3,
    //% block=right
    Right = 4,
    //% block=clockwise
    Clockwise = 5,
    //% block=counter-clockwise
    Anticlockwise = 6
};

enum MotionTpye {
    //% block="random direction"
    Random = 0,
    //% block=automatically
    Auto = 1
};

/**
 * Extension blocks
 */
//% weight=48 color=#0063A0 icon="\uf018" block="BitKit"
//% groups="['Color Line Follower', 'Chassis']"
namespace BitKit {

    /**
     * Set the actions and the moving speed of motormodule.
     * @param direction the direction that want to set.
     * @param speed the speed that want to run.
     */
    //% blockId=motor_set_action block="Chassis go|%direction|at|%speed speed"
    //% weight=100
    //% group="Chassis"
    export function setMotormoduleAction(direction: DirectionTpye, speed: SpeedTpye) {
        let data: Buffer = pins.createBuffer(5);
        data[0] = 0x01;
        if(direction == DirectionTpye.Forward){
            data[1] = speed & 0xff;
            data[2] = (speed >> 8) & 0xff;
            data[3] = speed & 0xff;
            data[4] = (speed >> 8) & 0xff;        
        }
        else if(direction == DirectionTpye.Backward){
            data[1] = (-speed) & 0xff;
            data[2] = ((-speed) >> 8) & 0xff;
            data[3] = (-speed) & 0xff;
            data[4] = ((-speed) >> 8) & 0xff;  
        }
        else if(direction == DirectionTpye.Left){
            data[1] = 0 & 0xff;
            data[2] = (0 >> 8) & 0xff;
            data[3] = speed & 0xff;
            data[4] = (speed >> 8) & 0xff;  
        }
        else if(direction == DirectionTpye.Right){
            data[1] = speed & 0xff;
            data[2] = (speed >> 8) & 0xff;
            data[3] = 0 & 0xff;
            data[4] = (0 >> 8) & 0xff;        
        }
        else if(direction == DirectionTpye.Clockwise){
            data[1] = speed & 0xff;
            data[2] = (speed >> 8) & 0xff;
            data[3] = (-speed) & 0xff;
            data[4] = ((-speed) >> 8) & 0xff;        
        }
        else if(direction == DirectionTpye.Anticlockwise){
            data[1] = (-speed) & 0xff;
            data[2] = ((-speed) >> 8) & 0xff;
            data[3] = speed & 0xff;
            data[4] = (speed >> 8) & 0xff;        
        }
        driver.i2cSendBytes(MotorTpye.Wheel, data);
    }

    /**
     * Stop the motormodule.
     */
    //% blockId=motor_stop_run block="Chassis stop"
    //% weight=99
    //% group="Chassis"
    export function stopMotormodule() {
        setMotormoduleSpeed(0, 0);
    }

    /**
     * Set the speed of motors on motormodule.
     * @param left the left speed you want to run.
     * @param right the right speed you want to run.
     */
    //% blockId=motor_set_speed_with_duty block="Chassis left motor|%left|, right motor |%right"
    //% left.min=-255 left.max=255 left.defl=0
    //% right.min=-255 right.max=255 right.defl=0
    //% weight=98
    //% group="Chassis"
    export function setMotormoduleSpeed(left: number, right: number) {
        let data: Buffer = pins.createBuffer(5);
        data[0] = 0x01;
        data[1] = left & 0xff;
        data[2] = (left >> 8) & 0xff;
        data[3] = right & 0xff;
        data[4] = (right >> 8) & 0xff;
        driver.i2cSendBytes(MotorTpye.Wheel, data);
    }

    export let linerEventValue = 0;
    const eventIdLiner = 9000;
    let initLiner = false;
    let lastLiner = 0;

    /**
     * Do something when the line follower recognized the position of the line underneath.
     * @param event type of liner to detect
     * @param handler code to run
     */
    //% blockId=sensor_liner_create_event block="on Color Line Follower line position|%event"
    //% weight=100 
    //% group="Color Line Follower"
    export function onLinePosition(event: LinerEvent, handler: () => void) {
        control.onEvent(eventIdLiner, event, handler);
        if (!initLiner) {
            initLiner = true;
            control.inBackground(() => {
                while (true) {
                    driver.i2cSendByte(SensorType.Liner, 0x02);
                    const event = driver.i2cReceiveByte(SensorType.Liner);
                    if (event > 2) linerEventValue = event;
                    if (event != lastLiner) {
                        lastLiner = event;
                        control.raiseEvent(eventIdLiner, lastLiner);
                    }
                    basic.pause(50);
                }
            })
        }
    }

    /**
     * Do something when the color sensor detects a specific color.
     * @param event type of color to detect
     * @param handler code to run
     */
    //% blockId=sensor_color_create_event block="on Color Line Follower see |%event"
    //% weight=99
    //% group="Color Line Follower"
    export function onColor(event: ColorEvent, handler: () => void) {
        const eventId = driver.subscribeToEventSource(SensorType.Liner);
        control.onEvent(eventId, event, handler);
    }

    /**
     * See if the line follower recognized the position of the line underneath.
     * @param event of liner device
     */
    //% blockId=sensor_is_liner_event_generate block="Color Line Follower see line at|%event|"
    //% weight=98
    //% group="Color Line Follower"
    export function wasLinePositionTriggered(event: LinerEvent): boolean {
        let eventValue = event;
        if (!initLiner) onLinePosition(event, () => { });
        if (lastLiner == eventValue) return true;
        return false;
    }

    /**
     * See if the color sensor detected a specific color.
     * @param event of color device
     */
    //% blockId=sensor_is_color_event_generate block="Color Line Follower see color|%event|"
    //% weight=97
    //% group="Color Line Follower"
    export function wasColorTriggered(event: ColorEvent): boolean {
        let eventValue = event;
        if (driver.addrBuffer[SensorType.Liner] == 0) onColor(event, () => { });
        if (driver.lastStatus[SensorType.Liner] == eventValue) return true;
        return false;
    }

    /**
     * Get the color value from the color sensor in R:G:B.
     */
    //% blockId=sensor_get_color_rgb block="Color Line Follower color value"
    //% weight=96
    //% group="Color Line Follower"
    export function getColor(): number {
        let data: Buffer = pins.createBuffer(4);
        driver.i2cSendByte(SensorType.Liner, 0x04);
        data = driver.i2cReceiveBytes(SensorType.Liner, 4);
        return (data[0] + data[1] * 256 + data[2] * 65536);
    }
}