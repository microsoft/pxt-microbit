# Custom object types

Touch Develop docs for the @boardname@.

### What is an object?

An object allows you to bundle several related pieces of data. For instance, if you have a player on the screen, there are two pieces of data that make up the object: its `x` position, and its `y` position. Therefore, we will define a player to be an *object* with two *fields*: the `x` field and the `y` field. By grouping related variables together in a single object, you reduce confusion in your script and eliminate some errors.

### What is an object type?

In order to use objects, we must first define an object type. More concretely, in order to create a new player, we must define what a player *is*. In our case, the type of players is the type of objects with two fields `x` and `y` of type `Number`.

Creating an object type is done in the following manner. Hit "add new", then hit "object type".

![](/static/mb/object-types-0.png)(picture foobar2)
WARN: unknown picture: foobar2

You can change the name of the type by clicking on it (i.e. replace `Thing` with `Player`). You can also add two fields of type number. Once this is done, here's what you should see.

![](/static/mb/object-types-1.png)

We have now defined what a player is (it has an `x` field and a `y` field). `Player` is a type, just like `Number` and `String`. However, we have not created any player yet.

### Creating objects and using them

To create a new *variable* of a given type, you can call the `create` operation on `Player`.

```
let p = new Player()
```

Just like `var x := 3` creates a new variable (`x`) of type `Number`, the line above creates a new variable (`p`) of type `Player`. We say that `p` is an *instance* of `Player`.

If you want to *modify* (mutate) `p`, here's how you do it.

```
p.x = 5
```

You can read the *fields* of `p` as follows.

```
basic.showString("My player is at x = ", 150)
basic.showNumber(p.x, 150)
```

That is, the generic syntax for accessing a field `x` of an object `p` is `p → x`.

If there are multiple players in your game, you may want to create a collection of them.

```
let c = (<Player[]>[])
c.push(new Player())
```

A good example of using objects is in the game pac-man runaway. Search for it, read it and clone it!

