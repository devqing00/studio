/**
 * Seeds the initial 3-level category hierarchy in Sanity.
 *
 * Level 1 (Main): Womenswear, Menswear, Raw Fabrics
 * Level 2 (Sub) under Raw Fabrics: Adire, Ankara, Crepe
 *
 * Run: SANITY_AUTH_TOKEN=your_token node seed-categories.mjs
 */

const PROJECT_ID = "o2vehhtt";
const DATASET = "production";
const API_VERSION = "2024-01-01";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("❌  Missing SANITY_AUTH_TOKEN\n");
  console.error("Usage: SANITY_AUTH_TOKEN=<token> node seed-categories.mjs\n");
  console.error(
    "Get a token at: https://manage.sanity.io → API → Tokens → Add Editor token"
  );
  process.exit(1);
}

const base = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data`;

async function createDoc(doc) {
  const res = await fetch(`${base}/mutate/${DATASET}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [{ create: doc }],
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`  ❌ Failed to create "${doc.title}":`, json);
    return null;
  }
  const id = json.results?.[0]?.id;
  console.log(`  ✅ Created "${doc.title}" → ${id}`);
  return id;
}

async function main() {
  console.log("🌱 Seeding categories…\n");

  // Check if categories already exist
  const query = encodeURIComponent('count(*[_type == "category"])');
  const checkRes = await fetch(`${base}/query/${DATASET}?query=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const checkJson = await checkRes.json();
  const count = checkJson.result;
  if (count > 0) {
    console.log(`⚠️  ${count} categories already exist. Skipping seed to avoid duplicates.`);
    console.log("   Delete existing categories first if you want to re-seed.");
    process.exit(0);
  }

  // ── Level 1: Main categories ──
  console.log("Creating main categories (Level 1)…");

  const womenswearId = await createDoc({
    _type: "category",
    title: "Womenswear",
    slug: { _type: "slug", current: "womenswear" },
    level: 1,
    order: 0,
    description: "Women's fashion and apparel",
  });

  const menswearId = await createDoc({
    _type: "category",
    title: "Menswear",
    slug: { _type: "slug", current: "menswear" },
    level: 1,
    order: 1,
    description: "Men's fashion and apparel",
  });

  const fabricsId = await createDoc({
    _type: "category",
    title: "Raw Fabrics",
    slug: { _type: "slug", current: "raw-fabrics" },
    level: 1,
    order: 2,
    description: "Premium African textiles and raw fabrics",
  });

  // ── Level 2: Sub-sections under Raw Fabrics ──
  if (fabricsId) {
    console.log("\nCreating sub-sections under Raw Fabrics (Level 2)…");

    await createDoc({
      _type: "category",
      title: "Adire",
      slug: { _type: "slug", current: "adire" },
      level: 2,
      order: 0,
      description: "Traditional Yoruba tie-dye and resist-dye fabric",
      parent: { _type: "reference", _ref: fabricsId },
    });

    await createDoc({
      _type: "category",
      title: "Ankara",
      slug: { _type: "slug", current: "ankara" },
      level: 2,
      order: 1,
      description: "Vibrant African wax print fabric",
      parent: { _type: "reference", _ref: fabricsId },
    });

    await createDoc({
      _type: "category",
      title: "Crepe",
      slug: { _type: "slug", current: "crepe" },
      level: 2,
      order: 2,
      description: "Lightweight textured crepe fabric",
      parent: { _type: "reference", _ref: fabricsId },
    });
  }

  console.log("\n✨ Done! 6 categories seeded.");
  console.log("You can add Level 3 tags (sub-sub-sections) via the admin dashboard.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
