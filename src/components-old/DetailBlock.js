import React, { Component } from "react";
import { Tab } from "@blueprintjs/core";
import BlockInfo from "./BlockInfo";
import UTXOPoolTable from "./UTXOPoolTable";
import TransactionTable from "./TransactionTable";
class DetailBlock extends Component {
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Tab>
          <Tab
            id="blockinfo"
            title="Block Info"
            panel={<BlockInfo block={this.props.block} />}
          />
          <Tab
            id="transactions"
            title="Transactions"
            panel={<TransactionTable transactions={this.props.block.transactions} />}
          />
          <Tab
            id="utxopool"
            title="UTXOPool"
            panel={<UTXOPoolTable block={this.props.block} />}
          />
        </Tab>
      </div>
    );
  }
}

export default DetailBlock;
