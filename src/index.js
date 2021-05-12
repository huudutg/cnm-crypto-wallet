
import { action, state } from './store';
import { subscribeTo, publish } from './network'
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
const component = ReactDOM.render(
    <App />,
    document.getElementById("root")
);
// component.forceUpdate();

// subscribeTo('BLOCKCHAIN_BROADCAST', (names) => {
//   action({ type: 'BLOCKCHAIN_BROADCAST', names })
// })

// subscribeTo('BLOCKCHAIN_BROADCAST_REQUEST', () => {
//   publish('BLOCKCHAIN_BROADCAST', state.blockchains.map((b) => b.name))
// })

// publish('BLOCKCHAIN_BROADCAST_REQUEST', {})
