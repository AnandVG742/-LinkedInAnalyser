const express = require('express');
const router = express.Router();
const scrapeProfile = require('../scraper/scrapeProfile');

router.post('/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const data = await scrapeProfile(url);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

module.exports = router;
