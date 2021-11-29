import React, { useState, useEffect } from "react";
import Header from "./common/components/header";
import VaultWrapper from "./common/wrapper/vaultWrapper";
import Alert from "./common/components/alert";
import "./assets/scss/header.scss";
import { ethEnabled, handleConnect, getAccount } from "./web3/action/index";
function App() {
  const [address, setAddress] = useState([]);
  const [lodder, setLodder] = useState(false);
  // useEffect(() => {
  //   ethEnabled();
  //   if (handleConnect && handleConnect()) {
  //     getAccount().then((val) => {
  //       setLodder(false);
  //       setAddress(val);
  //     });
  //   }
  // }, []);
  console.log(lodder);
  if (lodder) {
    return (
      <div className="loder">
        <p>loding...</p>
      </div>
    );
  }
  return (
    <div>
      <Header address={address} />
      <Alert />
      <VaultWrapper />
    </div>
  );
}

export default App;
