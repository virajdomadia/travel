
const urls = [
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1512632501-a6362953a43d?auto=format&fit=crop&w=800'
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
