const axios = require('axios');
const router = require('express').Router();
const db = require('../../models');

router.route('/search')
    .get((req, res) => {
        const { title } = req.query;
        axios(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
            .then(response => {
                const results = response.data.items;
                results ? res.json(results) : res.json([]);
            });
    })

router.route('/book')
    .post(async (req, res) => {
        const { title, id, author, description, image, date } = req.body;
        try {
            await db.Book.create({
                _id: id,
                title,
                author,
                description,
                image,
                date
            });
            res.status(200).end();
        } catch (err) {
            res.status(422).end();
        }
    })
    .delete(async (req, res) => {
        const { id } = req.body;
        try {
            await db.Book.deleteOne({ _id: id });
            console.log({ id: id })
            res.json({ id: id });
        } catch (err) {
            res.status(422).end();
        }
    })

router.route('/books')
    .get((req, res) => {
        db.Book
            .find({})
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    })

module.exports = router;