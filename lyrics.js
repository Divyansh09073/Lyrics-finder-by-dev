export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    // Step 1: Search API
    const response = await fetch(`https://iamtkm.vercel.app/search/lyrics?q=${encodeURIComponent(q)}`);
    const json = await response.json();

    if (!json?.data?.length) {
      return res.status(404).json({ error: 'No lyrics found' });
    }

    const lyricsUrl = json.data[0].songLyricsUrl;

    // Step 2: Fetch actual lyrics
    const lyricsRes = await fetch(lyricsUrl);
    const lyricsData = await lyricsRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      title: json.data[0].songTitle,
      artist: json.data[0].artist,
      lyrics: lyricsData.lyrics, // assumes lyricsData has this
      coverImage: lyricsData.cover || null
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
}
