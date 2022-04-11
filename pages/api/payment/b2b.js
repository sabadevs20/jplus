// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import unirest from "unirest";
export default function handler(req, res) {
  const { tel } = req.body;
  const nom = tel;

  const consumer_key = "uyONyJjzHsajSA6GmcfUfZ9PN0CBLwX2";
  const consumer_secret = "9jEl4JAzkoIsolOr";
  let buffer = new Buffer.from(consumer_key + ":" + consumer_secret);

  const auth = `Basic ${buffer.toString("base64")}`;
  //console.log(auth);

  var unirest = require("unirest");
  var req = unirest("GET", "https://api.safaricom.co.ke/oauth/v1/generate");

  req.query({
    grant_type: "client_credentials",
  });

  req.headers({
    Authorization: auth,
  });

  req.end((res) => {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
    const tokens = res.body.access_token;
    lipa(tokens,nom);
  });

  res.status(200).json({ name: "work" });
}
let date = new Date(2019, 4, 10, 15, 30, 20); //10 May 2019, 3:30:20 PM
let dateStr = date.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
}); // 10/05/19

let arr = dateStr.split("/"); // [ '10', '05', '19' ]
let d = arr[0]; //e.g. 10
let m = arr[1]; //e.g. 5
let y = date.getFullYear(); //e.g. 19

let timeStr = date.toLocaleTimeString("en-GB", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}); //
let arr2 = timeStr.split(":"); // 15:30:20
let H = arr2[0]; //e.g. 15
let i = arr2[1]; //e.g. 30
let s = arr2[2]; //e.g. 20

const ymdHms = y + m + d + H + i + s;

function lipa(tokens,phonenum) {
  let timestamp = ymdHms;
  const bs_short_code = 7290377;
  const passkey =
    "9b6b37ab48221b4ac73fe723635ad430093fb4456ce2ddb62d729632caae1169";
  //const amount =""
  const password = new Buffer.from(
    `${bs_short_code}${passkey}${timestamp}`
  ).toString("base64");

  let req = unirest(
    "POST",
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
  );
  req.headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokens}`,
  });
  req.send(JSON.stringify({
    "InitiatorName": "testapi",
    "SecurityCredential": "g95oagCSclb/TWWvYOvPFqP+crjM1/lVYoDyiiccVuE3d9vUsgA4nPY22lgzwMZPkAvku7Kc0tBwA/s5vs+Y4Ay+EXxZNm3nNwtsVjPOaxyl+h7fLSHFoBgWFmMwl6rqfHln+AD6rN447uFsFmXsgzVTsiC/x1qdJgwAUk4nGHAgJpal71xPN+yXfBFF9clK97UvdhjDt1TNhocINxs14ki7pO0zrdHuq02U260Ee2hIkDh8V/ZwFhAqVME+cRJH8jvGNgQ49xyzGpWKsMyCXpFjpUm193Oof25f+Ht117cehwbPoaHkuG/GxtPrMyR5jJk7DVLuLNe39aTFyGcVbg==",
    "CommandID": "DisburseFundsToBusiness",
    "SenderIdentifierType": "4",
	"RecieverIdentifierType": "4",
    "Amount": 1,
    "PartyA": 600978,
    "PartyB": 254708374149,
    "AccountReference": "",
    "Remarks": "Premium Payment",
    "QueueTimeOutURL": "https://mydomain.com/b2c/queue",
    "ResultURL": "https://mydomain.com/b2c/result"
    
  }))
  req.end((res) => {
    console.log(res.body);
  });
}
