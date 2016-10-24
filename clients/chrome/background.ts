// A list of: {
//   id: number;
//   path: string;
// } where [id] is the [connectionId] (internal to Chrome) and [path] is the
// OS' name for the device (e.g. "COM4").
interface Connection {
  id: string;
  path: string;
}
let connections: Connection[] = [];

// A list of "ports", i.e. connected clients (such as web pages). Multiple web
// pages can connect to our service: they all receive the same data.
let ports = [];

interface Message {
  type: string;
  data: string;
  id: string;
}

function byPath(path: string): Connection[] {
  return connections.filter((x) => x.path == path);
}

function byId(id: string): Connection[] {
  return connections.filter((x) => x.id == id);
}

function onReceive(data, id: string) {
  if (ports.length == 0) return;

  let view = new DataView(data);
  let decoder = new TextDecoder("utf-8");
  let decodedString = decoder.decode(view);
  ports.forEach(port => port.postMessage(<Message>{
    type: "serial",
    data: decodedString,
    id: id,
  }));
}

function findNewDevices() {
  chrome.serial.getDevices(function (serialPorts) {
    serialPorts.forEach(function (serialPort) {
      if (byPath(serialPort.path).length == 0 &&
        serialPort.displayName == "mbed Serial Port") {
        chrome.serial.connect(serialPort.path, { bitrate: 115200 }, function (info) {
          // In case the [connect] operation takes more than five seconds...
          if (info && byPath(serialPort.path).length == 0)
            connections.push({
              id: info.connectionId,
              path: serialPort.path
            });
        });
      }
    });
  });
}

function main() {
  // Register new clients in the [ports] global variable.
  chrome.runtime.onConnectExternal.addListener(function (port) {
    if (/^(micro:bit|touchdevelop|yelm|pxt|codemicrobit|codethemicrobit|pxt.microbit.org)$/.test(port.name)) {
      ports.push(port);
      port.onDisconnect.addListener(function () {
        ports = ports.filter(function (x) { return x != port });
      });
    }
  });

  // When receiving data for one of the connections that we're tracking, forward
  // it to all connected clients.
  chrome.serial.onReceive.addListener(function (info) {
    if (byId(info.connectionId).length > 0)
      onReceive(info.data, info.connectionId);
  });

  // When it looks like we've been disconnected, drop the corresponding
  // connection object from the [connections] global variable.
  chrome.serial.onReceiveError.addListener(function (info) {
    if (info.error == "system_error" || info.error == "disconnected" || info.error == "device_lost")
      connections = connections.filter((x) => x.id != info.connectionId);
  });

  // Probe serial connections at regular intervals. In case we find an mbed port
  // we haven't yet connected to, connect to it.
  setInterval(findNewDevices, 5000);
  findNewDevices();
}

document.addEventListener("DOMContentLoaded", main);
