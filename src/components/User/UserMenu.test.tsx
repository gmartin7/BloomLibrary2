import ReactDOM from "react-dom";
import { UserMenu } from "./UserMenu";
import firebase from "firebase";
// this engages a babel macro that does cool emotion stuff (like source maps). See https://emotion.sh/docs/babel-macros
import css from "@emotion/css/macro";
// these two lines make the css prop work on react elements
import { jsx } from "@emotion/core";
/** @jsx jsx */

beforeAll(() => {
    firebase.initializeApp({
        apiKey: "AIza....", // Auth / General Use
        authDomain: "YOUR_APP.firebaseapp.com", // Auth with popup/redirect
        databaseURL: "https://YOUR_APP.firebaseio.com", // Realtime Database
        storageBucket: "YOUR_APP.appspot.com", // Storage
        messagingSenderId: "123456789" // Cloud Messaging
    });
});

describe("UserMenu tests", () => {
    const toolbarHeight = "48px";

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <UserMenu
                buttonHeight={toolbarHeight}
                css={css`
                    margin-left: auto;
                `}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
