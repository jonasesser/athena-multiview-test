import alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { MultitestView1Server } from './src/view';
import { MultitestView2Server } from './src/view2';

const PLUGIN_NAME = 'Example MultitestView Plugin';

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    MultitestView1Server.init();
    MultitestView2Server.init();
    alt.log(`~lg~CORE ==> ${PLUGIN_NAME} Loaded.`);
});
