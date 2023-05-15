const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("secp256k1");




const message = utf8ToBytes('100')
const hash = keccak256(message)

const signed = secp256k1.sign(hash,'ea3e967a00612c386eacd44401facd2d5a49c70d117299d91e1947a1cffef850')
const signature = {
  r: 99713626359284877224863959504064454165404551019617748456120892326061726958155n,
  s: 10857666944777880594811113102874207614560411762162682744830575000604274069287n,
  recovery: 0
}
const hex = 0

const r = secp256k1.verify((signature) ,hash,"02572c00527939fcb82e9ea481542748e5c0593595c069854486694fc4087125e1")
const point = secp.recoveryPublicKey(signature, hash);
const publicKey = point.toPublic();


console.log(r,hex,publicKey)



