{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    # Set all sorts of vars for Playwright.
    PLAYWRIGHT_NODEJS_PATH = "${pkgs.nodejs}/bin/node";
    PLAYWRIGHT_LAUNCH_OPTIONS_EXECUTABLE_PATH = "${pkgs.playwright-driver.browsers}/chromium-1134/chrome-linux/chrome";
    PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";

    shellHook = ''
        export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="${pkgs.playwright-driver.browsers}/chromium-1134/chrome-linux/chrome"
        export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
        export PATH="$PWD/node_modules/.bin:$PATH"
    '';
    buildInputs = with pkgs; [
        jq  # required for playwright
        nodejs
        playwright-driver  # required for playwright
    ];
}
