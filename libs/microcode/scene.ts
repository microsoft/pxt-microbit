namespace microcode {
    const INPUT_PRIORITY = 10
    const UPDATE_PRIORITY = 20
    const RENDER_PRIORITY = 30
    const SCREEN_PRIORITY = 100

    export abstract class Scene implements IComponent {
        private xfrm_: Affine
        private color_: number
        private backgroundCaptured_ = false

        //% blockCombine block="xfrm" callInDebugger
        public get xfrm() {
            return this.xfrm_
        }
        //% blockCombine block="color" callInDebugger
        public get color() {
            return this.color_
        }
        public set color(v) {
            this.color_ = v
        }

        constructor(public app: App, public name: string) {
            this.xfrm_ = new Affine()
            this.color_ = 12
        }

        /* abstract */ startup() {
            if (Options.menuProfiling) {
                control.onEvent(
                    ControllerButtonEvent.Pressed,
                    controller.menu.id,
                    () => {
                        control.heapSnapshot()
                    }
                )
            }
        }

        /* abstract */ shutdown() {}

        /* override */ activate() {
            pointerevents.pushContext(
                (x, y) => this.handleClick(x, y),
                (x, y) => this.handleMove(x, y),
                (dx, dy) => this.handleWheel(dx, dy)
            )
            profile()
        }

        /* override */ deactivate() {
            pointerevents.popContext()
            profile()
        }

        /* abstract */ update() {}

        /* abstract */ draw() {}

        protected handleClick(x: number, y: number) {}

        protected handleMove(x: number, y: number) {}

        protected handleWheel(dx: number, dy: number) {}

        get backgroundCaptured() {
            return !!this.backgroundCaptured_
        }

        /**
         * Captures the current screen image as background image. You must call releaseBackground to resume usual rendering.
         */
        captureBackground() {
            control.assert(
                !this.backgroundCaptured_,
                ERROR_DOUBLE_BACKGROUND_CAPTURE
            )
            this.backgroundCaptured_ = true
        }

        releaseBackground() {
            this.backgroundCaptured_ = false
        }

        __init() {
            control.eventContext().registerFrameHandler(INPUT_PRIORITY, () => {
                control.enablePerfCounter()
                const dtms = (control.eventContext().deltaTime * 1000) | 0
                controller.left.__update(dtms)
                controller.right.__update(dtms)
                controller.up.__update(dtms)
                controller.down.__update(dtms)
            })
            // Setup frame callbacks.
            control.eventContext().registerFrameHandler(UPDATE_PRIORITY, () => {
                control.enablePerfCounter()
                this.update()
            })
            control.eventContext().registerFrameHandler(RENDER_PRIORITY, () => {
                control.enablePerfCounter()
                // perf: render directly on the background image buffer
                this.draw()
                if (Options.fps)
                    Screen.image.print(control.EventContext.lastStats, 1, 1, 15)
                if (screen !== Screen.image)
                    screen.drawImage(Screen.image, 0, 0)
            })
            control.eventContext().registerFrameHandler(SCREEN_PRIORITY, () => {
                control.enablePerfCounter()
                control.__screen.update()
            })
        }
    }

    export class SceneManager {
        scenes: Scene[]

        constructor() {
            this.scenes = []
        }

        public pushScene(scene: Scene) {
            const currScene = this.currScene()
            if (currScene) {
                currScene.deactivate()
            }
            control.pushEventContext()
            this.scenes.push(scene)
            scene.startup()
            scene.activate()
            scene.__init()
        }

        public popScene() {
            const prevScene = this.scenes.pop()
            if (prevScene) {
                prevScene.deactivate()
                prevScene.shutdown()
                control.popEventContext()
            }
            const currScene = this.currScene()
            if (currScene) {
                currScene.activate()
            }
        }

        private currScene(): Scene {
            if (this.scenes.length) {
                return this.scenes[this.scenes.length - 1]
            }
            return undefined
        }
    }
}

// this is needed for compat with most recent version of arcade
namespace game {
    export function addScenePushHandler(handler: (oldScene: any) => void) {}

    export function addScenePopHandler(handler: (oldScene: any) => void) {}
}
