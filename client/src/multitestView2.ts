import { WebViewController } from '@AthenaClient/extensions/view2';
import { disableAllControls } from '@AthenaClient/utility/disableControls';
import * as alt from 'alt-client';
import { AthenaClient } from '../../../../client/api/athena';
import { ExampleWebViewEvents } from '../../shared/viewInfo';
import { MenuHelper } from './menuHelper';

let players2: alt.Player[];

export class MultitestView2 {
    static init() {}

    /**
     * Opens the WebView.
     * The function call is from the server-side.
     *
     * @static
     * @param {alt.Player[]} _players
     * @return {*}
     * @memberof ExampleWebView
     */
    static open(_players: alt.Player[]) {
        players2 = _players;
        // if (AthenaClient.webview.isAnyMenuOpen(true)) {
        //     return;
        // }

        alt.log('Open MultitestView2');

        AthenaClient.webview.ready(ExampleWebViewEvents.ViewName2, MultitestView2.ready);
        // AthenaClient.webview.open([ExampleWebViewEvents.ViewName2], true, MultitestView2.close);
        AthenaClient.webview.open([ExampleWebViewEvents.ViewName2]);
        MenuHelper.openMenu();
    }

    /**
     * A ready event to send the data up to the WebView.
     *
     * @static
     * @memberof ExampleWebView
     */
    static ready() {
        AthenaClient.webview.on(ExampleWebViewEvents.ClientServer2.CLOSE, MultitestView2.close);
        AthenaClient.webview.emit(ExampleWebViewEvents.ClientToWebView2.LOAD_PLAYERS, players2);
    }

    /**
     * Called when the WebView event is closed.
     *
     * @static
     * @memberof ExampleWebView
     */
    static close() {
        players2 = undefined;

        MenuHelper.closeMenu();

        WebViewController.off(ExampleWebViewEvents.ClientServer1.CLOSE, MultitestView2.close);
        //TODO How to close multiple page with AthenaClient.webview?
        WebViewController.closePages([ExampleWebViewEvents.ViewName2]);
    }
}

alt.onServer(ExampleWebViewEvents.ClientServer2.OPEN, MultitestView2.open);
