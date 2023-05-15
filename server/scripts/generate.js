const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");




//const privatekey = toHex(secp256k1.utils.randomPrivateKey())
//generate publicKey FROM PRIVATE KEY
const publickey =  secp256k1.getPublicKey("be96be71343f322d956cbc37445424a7e4e8fce443e0629bcd6eaeeb58ad3e04")
//console.log('private key: ',privatekey)
// SLICE OFF THE FIRST BYTE FROM THE PUBLIC KEY THEN HASH THE REMAINDER
const KpubHash = keccak256(publickey.slice(1))
//TAKE THE LAST 20 BYTES OF THE KECCAK HASH
const addrBytes = KpubHash.slice(-20)
const address = toHex(addrBytes)
console.log('address:', address )

