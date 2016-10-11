namespace messages {
    var streamid: string;
        
    export function setStreamId(id: string) {
        streamid = id;
    }
    
    /**
     * Creates a new message that includes the board serial number and the stream id if any
     */
    export function createMessage() : Message {
        let m = new Message();
        m.addNumber('board', control.deviceSerialNumber());
        if (streamid != null && streamid.length > 0)
            m.addString('stream', streamid);
        return m;
    }
    
    /**
     * A message containig custom data
     */
    export class Message {
        private buffer:string = '';
        
        /**
         * Adds a string field to the message
         */
        //%
        public addString(name:string, value:string) {
            if (this.buffer.length > 0) this.buffer += ',';
            this.buffer += name + ':"' + value + '"';
        }
        
        /**
         * Adds a number field to the message
         */
        //%
        public addNumber(name:string, value: number) {
            if (this.buffer.length > 0) this.buffer += ',';
            this.buffer += name + ':' + value;            
        }
        
        /**
         * Converts the message to a JSON payload
         */
        //%
        public toJSON() : string {
            return '{' + this.buffer + '}';
        }        
    }
}