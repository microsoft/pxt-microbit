namespace control.__screen {
    let __update: () => void
    let __updated = false;

    export function update() {
        if (__update)
            __update()
        __updated = true
    }

    export function setupUpdate(update: () => void) {
        __updated = true;
        __update = update;
        update()
    }

    // low frequency fallback screen refresh
    control.runInParallel(() => {
        while (true) {
            __updated = false
            pause(200)
            if (!__updated) {
                __screen.update();
                __updated = true
            }
        }
    })
}
