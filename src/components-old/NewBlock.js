import React, { Component } from "react";
import classnames from "classnames";
import { Tab, Button } from "@blueprintjs/core";
import NewBlockHeader from "./NewBlockHeader";
import NewBlockTransactionList from "./NewBlockTransactionList";
import UTXOPoolTable from "./UTXOPoolTable";
import { Tooltip, advanceTo, isAtStep } from "./walkthrough";
class NewBlock extends Component {
  addBlock = evt => {
    if (this.props.block.isValid()) {
      this.props.block.blockchain.addBlock(this.props.block);
      this.props.onCancel();
      advanceTo(5);
    }
  };

  rerender = () => {
    this.forceUpdate();
  };
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Tab
          onChange={(newTabId, prevTabId, event) => {
            if (newTabId === "txs" && isAtStep(14)) advanceTo(15);
          }}
        >
          <Tab
            id="blockheader"
            title="Block Header"
            panel={
              <NewBlockHeader
                block={this.props.block}
                rerender={this.rerender}
              />
            }
          />
          <Tab
            id="txs"
            title={
              <Tooltip
                content={
                  <p style={{ maxWidth: "250px" }}>
                    Here you can see broadcasted transactions or add your own
                  </p>
                }
                step={14}
                nextButtonVisible={false}
              >
                Transactions
              </Tooltip>
            }
            panel={
              <NewBlockTransactionList
                block={this.props.block}
                rerender={this.rerender}
              />
            }
          />
          <Tab
            id="utxopool"
            title="UTXO Pool"
            panel={
              <div>
                <p>
                  This represents the UTXO pool after the mining reward and all
                  transactions that would be applied, i.e. the successful mining
                  and validation of a block.
                </p>
                <UTXOPoolTable block={this.props.block} />
              </div>
            }
          />
        </Tab>

        <div style={{ float: "right" }}>
          <Tooltip
            content={
              <p style={{ maxWidth: "250px" }}>
                Assuming you did everything right, you have indeed found a
                nonce, that will yield you a valid hash for your block. You can
                now "add" your block to the parent block and brodcast it to
                other nodes. If your block is part of the longest chain of
                blocks and other nodes continue to work of this chain, then
                you'll be indeed the owner of the mining reward.
              </p>
            }
            next={this.addBlock}
            nextLabel="Broadcast my block!"
            step={4}
          >
            <Button
              iconName="pt-icon-add"
              className={classnames("pt-intent-primary", {
                "pt-disabled": !this.props.block.isValid()
              })}
              onClick={this.addBlock}
            >
              Add Block
            </Button>
          </Tooltip>

          <Button
            style={{ marginLeft: "10px", marginRight: "24px" }}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default NewBlock;
