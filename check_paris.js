
const urls = [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800', // Candidate 1
    'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&w=800', // Candidate 2 (Likely failed one)
    'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800'  // Candidate 3
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
