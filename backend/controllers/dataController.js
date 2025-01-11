const { getDB } = require('../services/database');


const getRecentLogs = async (req, res) => {
  try {
    const { city, station } = req.params;
    const {trainLines} = req.query; //acc trainLines as a query param
    const db = getDB();

    const collectionName = `${city}_reports`;
    const collection = db.collection(collectionName);

    const filter = {station};
    if (trainLines) {
      filter.trains = { $regex: `\\b${trainLines}\\b`, $options: 'i' }; // Match trainlines as a whole word
    }

    const logs = await collection
      .find(filter) 
      .sort({ timeStamp: -1 }) 
      .limit(5)
      .toArray();

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for this station' });
    }

    res.json(logs); 
  } catch (err) {
    console.error('Error fetching recent logs:', err);
    res.status(500).send('Error fetching recent logs');
  }
};

const postData = async (req, res) => {
  try {
    const { city } = req.params;
    const {station, trains, cop, timeStamp} = req.body; //extract train lines and other data
    const collectionName = `${city}_reports`
    const db = getDB();
    const collection = db.collection(collectionName);

    // Validate input
    if (!station || !trains || cop === undefined || !timeStamp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    //inserting data
    const result = await collection.insertOne({station, trains, cop, timeStamp});
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

const getStations = async (req, res) => {
  try {
    const { city } = req.params;
    const db = getDB();
    
    const collectionName = `${city}_stations`;
    const collection = db.collection(collectionName);

    const result = await collection.find().toArray();

    res.json(result);
  } catch (err) {
    console.error('Error:', err); 
    res.status(500).send("Error getting stations");
  }
};

const getPolyline = async (req, res) => {
  try {
    const { city } = req.params; 
    const collectionName = `${city}_polyline`;
    const db = getDB();
    const collection = db.collection(collectionName); 
    const result = await collection.find().toArray();
    res.json(result);
  } catch (err) {
    console.error('Error getting polyline:', err);
    res.status(500).send("Error getting polyline");
  }
};

module.exports = { getRecentLogs, getStations, postData, clearSet, getPolyline };
