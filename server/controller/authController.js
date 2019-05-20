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

    req.session.user = {
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

  const db = req.app.get("db");

  db.getUserLists(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send("Error Mate");
    });
};

const deleteListItems = (req, res) => {
  const { list_id } = req.params;
  const db = req.app.get("db");

  db.deleteListItems(list_id)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send("Error");
    });
};

const deleteListTitle = (req, res) => {
  const { id } = req.params;
  const db = req.app.get("db");

  db.deleteListTitle(id)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send("Error");
    });
};

module.exports = {
  register,
  login,
  logout,
  creatList,
  getLists,
  deleteListItems,
  deleteListTitle
};
