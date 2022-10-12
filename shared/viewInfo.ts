export const ExampleWebViewEvents = {
    ViewName1: 'MultitestView1',
    ViewName2: 'MultitestView2', // This needs to match the `.vue` file name.

    ClientServer1: {
        OPEN: 'MultitestView1:webview:event:open',
        CLOSE: 'MultitestView1:webview:event:close',
    },
    ClientToWebView1: {
        LOAD_PLAYERS: 'MultitestView1:webview:event:loadplayers',
    },
    ServerToWebView1: {
        REFRESH_PLAYERS: 'MultitestView1:webview:event:refreshplayers',
    },
    WebViewToServer1: {
        KICK_PLAYER: 'MultitestView1:webview:event:kick',
        REQUEST_REFRESH: 'MultitestView1:webview:event:requestrefresh',
    },
    ClientServer2: {
        OPEN: 'MultitestView2:webview:event:open',
        CLOSE: 'MultitestView2:webview:event:close',
    },
    ClientToWebView2: {
        LOAD_PLAYERS: 'MultitestView2:webview:event:loadplayers',
    },
    ServerToWebView2: {
        REFRESH_PLAYERS: 'MultitestView2:webview:event:refreshplayers',
    },
    WebViewToServer2: {
        KICK_PLAYER: 'MultitestView2:webview:event:kick',
        REQUEST_REFRESH: 'MultitestView2:webview:event:requestrefresh',
    },
};
