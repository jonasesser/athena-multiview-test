import { AthenaClient } from '@AthenaClient/api/athena';
import * as alt from 'alt-client';
let openedMenuCount: number;

export class MenuHelper {
    static init() {
        openedMenuCount = 0;
    }

    static isMenuOpened(): boolean {
        return openedMenuCount > 0;
    }

    static openMenu() {
        openedMenuCount++;
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);
        alt.toggleGameControls(false);
        alt.Player.local.isMenuOpen = true;
    }

    static closeMenu() {
        openedMenuCount--;
        if (!MenuHelper.isMenuOpened()) {
            alt.toggleGameControls(true);
            AthenaClient.webview.unfocus();
            AthenaClient.webview.showCursor(false);
            alt.Player.local.isMenuOpen = false;
        }
    }
}
