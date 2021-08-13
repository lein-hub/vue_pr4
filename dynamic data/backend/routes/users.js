var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
require('dotenv').config();

var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_ID,
    password: process.env.MYSQL_PASSWORD,
    database: 'vue_pr4',
});

conn.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

router.get('/', (req, res) => {
    conn.query('SELECT * FROM users', function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

router.post('/signup', (req, res) => {
    const user = {
        'userid': req.body.user.userid,
        'name': req.body.user.name,
        'password': req.body.user.password,
    };
    conn.query('SELECT userid FROM users WHERE userid = "' + user.userid + '"', function (err, row) {
        if (row[0] == undefined) {  // 동일한 아이디가 없을 경우
            const salt = bcrypt.genSaltSync();
            const encryptedPassword = bcrypt.hashSync(user.password, salt);

            conn.query('INSERT INTO users (userid, name, password) VALUES ("' + user.userid + '"' + user.name + '","' + encryptedPassword + '")', user, function (err, row2) {
                if (err) throw err;
            });

            res.json({
                success: true,
                message: 'Sign Up Success!',
            });
        } else {
            res.json({
                success: false,
                message: 'Sign Up Failed Please use another ID',
            });
        }
    });
});

router.post('/login', (req, res) => {
    const user = {
        'userid': req.body.user.userid,
        'password': req.body.user.password,
    };

    conn.query(`SELECT userid, password FROM users WHERE userid = "${user.userid}"`, function (err, row) {
        if (err) {  // 매칭되는 아이디 없을 경우
            res.json({
                success: false,
                message: 'Login failed please check your id or password!',
            });
        }

        if (row[0] !== undefined && row[0].userid === user.userid) {
            bcrypt.compare(user.password, row[0].password, function (err, res2) {
                if (res2) {
                    res.json({
                        success: true,
                        message: 'Login successful',
                    });
                }
                else {
                    res.json({
                        message: 'Login failed please check your ID or password',
                    });
                }
            });
        }
    });
});

module.exports = router;