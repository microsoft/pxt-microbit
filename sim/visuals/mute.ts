namespace pxsim {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"/></svg>`;

    // We only need to unmute from within the iframe once
    let hasUnmuted = false;

    export function createMuteButton() {
        const el = document.createElement("div");
        el.setAttribute("id", "safari-mute-button-outer");
        el.innerHTML = `
            <button class="safari-mute-button">
                ${icon}
            </button>
        `;

        const button = el.firstElementChild as HTMLButtonElement;
        button.setAttribute("title", pxsim.localization.lf("Unmute simulator"));

        button.addEventListener("click", () => {
            AudioContextManager.mute(false);
            setParentMuteState("unmuted");
            button.remove();
            hasUnmuted = true;
        });

        return el;
    }

    export function shouldShowMute() {
        return isSafari() && !hasUnmuted;
    }

    // Everything below is taken from browserutils in pxt

    export function hasNavigator(): boolean {
        return typeof navigator !== "undefined";
    }

    //Microsoft Edge lies about its user agent and claims to be Chrome, but Microsoft Edge/Version
    //is always at the end
    export function isEdge(): boolean {
        return hasNavigator() && /Edge/i.test(navigator.userAgent);
    }

    //IE11 also lies about its user agent, but has Trident appear somewhere in
    //the user agent. Detecting the different between IE11 and Microsoft Edge isn't
    //super-important because the UI is similar enough
    export function isIE(): boolean {
        return hasNavigator() && /Trident/i.test(navigator.userAgent);
    }

    //Microsoft Edge and IE11 lie about being Chrome. Chromium-based Edge ("Edgeium") will be detected as Chrome, that is ok. If you're looking for Edgeium, use `isChromiumEdge()`.
    export function isChrome(): boolean {
        return !isEdge() && !isIE() && !!navigator && (/Chrome/i.test(navigator.userAgent) || /Chromium/i.test(navigator.userAgent));
    }

    //Chrome and Microsoft Edge lie about being Safari
    export function isSafari(): boolean {
        //Could also check isMac but I don't want to risk excluding iOS
        //Checking for iPhone, iPod or iPad as well as Safari in order to detect home screen browsers on iOS
        return !isChrome() && !isEdge() && !!navigator && /(Macintosh|Safari|iPod|iPhone|iPad)/i.test(navigator.userAgent);
    }
}