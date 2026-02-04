
// Native fetch is available in Node 18+ 
// Actually node 18+ has fetch. 

async function resolve(url) {
    try {
        const response = await fetch(url, { redirect: 'follow' });
        console.log(`Original: ${url}`);
        console.log(`Final: ${response.url}`);
        console.log(`Status: ${response.status}`);
        console.log('---');
        return response.url;
    } catch (e) {
        console.log(`Error resolving ${url}: ${e.message}`);
        return null;
    }
}

const targets = [
    'https://source.unsplash.com/featured/?dubai,burj-khalifa',
    'https://source.unsplash.com/featured/?bhutan,monastery',
    'https://source.unsplash.com/featured/?meghalaya,root-bridge',
    // Also try some specific likely IDs if source fails?
    // Let's rely on source first.
];

async function run() {
    for (const t of targets) {
        await resolve(t);
    }
}

run();
