const express = require('express'),
router = express.Router();

/**
 *  Show every meeting with participant
 * http://localhost:3000/fullmeetings/show
 */


router.get('/show', function(req, res) {
    let sql = `SELECT meeting_name, meeting_date, meeting_description,
    users_name, users_email FROM meetings_db.meeting_has_user
    JOIN meetings_db.users ON meeting_has_user.users_idusers = users.idusers
    JOIN meetings_db.meeting ON meeting_has_user.meeting_idmeeting = meeting.idmeeting
    ORDER BY meeting_name`;
    db.query(sql, function(err, fullMeetings) {
        if (err) throw err;
        res.json({
            message: "Meetings with users table",
            fullMeetings
        })
    })
});

/**
 * Add new participant to meeting by entering username and meeting name
 * http://localhost:3000/fullmeetings/add
 */

router.post('/add', function(req, res) {
    let sql = `INSERT INTO meetings_db.meeting_has_user (users_idusers, meeting_idmeeting)
    VALUES ((select idusers FROM meetings_db.users WHERE users_name = '${req.body.username}'),
    (select idmeeting FROM meetings_db.meeting WHERE meeting_name = '${req.body.meetingname}'))`;
    
    db.query(sql, function(err) {
        if (err) throw err;
        res.json({
            message: "New participant added to meeting successfully"
        })
    })
});

/**
 * Delete participant from meeting by username and meeting name
 * http://localhost:3000/fullmeetings/delete
 */

router.post('/delete', function(req, res) {
    let sql = `DELETE FROM meetings_db.meeting_has_user WHERE users_idusers = 
    (SELECT idusers FROM meetings_db.users WHERE users_name = '${req.body.username}') 
    AND meeting_idmeeting = (SELECT idmeeting FROM meetings_db.meeting WHERE meeting_name = '${req.body.meetingname}')`;

    db.query(sql, function(err) {
        if (err) throw err;
        res.json({
            message: `Successfully`
        })
    })
});

module.exports = router;
