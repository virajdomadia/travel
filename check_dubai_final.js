
const urls = [
    'https://images.unsplash.com/photo-1512453979798-5ea90b7cadc9?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1578895122968-9a78301dab0c?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&w=800'
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
