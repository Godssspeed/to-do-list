const register = async (req, res) => {
  const { username, uid } = req.body;
  const db = req.app.get("db");

  try {
    db.addUser([username, uid]);

    res.sendStatus(200);
  } catch (err) {
    res.status(401).json("Username Exists, please pick another one.");
  }
};

module.exports = {
  register
};
