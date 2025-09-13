const flatService = require("../services/FlatService");

async function createFlat(req, res) {
  try {
    const { flatName, flatAddress, userId } = req.body;
    const flat = await flatService.addFlat(flatName, flatAddress, userId);
    res.status(201).json({ success: true, flat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
async function getFlat(req, res) {
  try {
    const flat = await flatService.getFlat();
    res.status(200).json({ success: true, flat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
module.exports = { createFlat, getFlat };
