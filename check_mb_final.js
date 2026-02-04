
const urls = [
    // Bhutan
    { name: 'Bhutan', url: 'https://images.unsplash.com/photo-1578509377708-25f0a0d49495?auto=format&fit=crop&w=800' },

    // Meghalaya Candidates
    { name: 'Meghalaya 1', url: 'https://images.unsplash.com/photo-1628062837330-7603c4357c2a?auto=format&fit=crop&w=800' },
    { name: 'Meghalaya 2', url: 'https://images.unsplash.com/photo-1518002171953-a080ee802e12?auto=format&fit=crop&w=800' },
    { name: 'Meghalaya 3', url: 'https://images.unsplash.com/photo-1504705759703-9bb8253a6979?auto=format&fit=crop&w=800' },

    // Re-verify known goods
    { name: 'Dubai', url: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800' },
    { name: 'Paris', url: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800' },
    { name: 'Thailand', url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800' }
];

async function checkUrls() {
    for (const item of urls) {
        try {
            const response = await fetch(item.url, { method: 'HEAD' });
            console.log(`Name: ${item.name}`);
            console.log(`URL: ${item.url}`);
            console.log(`Status: ${response.status}`);
            console.log('---');
        } catch (error) {
            console.log(`Name: ${item.name}`);
            console.log(`Error: ${error.message}`);
            console.log('---');
        }
    }
}

checkUrls();
