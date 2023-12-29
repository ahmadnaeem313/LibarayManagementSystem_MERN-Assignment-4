const mongoose = require('mongoose');
const express = require('express');
const Book = require('../model/books');
const multer = require('multer');
const moment = require('moment');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

//.end point to fetch the rooms

router.get('/fetchBooks', [], async (req, res) => {

  try {

    const allBooks = await Book.find()
    res.json(allBooks)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }

})


//end point to fetch the rooms with id
router.get('/fetchBook/:id', [], async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {

    const singleBook = await Book.findOne({ _id: id });
    res.json(singleBook)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }

})


//end point to add the room

router.post('/addBook', upload.single('picture'), async (req, res) => {

  try {

    const { picture, name, description, Rtype, comments, likes, price } = req.body;
    const newBook = new Book({ picture, name, description, Rtype, comments, likes, price });
    const savedBook = await newBook.save()
    res.json(savedBook)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred +backend");
  }

});



//end point to delete the reservation
router.delete('/deleteBook/:id', async (req, res) => {
  const bookId = req.params.id.replace(/["']/g, '');

  try {
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});






module.exports = router;