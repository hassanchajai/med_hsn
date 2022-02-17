const Reservation = require("../../Models/Reservations");

const store = async (req, res) => {
  const reservationData = { ...req.body };

  try {
    const result = await Reservation.insertMany(shipData);
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
        const result = await Reservation.updateOne(record, updatedData)
        res.status(200).json(result)
    } catch(err) {
        res.status(400).json({ message : err})
    }
}






module.exports = {
    store,
    update,
}