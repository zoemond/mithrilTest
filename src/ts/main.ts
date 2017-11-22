/// <reference path="./typings/mithril.d.ts" />
import * as m from "mithril";
import * as appConstants from "./constants/appConstants";
import mod from "./components/mod";
import sub from "./components/sub";
import sub2 from "./components/sub2";

const app: any = {};
app.view = () => {
    return m('div', [
        "test"
    ]);
};
(<any>mod).hello();
(<any>sub).hello();
(<any>sub2).hello();

m.mount(document.body, app);
