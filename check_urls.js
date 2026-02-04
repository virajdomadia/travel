
const urls = [
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1518684079-3c830dcefacf?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1624890264112-68b584347716?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1596702959881-2c092c483a9e?auto=format&fit=crop&w=800'
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
