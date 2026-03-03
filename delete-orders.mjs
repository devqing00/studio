/**
 * Deletes ALL order and customer documents from Sanity.
 * Run: node delete-orders.mjs
 *
 * Requires: SANITY_AUTH_TOKEN env var
 *   Get one from https://manage.sanity.io → your project → API → Tokens → Add Editor token
 *   Then: SANITY_AUTH_TOKEN=your_token node delete-orders.mjs
 */

const PROJECT_ID = "o2vehhtt";
const DATASET = "production";
const API_VERSION = "2024-01-01";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("❌  Missing SANITY_AUTH_TOKEN\n");
  console.error(
    "Usage: SANITY_AUTH_TOKEN=<token> node delete-orders.mjs\n"
  );
  console.error(
    "Get a token at: https://manage.sanity.io → API → Tokens → Add Editor token"
  );
  process.exit(1);
}

const base = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data`;

async function deleteByType(type) {
  console.log(`\nFetching ${type} IDs…`);
  const queryRes = await fetch(
    `${base}/query/${DATASET}?query=${encodeURIComponent(`*[_type=="${type}"]._id`)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const { result: ids } = await queryRes.json();

  if (!ids?.length) {
    console.log(`  No ${type} documents found — skipping.`);
    return;
  }

  console.log(`  Found ${ids.length} ${type}(s). Deleting…`);

  const BATCH = 100;
  for (let i = 0; i < ids.length; i += BATCH) {
    const batch = ids.slice(i, i + BATCH);
    const mutations = batch.flatMap((id) => [
      { delete: { id } },
      { delete: { id: `drafts.${id}` } },
    ]);

    const mutRes = await fetch(`${base}/mutate/${DATASET}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations }),
    });

    const mutJson = await mutRes.json();
    if (!mutRes.ok) {
      console.error(`  Mutation error:`, JSON.stringify(mutJson, null, 2));
      process.exit(1);
    }

    console.log(`  Deleted ${Math.min(i + BATCH, ids.length)}/${ids.length}`);
  }

  console.log(`  ✓ All ${type} documents deleted.`);
}

await deleteByType("order");
await deleteByType("customer");

console.log("\n✓ Done.");
