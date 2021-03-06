import excuteQuery from "../../../lib/db";

const handler = async (req, res) => {
  const { companyName, address, phone, Ira, Kra, idnumber,referall, identity } = req.body;
  let role = null 
  let agentCode = Ira.match(/[0-9]{5}/);
  try {
    
     const results = await excuteQuery({
      query:
        "UPDATE  `tbl_user` SET physicaladdress=?,companyname=?,phonenumber=?,krapin=?,idnumber=?,iralicense=?,role=?,agent_admin=? WHERE user_id=?",
      values: [
        address,
        companyName,
        phone,
        
        Kra,
        idnumber,
        Ira,
        role='superadmin',
       
        agentCode,
        identity,
       
      ],
    });
    console.log(results);
    return res.json(results);
   

    
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

export default handler;
