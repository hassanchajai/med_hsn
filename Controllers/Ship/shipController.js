const Ship = require("../../Models/Ship");

const store = async (req, res) => {
  const shipData = { ...req.body };

  try {
    const result = await Ship.insertMany(shipData);
    res.status(200).json({ message: "data inserted !", result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = async (req,res) => {
    const { id } = req.params
    const record = { _id : id}
    const updatedData = {...req.body}

    try{
        const result = await Ship.updateOne(record, updatedData)
        res.status(200).json(result)
    } catch(err) {
        res.status(400).json({ message : err})
    }
}






module.exports = {
    store,
    update,
}