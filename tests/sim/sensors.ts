// @serial: temperature ok
// @serial: rotation ok
let t = input.temperature()
console.log(t > -100 && t < 200 ? "temperature ok" : "temperature bad " + t)
let r = input.rotation(Rotation.Pitch)
console.log(r >= -180 && r <= 180 ? "rotation ok" : "rotation bad " + r)
