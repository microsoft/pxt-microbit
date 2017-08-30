let fs = require("fs")
let s = fs.readFileSync(process.argv[2], "utf8")
let infun = false
let words = []
for (let l of s.split(/\n/)) {
    let m = /^00000000 <(.*)>:/.exec(l)
    if (m && m[1] == process.argv[3]) infun = true
    if (/^Disassembly/.test(l)) infun = false
    if (!infun) continue
    m = /^\s*[0-9a-f]+:\s+([0-9a-f]+)( ([0-9a-f]{4}))?\s+/.exec(l)
    if (m) {
        let n = m[1]
        words.push(n)
        if (m[3])
            words.push(m[3])
        if (n.length == 4 || n.length == 8) {
            // ok
        } else {
            throw new Error()
        }
    }
}

let ww = []
let pref = ""
for (let w of words) {
    if (w.length == 8) {
        if (pref) throw new Error()
        ww.push("0x" + w)
    } else {
        if (pref) {
            ww.push("0x" + w + pref)
            pref = ""
        } else {
            pref = w
        }
    }
}

words = ww

let r = ""
for (let i = 0; i < words.length; i++) {
    if (i % 6 == 0) r += "\n"
    r += words[i] + ", "
}

console.log(r)