
const urls = [
    // Bhutan (Current)
    'https://images.unsplash.com/photo-1578509377708-25f0a0d49495?auto=format&fit=crop&w=800',

    // Meghalaya Candidates
    'https://images.unsplash.com/photo-1628062837330-7603c4357c2a?auto=format&fit=crop&w=800', // One I tried before?
    'https://images.unsplash.com/photo-1598630737409-9069695d85c4?auto=format&fit=crop&w=800', // From search text
    'https://images.unsplash.com/photo-1504705759703-9bb8253a6979?auto=format&fit=crop&w=800', // Generic forest/nature
    'https://images.unsplash.com/photo-1528823872051-1406d306a445?auto=format&fit=crop&w=800'  // Waterfall
];

async function checkUrls() {
    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            console.log(`URL: ${url}`);
            console.log(`Status: ${response.status}`);
            console.log('---');
        } catch (error) {
            console.log(`URL: ${url}`);
            console.log(`Error: ${error.message}`);
            console.log('---');
        }
    }
}

checkUrls();
