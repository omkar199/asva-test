import { useState, useEffect } from "react";

import { fetchAccountDetails } from "../web3/action/index";
// Usage

// Hook
const useAccountChange = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  //   const [windowSize, setWindowSize] = useState("");
  const [accountId, setAccountId] = useState(undefined);

  useEffect(() => {
    if (window.ethereum !== undefined)
      window.ethereum.on("accountsChanged", function (accounts) {
        console.log("accountsChanges", accounts);
        setAccountId(accounts[0]);
      });

    const getAccount = async () => {
      let data = await fetchAccountDetails();
      setAccountId(data.account.address);
    };

    getAccount();
  }, []); // Empty array ensures that effect is only run on mount

  // if(accountId === )

  return accountId;
};

export default useAccountChange;
