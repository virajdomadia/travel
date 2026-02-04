
const urls = [
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800', // Thailand
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800', // Dubai (New)
    'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800', // Paris (New)
    'https://images.unsplash.com/photo-1578509377708-25f0a0d49495?auto=format&fit=crop&w=800', // Bhutan
    'https://images.unsplash.com/photo-1616084089304-4c2fbbf23acc?auto=format&fit=crop&w=800'  // Meghalaya
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
