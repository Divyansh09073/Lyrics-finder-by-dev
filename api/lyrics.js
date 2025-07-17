export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    const response = await fetch(`https://iamtkm.vercel.app/search/lyrics?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
}
