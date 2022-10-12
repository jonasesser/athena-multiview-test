<template>
    <div class="example-wrapper">
        <div class="toptions mr-2">
            <Button color="green" @click="refresh" class="mb-10 mt-2 refresh-button">Refresh</Button>
            <Button color="red" @click="close" class="mb-10 mt-2 ml-2 close-button">Close</Button>
        </div>
        <div class="players">
            <div>Dialog is open till {{ starttime }} for {{ getOpenTime() }} seconds</div>
            <div v-for="(player, index) in players" :key="index" class="player">
                <div class="info overline">
                    <span>{{ player.id }}</span>
                    <span>{{ player.name }}</span>
                    <span>{{ player.ping }}</span>
                </div>
                <Button color="red" @click="kick(player.id)">Kick</Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import WebViewEvents from '../../../../../src-webviews/src/utility/webViewEvents';

// Other Imports
import { defineComponent, defineAsyncComponent } from 'vue';
import { ExPlayerInfo } from '../shared/interfaces';
import { ExampleWebViewEvents } from '../shared/viewInfo';

const ComponentName = ExampleWebViewEvents.ViewName2;
export default defineComponent({
    name: ComponentName,
    components: {
        // Global Components
        Button: defineAsyncComponent(() => import('@components/Button.vue')),
        Icon: defineAsyncComponent(() => import('@components/Icon.vue')),
    },
    data() {
        return {
            players: [] as Array<ExPlayerInfo>,
            timer: null,
            starttime: new Date(),
            currentTime: new Date(),
        };
    },
    mounted() {
        WebViewEvents.on(ExampleWebViewEvents.ServerToWebView2.REFRESH_PLAYERS, this.loadPlayers);
        WebViewEvents.on(ExampleWebViewEvents.ClientToWebView2.LOAD_PLAYERS, this.loadPlayers);
        WebViewEvents.emitReady(ExampleWebViewEvents.ViewName2);

        this.timer = setInterval(() => {
            this.currentTime = new Date();
        }, 1000);

        // Do not load example data.
        if ('alt' in window) {
            return;
        }

        // Load example data...
        this.loadPlayers([
            { name: 'Johnny_Dillinger', ping: 25, id: 0 },
            { name: 'Ivy_Vilachi', ping: 34, id: 1 },
            { name: 'Ivan_Vilcaova', ping: 99, id: 2 },
            { name: 'Bobby_Burn', ping: 55, id: 3 },
            { name: 'Bob_Burns', ping: 55, id: 3 },
            { name: 'Carl_Burnham', ping: 55, id: 3 },
            { name: 'Konnie_Burnham', ping: 55, id: 3 },
            { name: 'Annie_Adenson', ping: 55, id: 3 },
        ]);
    },
    methods: {
        close() {
            //TODO: which page it multiple open!?
            // WebViewEvents.emitClose();
            WebViewEvents.emitClient(ExampleWebViewEvents.ClientServer2.CLOSE);
        },
        loadPlayers(players: ExPlayerInfo[]) {
            this.players = players;
        },
        kick(id: number) {
            WebViewEvents.emitServer(ExampleWebViewEvents.WebViewToServer2.KICK_PLAYER, id);
        },
        refresh() {
            WebViewEvents.emitServer(ExampleWebViewEvents.WebViewToServer2.REQUEST_REFRESH);
        },
        getOpenTime() {
            let dif = this.starttime.getTime() - this.currentTime.getTime();

            let seconds = dif / 1000;
            return Math.abs(seconds).toFixed(0);
        },
    },
});
</script>

<style scoped>
.example-wrapper {
    position: absolute;
    right: 5vw;
    top: 10vw;
    justify-content: center;
    align-items: center;
    background: rgba(12, 12, 12, 1) !important;
    min-height: 400px;
    max-height: 400px;
    min-width: 600px;
    max-width: 600px;
    border-radius: 6px;
}

.toptions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
}

.players {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 300px;
    max-height: 300px;
    overflow-y: scroll;
}

.player {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    padding-bottom: 12px;
    padding-top: 12px;
    align-items: center;
}

.player .info {
    display: flex;
    min-width: 300px;
    max-width: 300px;
    justify-content: space-between;
}

.player:nth-child(odd) {
    background: rgba(255, 255, 255, 0.1);
}
</style>
