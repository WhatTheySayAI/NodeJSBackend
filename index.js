require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const APIKey = process.env.ASSEMBLY_API_KEY;

const port = process.env.PORT || 7000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.post(
        'https://api.assemblyai.com/v2/realtime/token',  // use account token to
                                                         // get a temp user
                                                         // token
        {
          expires_in: 3600,  // can set a TTL timer in seconds.
          language_detection: true
        },
        {headers: {authorization: APIKey}});  // AssemblyAI API Key goes here
    const {data} = response;
    res.json(data);
  } catch (error) {
    const {response: {status, data}} = error;
    res.status(status).json(data);
  }
});

app.set('port', port);
const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}`);
});
