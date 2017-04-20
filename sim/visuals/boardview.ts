namespace pxsim.visuals {
    mkBoardView = (opts: BoardViewOptions): BoardView => {
        return new visuals.MicrobitBoardSvg({
            runtime: runtime,
            theme: visuals.randomTheme(opts.highContrast),
            disableTilt: false,
            wireframe: opts.wireframe
        });
    }
}