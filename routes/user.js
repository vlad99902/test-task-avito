const express = require('express'),
  router = express.Router();

/**
 * Show all users/participants
 * http://localhost:3000/users/show
 */

router.get('/show', function(req, res) {
  let sql = `SELECT * FROM meetings_db.users;`;
  db.query(sql, function(err, users) {
    if (err) throw err;
    res.json({
      message: "Users table",
      users
    })
  })
});

/**
 * Add new user
 * http://localhost:3000/users/add
 */

router.post('/add', function(req, res) {
  let sql = `INSERT INTO users(users_name, users_email) VALUES (?)`;
  let values = [
    req.body.name,
    req.body.email
  ];
  db.query(sql, [values], function(err) {
    if (err) throw err;
    res.json({
      message: "New user added successfully"
    })
  })
}); 

/**
 * Delete user
 * http://localhost:3000/users/delete
 */

router.post('/delete', function(req, res) {
  let sql = `DELETE FROM meetings_db.users where idusers = ?`;
  let value = [
    req.body.id
  ];
  db.query(sql, [value], function(err) {
      if (err) throw err;
      res.json({
          message: "Successfully"
      })
  })
});

module.exports = router;