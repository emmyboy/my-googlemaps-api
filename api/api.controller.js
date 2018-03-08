var express = require('express');
var router = express.Router();

var articleData = {
   'articles': [
       { 'id': 0,
         'lat': 37.7578152,
         'lng': -122.4901307,
         'url': 'https://www.google.com',
         'category_id': 2,
         'publisher_id': 1 },
       { 'id': 1,
         'lat': 37.7067758,
         'lng': -122.4188089,
         'url': 'https://www.yahoo.com',
         'category_id': 1,
         'publisher_id': 3 },
       { 'id': 2,
         'lat': 37.7331183,
         'lng': -122.5051546,
         'url': 'https://www.yelp.com',
         'category_id': 0,
         'publisher_id': 2 },
       { 'id': 3,
         'lat': 37.6213021,
         'lng': -122.3789406,
         'url': 'https://www.msn.com',
         'category_id': 1,
         'publisher_id': 0 }
   ],
   'categories': [
       { 'id': 0, 'name': 'community'},
       { 'id': 1, 'name': 'finance' },
       { 'id': 2, 'name': 'sports' }
   ],
   'publishers': [
       { 'id': 0, 'name': 'Mercury'},
       { 'id': 1, 'name': 'SunTimes' },
       { 'id': 2, 'name': 'Chronicle' },
       { 'id': 3, 'name': 'Tribune' }       
   ]
};

// routes
router.get('/:_resource', getResource);
router.get('/:_resource/:_id', getResourceID);
router.post('/articles/:_id', addArticle);
router.get('/articles', getArticlelist);
router.put('/articles', updateArticleDB);
router.delete('/articles/:_id', deleteArticle);

module.exports = router;

function getResource(req, res) {
   if (articleData[req.params._resource]) {
        res.status(200).send(articleData[req.params._resource]);
    } else {
        res.status(404).send("Resource Not Found");
    }
}

function getResourceID(req, res) {
    if (articleData[req.params._resource][req.params._id]) {
        res.status(200).send(articleData[req.params._resource][req.params._id]);
    } else {
        res.status(404).send("Resource Not Found");
    }
}

function addArticle(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getArticlelist(req, res) {
    res.status(200).send(articleData.articles);
}

function updateArticleDB(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }



    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteArticle(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
