module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set on server' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  // Extract the prompt text from the Anthropic-style request body
  const promptText = body?.messages?.[0]?.content || '';

  // Translate to Gemini API format
  const geminiBody = {
    contents: [{ parts: [{ text: promptText }] }],
    generationConfig: { maxOutputTokens: 1200, temperature: 0.7 },
  };

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error?.message || JSON.stringify(data) });
    }

    // Translate Gemini response back to Anthropic-style so the frontend works unchanged
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({
      content: [{ type: 'text', text }],
    });

  } catch (err) {
    return res.status(502).json({ error: 'Upstream error: ' + err.message });
  }
};
