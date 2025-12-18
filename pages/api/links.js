import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'pages', 'links.json');
    const { links } = req.body;

    // Validate the data structure
    if (!links || typeof links !== 'object') {
      return res.status(400).json({ error: 'Invalid links data' });
    }

    // Write the updated links to the file
    fs.writeFileSync(filePath, JSON.stringify(links, null, 4), 'utf8');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving links:', error);
    return res.status(500).json({ error: 'Failed to save links' });
  }
}

