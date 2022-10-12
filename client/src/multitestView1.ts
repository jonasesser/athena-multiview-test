import { WebViewController } from '@AthenaClient/extensions/view2';
import { disableAllControls } from '@AthenaClient/utility/disableControls';
import * as alt from 'alt-client';
import { AthenaClient } from '../../../../client/api/athena';
import { ExampleWebViewEvents } from '../../shared/viewInfo';
import { MenuHelper } from './menuHelper';

let players1: alt.Player[];

export class MultitestView1 {
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
        players1 = _players;
        // if (AthenaClient.webview.isAnyMenuOpen(true)) {
        //     return;
        // }
        alt.log('Open MultitestView1');

        AthenaClient.webview.ready(ExampleWebViewEvents.ViewName1, MultitestView1.ready);
        // AthenaClient.webview.open([ExampleWebViewEvents.ViewName1], true, MultitestView1.close);
        AthenaClient.webview.open([ExampleWebViewEvents.ViewName1]);
        MenuHelper.openMenu();
    }

    /**
     * A ready event to send the data up to the WebView.
     *
     * @static
     * @memberof ExampleWebView
     */
    static ready() {
        AthenaClient.webview.on(ExampleWebViewEvents.ClientServer1.CLOSE, MultitestView1.close);
        AthenaClient.webview.emit(ExampleWebViewEvents.ClientToWebView1.LOAD_PLAYERS, players1);
    }

    /**
     * Called when the WebView event is closed.
     *
     * @static
     * @memberof ExampleWebView
     */
    static close() {
        players1 = undefined;

        MenuHelper.closeMenu();

        //TODO How to close multiple pages with AthenaClient.webview?
        WebViewController.closePages([ExampleWebViewEvents.ViewName1]);
    }
}

alt.onServer(ExampleWebViewEvents.ClientServer1.OPEN, MultitestView1.open);
