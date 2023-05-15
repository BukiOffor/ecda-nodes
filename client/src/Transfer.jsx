import { useState } from "react";
import server from "./server";


function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [R, setR] = useState("");
  const [S, setS] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  

  async function transfer(evt) {
    evt.preventDefault();
    


    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        R,
        S,
        recoveryBit
        
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer} enctype="multipart/form-data">

      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Signature : R
        <input placeholder="Paste in your Signature R"
        value={R}
        onChange={setValue(setR)}
        ></input>
      </label>
      <label>
        Signature : S
        <input placeholder="Paste in your Signature S"
        value={S}
        onChange={setValue(setS)}
        ></input>
      </label>
      <label>
        Signature : RecoveryBit
        <input placeholder="Paste in your Signature recovery bit"
        value={recoveryBit}
        onChange={setValue(setRecoveryBit)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
