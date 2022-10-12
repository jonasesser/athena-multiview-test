import { AthenaClient } from '@AthenaClient/api/athena';
import { WebViewController } from '@AthenaClient/extensions/view2';
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
        alt.log('Open menu, count: ' + openedMenuCount);
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);
        alt.toggleGameControls(false);
        alt.Player.local.isMenuOpen = true;
    }

    static closeMenu() {
        openedMenuCount--;
        alt.log('Close menu, count: ' + openedMenuCount);
        if (!MenuHelper.isMenuOpened()) {
            alt.log('Close last menu');
            alt.toggleGameControls(true);
            AthenaClient.webview.unfocus();
            AthenaClient.webview.showCursor(false);
            WebViewController.setOverlaysVisible(true);
            alt.Player.local.isMenuOpen = false;
        }
    }
}
