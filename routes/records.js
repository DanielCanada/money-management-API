const express = require('express');
const router = express.Router();
const Records = require('../models/recordSchema');

// get all
router.get('/', async (req, res) => {
  const records = await Records.find();
  res.json(records);
});

//Get specific
router.get('/find/:id', async (req, res) => {
  const r = await Records.findById({_id: req.params.id});
  res.json(r);
});

// add new record / item
router.post('/', async (req, res)=>{
  try {
    // Get body or Data
    const title = req.body.title;
    const body = req.body.body;
    const amount = req.body.amount;

    const createRecord = new Records({
      title: title,
      body: body,
      amount: amount
    });
    // Save Method is used to Create Records or insert Records
    // plus extra additional dependencies and functions in recordSchema
    const created = await createRecord.save();
    console.log(created);
    res.status(200).send("Successfully Added");
  } catch (error) {
    res.status(400).send({message: error});
  }
})

// delete record / item
router.delete('/delete/:id', async (req, res) =>{
  const deleteRecord = await Records.findByIdAndDelete({_id: req.params.id});
  res.json(deleteRecord); 
});

//Update a Record / Item
router.patch('/update/:id', async (req, res) => {
  const patchRecord = await Records.updateOne({_id: req.params.id}, {$set: req.body});
  res.json(patchRecord);
});
module.exports = router;