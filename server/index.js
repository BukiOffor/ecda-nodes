const express = require("express");
const app = express();
const cors = require("cors");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require('secp256k1');



const port = 3042;


app.use(cors());
app.use(express.json());

const balances = {
  "696337cf325d075b3faf1d4854775b5471e57728": 10000,
  "1f85da5d766557f36a02a2229a979e250248a98c": 15000,
  "98a9057bf49fb265f7fef8b0fe62c44ed789d28e": 17500,
}

const data = {
  "696337cf325d075b3faf1d4854775b5471e57728": '02572c00527939fcb82e9ea481542748e5c0593595c069854486694fc4087125e1',
  "1f85da5d766557f36a02a2229a979e250248a98c": '03c81c06ff0553b42d951350dbff1619ee2109514e8ac3f7540404279c8b6ad7b4',
  "98a9057bf49fb265f7fef8b0fe62c44ed789d28e": '038ab95bdc2d3333e08f58372e8d7e5cd4aa6ba6aff72da425639584d47669cefd',
};



app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, R, S, recoveryBit } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  const signature = {}
  signature.r = BigInt(R.slice(0, -1))
  signature.s = BigInt(S.slice(0,-1))
  signature.recovery = parseInt(recoveryBit)
  

   function verify(){
    return secp256k1.verify(signature,keccak256(utf8ToBytes(amount.toString()+recipient)),data[sender]) 
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
    } 
   else if (verify() === false){
    res.status(400).send({message:"Not your account"})
    } 
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}


