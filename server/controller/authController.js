const register = (req, res) => {
  const { username, uid } = req.body;
  const db = req.app.get("db");

  db.addUser([username, uid])
    .then(response => {
      res.sendStatus(200);
    })

    .catch(err => {
      res.status(401).json("Username Exists, please pick another one.");
    });
};

const login = async (req, res) => {
  const { uid } = req.body;
  const db = req.app.get("db");

  db.findUser(uid).then(async response => {
    // console.log(response);
    await req.session.user = {
      id: response[0].id,
      username: response[0].username,
      uid: response[0].uid
    };
    console.log(req.session);
    res.status(200).json(req.session.user);
  });
};

const logout = (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.sendStatus(200);
};

const creatList = (req, res) => {
  console.log(req.session);
  const { id } = req.session.user;
  const { title, items } = req.body;

  const db = req.app.get("db");

  console.log(title);
  console.log(items);

  db.addTitle([title, id])
    .then(response => {
      db.addContent([title, items, id]);
    })
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send("Error Mate");
    });
};

const getLists = (req, res) => {
  const { id } = req.session.user;
  console.log(id);
  const db = req.app.get("db");

  db.getUserLists(id)
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send("Error Mate");
    });
};

module.exports = {
  register,
  login,
  logout,
  creatList,
  getLists
};
