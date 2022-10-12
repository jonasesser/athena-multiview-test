import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { PERMISSIONS } from '../../../../shared/flags/permissionFlags';
import { isFlagEnabled } from '../../../../shared/utility/flags';
import { ExPlayerInfo } from '../../shared/interfaces';
import { ExampleWebViewEvents } from '../../shared/viewInfo';

export class MultitestView2Server {
    static init() {
        console.log(`Commands for Example WebView Created`);
        alt.onClient(ExampleWebViewEvents.WebViewToServer2.KICK_PLAYER, MultitestView2Server.handleKickPlayer);
        alt.onClient(ExampleWebViewEvents.WebViewToServer2.REQUEST_REFRESH, MultitestView2Server.handleRefresh);
    }

    // @command('multiviewtest', '/multiviewtest - Just to test multiple views', PERMISSIONS.ADMIN)
    // static handleCommand(player: alt.Player) {
    //     alt.emitClient(player, ExampleWebViewEvents.ClientServer1.OPEN, MultitestView1Server.getAvailablePlayers());
    //     alt.emitClient(player, ExampleWebViewEvents.ClientServer2.OPEN, MultitestView1Server.getAvailablePlayers());
    // }

    private static handleRefresh(player: alt.Player) {
        console.log('got refresh event');

        Athena.webview.emit(
            player,
            ExampleWebViewEvents.ServerToWebView2.REFRESH_PLAYERS,
            MultitestView2Server.getAvailablePlayers(),
        );
    }

    private static handleKickPlayer(player: alt.Player, idToKick: number) {
        if (!isFlagEnabled(player.accountData.permissionLevel, PERMISSIONS.ADMIN)) {
            return;
        }

        const target = Athena.systems.identifier.getPlayer(idToKick);
        if (!target || !target.valid) {
            return;
        }

        target.kick(`Kicked by Example Panel`);
        MultitestView2Server.handleRefresh(player);
    }

    private static getAvailablePlayers(): Array<ExPlayerInfo> {
        return [...alt.Player.all]
            .filter((x) => x.valid && x.data && x.data._id)
            .map((t) => {
                const id = Athena.systems.identifier.getIdByStrategy(t);
                return {
                    id,
                    name: t.data.name,
                    ping: t.ping,
                };
            });
    }
}
