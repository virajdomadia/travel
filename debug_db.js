
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
let uri = '';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (match) {
        uri = match[1].trim();
        // Remove quotes if present
        if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
            uri = uri.slice(1, -1);
        }
    }
}

if (!uri) {
    console.error('Could not find MONGODB_URI in .env.local');
    // Try to see if it's passed as process env (unlikely in this context but good practice)
    uri = process.env.MONGODB_URI;
}

if (!uri) {
    console.error('No MONGODB_URI found');
    process.exit(1);

}

const DestinationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
}, { strict: false });

const Destination = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);

async function checkDestinations() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(uri);
        console.log('Connected.');

        const destinations = await Destination.find({}, 'id name _id');
        console.log('Destinations found:', destinations.length);
        destinations.forEach(d => {
            console.log(`Name: "${d.name}", CustomID: "${d.id}", _id: "${d._id}"`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

checkDestinations();
