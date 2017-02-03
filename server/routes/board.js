import express from 'express';
import Article from './../models/board';
import mongoose from 'mongoose';

const router = express.Router();

/*
 *  READ :   /api/board/
 */
router.get('/', (req, res) => {
    let pageNumber = parseInt(req.query.pageNumber);
    let articleCount = parseInt(req.query.articleCount);

    console.log(`pageNumber=${pageNumber}, articleCount=${articleCount}`);
    // auth-check에서 req.username에 값을 넣어주었다.
  //  Article.find({writer: req.username})
    Article.find()
        .sort({"_id": -1})
        .limit(articleCount)
        .skip((pageNumber-1)*articleCount)
        .exec((err, articles) => {
            if (err) throw err;

            Article.count().exec((err, count) => {
                if (err) throw err;
                res.json({
                    articles: articles
                    , count: count
                });
            });

        });
});


/*
 /api/article/:id
 */
router.put('/:id', (req, res) => {

    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // FIND MEMO
    Article.findById(req.params.id, (err, article) => {
        if (err) throw err;

        // IF MEMO DOES NOT EXIST
        if (!article) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // MODIFY AND SAVE IN DATABASE
        if (article.publish) {
            article.publish = false;
        } else
            article.publish = true;

        article.save((err, article) => {
            if (err) throw err;
            return res.json({
                success: true,
                article
            });
        });
    });
});

/*
 router.get('/', (req, res) => {
 //헤더와 바디 찍기
 console.log('헤더:');
 console.log(req.headers);
 console.log('바디:');
 console.log(req.body);

 res.status(200).json({
 message: "You're authorized to see this secret message."

 });
 });
 */
/* Wirte article
 *   /api/board
 */
router.post('/', (req, res) => {
        console.log("post part");
    console.log(req.username);
    console.log(req.body);
// CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW MEMO
    let article = new Article({
        //writer: req.decoded.username,
        writer: req.username,
        title: req.body.title,
        contents: req.body.contents,
        publish: req.body.publish,
        count:req.body.count
    });

    // SAVE IN DATABASE
    article.save(err => {
        if (err) throw err;
        return res.json({success: true});
    });
});

/* Edit article
 *   /api/article/
 */
//router.put('/:index/:id', (req, res) => {
router.put('/', (req, res) => {
    console.log("PUT");
    console.log(req.body);
// CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        console.log("에러1");
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        console.log("에러2");
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
        console.log("에러3");
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // FIND MEMO
    Article.findById(req.body.id, (err, article) => {
        if (err) throw err;

        // IF MEMO DOES NOT EXIST
        if (!article) {
            console.log("에러4");
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // MODIFY AND SAVE IN DATABASE
        article.contents = req.body.contents;
        article.publish = req.body.publish;
        article.date.edited = new Date();
        article.is_edited = true;


        article.save((err, article) => {
            if (err) throw err;
            return res.json({
                success: true,
                article
            });
        });
    });
});
/*
 DELETE MEMO: DELETE /api/admin/:id
 ERROR CODES
 1: INVALID ID
 2: NOT LOGGED IN
 3: NO RESOURCE
 4: PERMISSION FAILURE
 */
router.delete('/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    Article.findById(req.params.id, (err, article) => {
        if (err) throw err;

        if (!article) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 2
            });
        }

        // REMOVE THE MEMO
        Article.remove({_id: req.params.id}, err => {
            if (err) throw err;
            res.json({success: true});
        });
    });
});

export default router;
