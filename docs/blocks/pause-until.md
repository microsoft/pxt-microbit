# pause Until

Pause the current part of the program until a condition becomes true.

```sig
pauseUntil(() => true)
```

Sometimes you need to wait in one part of a program for something to happen somewhere else in the program. This is done by pausing until some condition elsewhere becomes ``true``. Such a condition could be a value you set in an event block or a function that returns a [boolean](/types/boolean).

## Parameters

* **condition**: a [boolean](/types/boolean) condition that restarts the program when it becomes ``true``.
* **timeOut**: an optional paramenter which is a [number](/types/number) of milliseconds to wait for the **condition** to become ``true``. The pause ends when the timeout has elapsed even if **condition** is still ``false``.

### ~hint

#### Other code will run too

The code you have in **events** blocks will continue to execute while the current part of your program is paused.

### ~

## Example

Wait on a five second timer function.

```blocks
function waitFiveSeconds() : boolean {
    for (let i = 0; i < 5000; i++) {
        control.waitMicros(1000)
    }
    return true
}
pauseUntil(() => waitFiveSeconds())
```

## See also

[pause](/reference/basic/pause)