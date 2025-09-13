const pool = require("../dbMysql");

async function addFlat(flatName, flatAddress, userId) {
  const [result] = await pool.query(
    "INSERT INTO flat (flatName, flatAddress, userId) VALUES (?, ?, ?)",
    [flatName, flatAddress, userId]
  );
  return { flatid: result.insertId, flatName, flatAddress, userId };
}
async function getFlat(flatid) {
  const [rows] = await pool.query("SELECT * FROM flat order by flat");
  return rows;
}
module.exports = { addFlat,getFlat };