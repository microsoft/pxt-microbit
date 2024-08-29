export function patchBlocks(pkgTargetVersion: string, dom: Element) {

    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "7.0.13") <= 0) {
        // Variable pin param
        /*
        <block type="device_get_digital_pin">
            <field name="name">DigitalPin.P0</field>
        </block>

        converts to

        <block type="device_get_digital_pin">
            <value name="name">
                <shadow type="digital_pin">
                    <field name="pin">DigitalPin.P0</field>
                </shadow>
            </value>
        </block>
        */
        pxt.U.toArray(dom.querySelectorAll("block[type=device_get_digital_pin]"))
            .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_get_digital_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_digital_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_get_analog_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_get_analog_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_analog_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_analog_period]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=pins_pulse_in]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=pins_pulse_in]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_servo_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_servo_pulse]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_analog_set_pitch_pin]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_pull]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_set_pin_events]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=pin_neopixel_matrix_width]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=spi_pins]")))
            .concat(pxt.U.toArray(dom.querySelectorAll("block[type=pin_set_audio_pin]")))
            .forEach(node => {
                const blockType = node.getAttribute("type");
                pxt.U.toArray(node.children)
                    .filter(oldPinNode => {
                        if (oldPinNode.tagName != "field") return false;
                        switch (blockType) {
                            case "device_get_digital_pin":
                            case "device_set_digital_pin":
                            case "device_get_analog_pin":
                            case "device_set_analog_pin":
                            case "pins_pulse_in":
                            case "device_set_servo_pin":
                            case "device_analog_set_pitch_pin":
                            case "pin_set_audio_pin":
                                return oldPinNode.getAttribute("name") === "name";
                            case "device_set_analog_period":
                            case "device_set_pull":
                            case "device_set_pin_events":
                            case "pin_neopixel_matrix_width":
                                return oldPinNode.getAttribute("name") === "pin";
                            case "device_set_servo_pulse":
                                return oldPinNode.getAttribute("name") === "value";
                            case "spi_pins":
                                return ["mosi", "miso", "sck"].includes(oldPinNode.getAttribute("name"));
                        }
                        return false;
                    })
                    .forEach(oldPinNode => {
                        const valueNode = node.ownerDocument.createElement("value");
                        valueNode.setAttribute("name", oldPinNode.getAttribute("name"));

                        let nodeText = oldPinNode.textContent;
                        const pinShadowNode = node.ownerDocument.createElement("shadow");
                        const [enumName, pinName] = nodeText.split(".");

                        let pinBlockType;
                        switch (enumName) {
                            case "DigitalPin":
                                pinBlockType = "digital_pin_shadow";
                                break;
                            case "AnalogPin":
                                pinBlockType = "analog_pin_shadow";
                                break;
                        }
                        if (!pinBlockType) return;

                        // If this is one of the read/write pins, narrow to the read write shadow
                        if (blockType === "device_get_analog_pin") {
                            switch (pinName) {
                                case "P0":
                                case "P1":
                                case "P2":
                                case "P3":
                                case "P4":
                                case "P10":
                                    pinBlockType = "analog_read_write_pin_shadow";
                                    nodeText = `AnalogReadWritePin.${pinName}`;
                                    break;
                            }
                        }

                        pinShadowNode.setAttribute("type", pinBlockType);

                        const fieldNode = node.ownerDocument.createElement("field");
                        fieldNode.setAttribute("name", "pin");
                        fieldNode.textContent = nodeText;

                        pinShadowNode.appendChild(fieldNode);
                        valueNode.appendChild(pinShadowNode);
                        node.replaceChild(valueNode, oldPinNode);
                    });
            });
    }

    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "5.0.12") <= 0) {
        // Eighth note misspelling
        /*
        <block type="basic_show_icon">
            <field name="i">IconNames.EigthNote</field>
        </block>

        converts to

        <block type="basic_show_icon">
            <field name="i">IconNames.EighthNote</field>
        </block>
        */
        pxt.U.toArray(dom.querySelectorAll("block[type=basic_show_icon]>field[name=i]"))
            .filter(node => node.textContent === "IconNames.EigthNote")
            .forEach(node => node.textContent = "IconNames.EighthNote");

        // Italian translation error
        /*
        <shadow type="device_note">
            <field name="note">466</field>
        </shadow>

        converts to

        <shadow type="device_note">
            <field name="name">466</field>
        </shadow>
        */
        pxt.U.toArray(dom.querySelectorAll("shadow[type=device_note]>field[name=note]"))
            .forEach(node => node.setAttribute("name", "name"));
    }

    // is this a old script?
    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "1.0.0") >= 0) return;

    // showleds
    /**
    <block type="device_show_leds">
        <field name="LED00">FALSE</field>
        <field name="LED10">FALSE</field>
        <field name="LED20">FALSE</field>
        <field name="LED30">FALSE</field>
        <field name="LED40">FALSE</field>
        <field name="LED01">FALSE</field>
        <field name="LED11">FALSE</field>
        <field name="LED21">FALSE</field>
        <field name="LED31">TRUE</field>
        <field name="LED41">FALSE</field>
        <field name="LED02">FALSE</field>
        <field name="LED12">FALSE</field>
        <field name="LED22">FALSE</field>
        <field name="LED32">FALSE</field>
        <field name="LED42">FALSE</field>
        <field name="LED03">FALSE</field>
        <field name="LED13">TRUE</field>
        <field name="LED23">FALSE</field>
        <field name="LED33">FALSE</field>
        <field name="LED43">FALSE</field>
        <field name="LED04">FALSE</field>
        <field name="LED14">FALSE</field>
        <field name="LED24">FALSE</field>
        <field name="LED34">FALSE</field>
        <field name="LED44">FALSE</field>
    </block>

    converts to

    <block type="device_show_leds">
        <field name="LEDS">`
            . . . . .
            . . . # .
            . . . . .
            . # . . .
            . . . . .
            `
        </field>
    </block>
    */
    pxt.U.toArray(dom.querySelectorAll("block[type=device_show_leds]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_build_image]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_build_image]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_build_big_image]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_build_big_image]")))
        .forEach(node => {
            // don't rewrite if already upgraded, eg. field LEDS already present
            if (pxt.U.toArray(node.children).filter(child => child.tagName == "field" && "LEDS" == child.getAttribute("name"))[0])
                return;
            // read LEDxx value and assmebly into a new field
            const leds: string[][] = [[], [], [], [], []];
            pxt.U.toArray(node.children)
                .filter(child => child.tagName == "field" && /^LED\d+$/.test(child.getAttribute("name")))
                .forEach(lednode => {
                    let n = lednode.getAttribute("name");
                    let col = parseInt(n[3]);
                    let row = parseInt(n[4]);
                    leds[row][col] = lednode.innerHTML == "TRUE" ? "#" : ".";
                    // remove node
                    node.removeChild(lednode);
                });
            // add new field
            const f = node.ownerDocument.createElement("field");
            f.setAttribute("name", "LEDS");
            const s = '`\n' + leds.map(row => row.join('')).join('\n') + '\n`';
            f.appendChild(node.ownerDocument.createTextNode(s));
            node.insertBefore(f, null);
        });

    // radio
    /*
    <block type="radio_on_packet" x="174" y="120">
        <mutation callbackproperties="receivedNumber" renamemap="{}"></mutation>
        <field name="receivedNumber">receivedNumber</field>
    </block>
    <block type="radio_on_packet" disabled="true" x="127" y="263">
        <mutation callbackproperties="receivedString,receivedNumber" renamemap="{&quot;receivedString&quot;:&quot;name&quot;,&quot;receivedNumber&quot;:&quot;value&quot;}"></mutation>
        <field name="receivedString">name</field>
        <field name="receivedNumber">value</field>
    </block>
    <block type="radio_on_packet" disabled="true" x="162" y="420">
        <mutation callbackproperties="receivedString" renamemap="{}"></mutation>
        <field name="receivedString">receivedString</field>
    </block>

    converts to

    <block type="radio_on_number" x="196" y="208">
        <field name="HANDLER_receivedNumber" id="DCy(W;1)*jLWQUpoy4Mm" variabletype="">receivedNumber</field>
    </block>
    <block type="radio_on_value" x="134" y="408">
        <field name="HANDLER_name" id="*d-Jm^MJXO]Djs(dTR*?" variabletype="">name</field>
        <field name="HANDLER_value" id="A6HQjH[k^X43o3h775+G" variabletype="">value</field>
    </block>
    <block type="radio_on_string" x="165" y="583">
        <field name="HANDLER_receivedString" id="V9KsE!h$(iO?%W:[32CV" variabletype="">receivedString</field>
    </block>
    */
    const varids: pxt.Map<string> = {};

    function addField(node: Element, renameMap: pxt.Map<string>, name: string) {
        const f = node.ownerDocument.createElement("field");
        f.setAttribute("name", "HANDLER_" + name)
        f.setAttribute("id", varids[renameMap[name] || name]);
        f.appendChild(node.ownerDocument.createTextNode(name));
        node.appendChild(f);
    }

    pxt.U.toArray(dom.querySelectorAll("variable")).forEach(node => varids[node.innerHTML] = node.getAttribute("id"));
    pxt.U.toArray(dom.querySelectorAll("block[type=radio_on_packet]"))
        .forEach(node => {
            const mutation = node.querySelector("mutation");
            if (!mutation) return;
            const renameMap = JSON.parse(node.getAttribute("renamemap") || "{}");
            const props = mutation.getAttribute("callbackproperties");

            if (props) {
                const parts = props.split(",");

                // It's tempting to generate radio_on_number if parts.length === 0 but
                // that would create a variable named "receivedNumber" and possibly shadow
                // an existing variable in the user's program. It's safer to stick to the
                // old block.
                if (parts.length === 1) {
                    if (parts[0] === "receivedNumber") {
                        node.setAttribute("type", "radio_on_number");
                        node.removeChild(node.querySelector("field[name=receivedNumber]"));
                        addField(node, renameMap, "receivedNumber");
                    }
                    else if (parts[0] === "receivedString") {
                        node.setAttribute("type", "radio_on_string");
                        node.removeChild(node.querySelector("field[name=receivedString]"));
                        addField(node, renameMap, "receivedString");
                    }
                    else {
                        return;
                    }
                    node.removeChild(mutation);
                }
                else if (parts.length === 2 && parts.indexOf("receivedNumber") !== -1 && parts.indexOf("receivedString") !== -1) {
                    node.setAttribute("type", "radio_on_value");
                    node.removeChild(node.querySelector("field[name=receivedNumber]"));
                    node.removeChild(node.querySelector("field[name=receivedString]"));
                    addField(node, renameMap, "name");
                    addField(node, renameMap, "value");
                    node.removeChild(mutation);
                }
            }
        })


    // device_random now refers to randomRange() so we need to add the missing lower bound argument
    pxt.U.toArray(dom.querySelectorAll("block[type=device_random]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_random]")))
        .forEach(node => {
            if (getValue(node, "min")) return;
            const v = node.ownerDocument.createElement("value");
            v.setAttribute("name", "min");
            addNumberShadow(v);
            node.appendChild(v);
        });

    /*
    <block type="math_arithmetic">
        <field name="OP">DIVIDE</field>
        <value name="A">
            <shadow type="math_number"><field name="NUM">0</field></shadow>
            <block type="math_number"><field name="NUM">2</field></block>
        </value>
        <value name="B">
            <shadow type="math_number"><field name="NUM">1</field></shadow>
            <block type="math_number"><field name="NUM">3</field></block>
        </value>
    </block>
    */
    pxt.U.toArray(dom.querySelectorAll("block[type=math_arithmetic]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=math_arithmetic]")))
        .forEach(node => {
            const op = getField(node, "OP");
            if (!op || op.textContent.trim() !== "DIVIDE") return;

            // Convert to integer division
            /*
            <block type="math_js_op">
                <mutation op-type="infix"></mutation>
                <field name="OP">idiv</field>
                <value name="ARG0">
                    <shadow type="math_number"><field name="NUM">0</field></shadow>
                </value>
                <value name="ARG1">
                    <shadow type="math_number"><field name="NUM">0</field></shadow>
                </value>
            </block>
            */

            node.setAttribute("type", "math_js_op");
            op.textContent = "idiv";

            const mutation = node.ownerDocument.createElement("mutation");
            mutation.setAttribute("op-type", "infix");
            // mutation has to be first or Blockly will drop the second argument
            node.insertBefore(mutation, node.firstChild);

            const a = getValue(node, "A");
            if (a) a.setAttribute("name", "ARG0");

            const b = getValue(node, "B");
            if (b) b.setAttribute("name", "ARG1");
        });

    renameField(dom, "math_number_minmax", "NUM", "SLIDER");
    renameField(dom, "device_note", "note", "name");
}

function renameField(dom: Element, blockType: string, oldName: string, newName: string) {
    pxt.U.toArray(dom.querySelectorAll(`block[type=${blockType}]`))
        .concat(pxt.U.toArray(dom.querySelectorAll(`shadow[type=${blockType}]`)))
        .forEach(node => {
            const thefield = getField(node, oldName);
            if (thefield) {
                thefield.setAttribute("name", newName);
            }
        });
}


function getField(parent: Element, name: string) {
    return getFieldOrValue(parent, name, true);
}

function getValue(parent: Element, name: string) {
    return getFieldOrValue(parent, name, false);
}

function getFieldOrValue(parent: Element, name: string, isField: boolean) {
    const nodeType = isField ? "field" : "value";
    for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children.item(i);
        if (child.tagName === nodeType && child.getAttribute("name") === name) {
            return child;
        }
    }
    return undefined;
}

function addNumberShadow(valueNode: Element) {
    const s = valueNode.ownerDocument.createElement("shadow");
    s.setAttribute("type", "math_number");

    const f = valueNode.ownerDocument.createElement("field");
    f.setAttribute("name", "NUM");
    f.textContent = "0";

    s.appendChild(f);
    valueNode.appendChild(s);
}
