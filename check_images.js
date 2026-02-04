
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Define Package Schema (simplified)
const PackageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true }
}, { strict: false });

const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

async function checkImages() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        const packages = await Package.find({}, 'name image');
        console.log(`Found ${packages.length} packages.`);

        packages.forEach(pkg => {
            console.log(`Package: ${pkg.name}`);
            console.log(`Image URL: '${pkg.image}'`); // Single quotes to see whitespace
            console.log('---');
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkImages();
