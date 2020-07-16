const express = require('express'),
router = express.Router();

/**
 *  Show every meeting
 * http://localhost:3000/meetings/show
 */

router.get('/show', function(req, res) {
    let sql = `SELECT * FROM meetings_db.meeting;`;
    db.query(sql, function(err, meetings) {
        if (err) throw err;
        res.json({
            message: "Meetings table",
            meetings
        })
    })
});

/**
 * Add new meeting 
 * http://localhost:3000/meetings/add
 */

router.post('/add', function(req, res) {
    let sql = `INSERT INTO meeting(meeting_name, meeting_date, meeting_description) VALUES (?)`;
    let values = [
        req.body.name,
        req.body.date,
        req.body.description
    ];
    db.query(sql, [values], function(err) {
        if (err) throw err;
        res.json({
            message: "New meeteng added successfully"
        })
    })
});

/**
 * Delete meeting by entering meeting id
 * http://localhost:3000/meetings/delete
 */

router.post('/delete', function(req, res) {
    let sql = `DELETE FROM meetings_db.meeting WHERE idmeeting = ?`;
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