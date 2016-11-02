# Objects disclaimer

Touch Develop docs for the @boardname@.

### Memory management on the micro-bit

New user-defined object types are allocated on the heap and are ref-counted. Our ref-counting algorithm does *not* have a cycle collector. (See Wikipedia.)

### Practical consequences

This means that the following script will result in an out-of-memory error.

![](/static/mb/object-disclaimer-0.png)

```
while (true) {
    let l = new List()
    l.next = l
}
```

### How to avoid this?

Don't do it. It's bad.

