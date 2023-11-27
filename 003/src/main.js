const Web3 = require('web3');

let web3 = null;
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
    web3 = new Web3('ws://localhost:8546');
}


console.log("Web3 version: ", web3.version);
console.log("Web3 providers: ", web3.providers);
console.log("Web3 currentProvider: ", web3.currentProvider);
web3.eth.getChainId(function (error, chainId) {
    console.log("Web3 chainId: ", chainId);
});
web3.eth.getNodeInfo(function (error, result) {
    console.log("Node Info: ", result)
});
web3.eth.net.getId(function (error, result) {
    console.log("Network Id: ", result)
});
web3.eth.net.getPeerCount(function (error, peerCount) {
    console.log("Peer Count: ", peerCount)
});
web3.eth.getBlockNumber(function (error, result) {
    console.log("Block number: ", result)
});
web3.eth.getBlock("earliest", false, function (error, result) {
    console.log("Earliest Block: ", result)
})
web3.eth.getBlock("latest", false, function (error, result) {
    console.log("Latest Block: ", result)
})
web3.eth.getBlock("pending", false, function (error, result) {
    console.log("Pending Block: ", result)
})
web3.eth.getAccounts(function (error, result) {
    console.log("Accounts: ", result)
    for (let i = 0; i < result.length; i++) {
        web3.eth.getBalance(result[i], web3.eth.defaultBlock, function (error, balance) {
            console.log("Balance of account " + i + " [" + result[i] + "]: ", web3.utils.fromWei(balance, 'ether') + " ETH");
        });
        web3.eth.getTransactionCount(result[i], web3.eth.defaultBlock, function (error, count) {
            console.log("Transaction count of account " + i + ": ", count);
        });
        web3.eth.getPastLogs({address: result[i]}, function (error, logs) {
            console.log("Logs of account " + i + ": ", logs);
        });
    }
});
web3.eth.getPendingTransactions(function (error, transactions) {
    console.log("Pending transactions: ", transactions);
});
function transfer() {
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let value = document.getElementById("amount").value;
    transaction(from, to, value);
}

document.getElementById("btnTransfer").addEventListener("click", transfer);

function transaction(from, to, value) {
    web3.eth.sendTransaction({
        from: from,
        to: to,
        value: web3.utils.toWei(value, 'ether')
    }, function (error, result) {
        console.log("Transaction: ", result);
        web3.eth.getTransaction(result, function (error, transaction) {
            console.log("Transaction: ", transaction);
        });
    })
    .once("sending", (payload) => {
        console.log("Sending transaction: ", payload);
    })
    .once("sent", (payload) => {
        console.log("Sent transaction: ", payload);
    })
    .once("transactionHash", (transactionHash) => {
        console.log("Transaction hash: ", transactionHash);
    })
    .once("receipt", (receipt) => {
        console.log("Receipt: ", receipt);
    })
    .once("confirmation", (confirmationNumber, receipt, latestBlockHash) => {
        console.log("Confirmation: ", confirmationNumber);
        console.log("Receipt: ", receipt);
        console.log("Latest block hash: ", latestBlockHash);
    })
    .then((receipt) => {
        console.log("Then Receipt: ", receipt);
    });
    ;
}

// const accounts = await ethereum.request({ method: 'eth_accounts' });
// accounts.then(console.log);
