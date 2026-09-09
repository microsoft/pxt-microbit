# UNB branding demo

Branch: `demo/unb-branding`.

This small demo uses target-level settings so the shared PXT framework does not need modification.

- `pxtarget.json`: sets the organization name, link, and logo to UNB. The micro:bit target logo remains in place.
- `theme/color-themes/microbit-light.json`: changes the light-theme header to demo red (`#D00000`) and its hover/stencil colour to `#A60000`. Dark and high-contrast themes retain their existing colours.
- `docs/static/unb/unb-logo-white.png`: original logo downloaded from https://www.unb.ca/webcomps/_css/unb_logo_white.png on 2026-09-08. Source website: https://www.unb.ca/. The red is a demo choice, not a claim about UNB's official brand palette.

## Preview

Run `pxt serve` from the repository root and open the full localhost URL printed by PXT (port 3232; port 3233 is the WebSocket service). Select the Micro:bit Light theme if necessary. Check the red navigation header and UNB organization logo on the homepage and in a project, including a narrow browser window.

## Upstream updates

Keep UNB assets and notes in these dedicated directories. Review the small target configuration and light-theme changes when merging upstream updates. Do not customize installed files under `node_modules`. Commit only the demo files; running PXT may also modify generated library strings and shim declarations.
