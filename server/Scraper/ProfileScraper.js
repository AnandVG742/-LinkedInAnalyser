const puppeteer = require("puppeteer");

const scrapeProfile = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const getText = (selector) =>
      document.querySelector(selector)?.innerText || "N/A";
    // Compute Completeness Score
    const fields = [data.name, data.headline, data.location, data.about];
    const filled = fields.filter((f) => f !== "N/A").length;
    data.score = Math.round((filled / fields.length) * 100);

    const name = getText(".text-heading-xlarge");
    const headline = getText(".text-body-medium.break-words");
    const location = getText(".text-body-small.inline");
    const about = getText(".pv-shared-text-with-see-more span.visually-hidden");

    // Experience: Get top 3 job titles
    const experienceElements = document.querySelectorAll(
      ".pvs-entity__position-group-role-item"
    );
    const experiences = Array.from(experienceElements)
      .slice(0, 3)
      .map((el) => el.innerText.split("\n")[0] || "N/A");

    // Skills: Top 3
    const skillElements = document.querySelectorAll(
      ".pvs-entity__skill-category"
    );
    const skills = Array.from(skillElements)
      .slice(0, 3)
      .map((el) => el.innerText.split("\n")[0] || "N/A");

    return { name, headline, location, about, experiences, skills };
  });

  await browser.close();
  return data;
};

module.exports = scrapeProfile;
