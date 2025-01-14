const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const aiDiagnosisRoutes = require('./routes/aiDiagnosis');

if (!globalThis.fetch) {
    const fetch = require('node-fetch');
    globalThis.fetch = fetch;
}

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', aiDiagnosisRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});