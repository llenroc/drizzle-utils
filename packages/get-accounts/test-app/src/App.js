import React, { Component } from "react";
import getWeb3 from "@drizzle-utils/get-web3";
import getAccounts from "@drizzle-utils/get-accounts";

class App extends Component {
  state = { accounts: null };

  componentDidMount = async () => {
    const options = {
      web3: await getWeb3(),
      onChange: this.handleAddressChange
    };
    try {
      const accounts = await getAccounts(options);
      this.setState({ accounts });
    } catch (error) {
      console.error(error);
    }
  };

  handleAddressChange = newAddr => {
    if (this.state.accounts[0] !== newAddr) {
      console.log("New address change detected");
      this.setState({ accounts: [newAddr] });
    }
  };

  renderAccounts() {
    const { accounts } = this.state;
    return (
      <>
        <p>Accounts [{accounts.length}]:</p>
        <ul>
          {accounts.map(address => (
            <li key={address}>{address}</li>
          ))}
        </ul>
      </>
    );
  }

  render() {
    const { accounts } = this.state;
    return (
      <div style={{ margin: "2em" }}>
        <h1>@drizzle-utils/get-accounts</h1>
        {accounts === null ? "Loading..." : this.renderAccounts()}
      </div>
    );
  }
}

export default App;
