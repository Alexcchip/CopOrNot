const { getDB } = require('../services/database');

const getData = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('reports');
    const data = await collection.find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
};

const postData = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('reports');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send('Error inserting data');
  }
};

const clearSet = async (req, res) => {
    try{
        const db = getDB();
        const collection = db.collection('reports');
        await collection.deleteMany({});
        res.json({ message: 'All documents cleared successfully' });
    } catch (err) {
        res.status(500).send("Error clearing data")
    }
}

module.exports = { getData, postData, clearSet };
