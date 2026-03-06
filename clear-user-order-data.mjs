#!/usr/bin/env node
/**
 * Clears ALL order, payment, and customer/user data — nothing else.
 *
 * What gets deleted:
 *   - Sanity: order documents  (includes embedded payment info)
 *   - Sanity: customer documents
 *   - Firebase Auth: all user accounts
 *
 * What is NOT touched:
 *   - products, collections, categories, siteSettings, contactMessages, newsletterSubscribers
 *
 * Required env vars:
 *   SANITY_AUTH_TOKEN          – Sanity Editor/Admin token
 *   FIREBASE_PROJECT_ID        – Firebase project ID
 *   FIREBASE_CLIENT_EMAIL      – Firebase service-account email
 *   FIREBASE_PRIVATE_KEY       – Firebase service-account private key (with literal \n)
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=xxx FIREBASE_PROJECT_ID=xxx FIREBASE_CLIENT_EMAIL=xxx FIREBASE_PRIVATE_KEY="xxx" \
 *     node clear-user-order-data.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// ── Config ─────────────────────────────────────────────────────────────────
const SANITY_PROJECT_ID = "o2vehhtt";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-01-01";

const sanityToken = process.env.SANITY_AUTH_TOKEN;
const fbProjectId = process.env.FIREBASE_PROJECT_ID;
const fbClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const fbPrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// ── Validation ─────────────────────────────────────────────────────────────
const missing = [];
if (!sanityToken) missing.push("SANITY_AUTH_TOKEN");
if (!fbProjectId) missing.push("FIREBASE_PROJECT_ID");
if (!fbClientEmail) missing.push("FIREBASE_CLIENT_EMAIL");
if (!fbPrivateKey) missing.push("FIREBASE_PRIVATE_KEY");

if (missing.length) {
  console.error(`❌  Missing env vars: ${missing.join(", ")}\n`);
  console.error(
    "Usage:\n  SANITY_AUTH_TOKEN=xxx FIREBASE_PROJECT_ID=xxx FIREBASE_CLIENT_EMAIL=xxx FIREBASE_PRIVATE_KEY=\"xxx\" \\\n    node clear-user-order-data.mjs"
  );
  process.exit(1);
}

// ── Sanity helpers ─────────────────────────────────────────────────────────
const sanityBase = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data`;

async function deleteSanityType(type) {
  console.log(`\n📦  Fetching ${type} documents…`);
  const queryRes = await fetch(
    `${sanityBase}/query/${SANITY_DATASET}?query=${encodeURIComponent(
      `*[_type=="${type}"]._id`
    )}`,
    { headers: { Authorization: `Bearer ${sanityToken}` } }
  );
  const { result: ids } = await queryRes.json();

  if (!ids?.length) {
    console.log(`   No ${type} documents found — skipping.`);
    return 0;
  }

  console.log(`   Found ${ids.length} ${type} document(s). Deleting…`);

  const BATCH = 100;
  for (let i = 0; i < ids.length; i += BATCH) {
    const batch = ids.slice(i, i + BATCH);
    const mutations = batch.flatMap((id) => [
      { delete: { id } },
      { delete: { id: `drafts.${id}` } },
    ]);

    const mutRes = await fetch(`${sanityBase}/mutate/${SANITY_DATASET}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sanityToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations }),
    });

    const mutJson = await mutRes.json();
    if (!mutRes.ok) {
      console.error(`   Mutation error:`, JSON.stringify(mutJson, null, 2));
      process.exit(1);
    }

    console.log(
      `   Deleted ${Math.min(i + BATCH, ids.length)}/${ids.length}`
    );
  }

  console.log(`   ✓ All ${type} documents deleted.`);
  return ids.length;
}

// ── Firebase helpers ───────────────────────────────────────────────────────
async function deleteAllFirebaseUsers() {
  console.log(`\n🔥  Fetching Firebase Auth users…`);

  const app = initializeApp({
    credential: cert({
      projectId: fbProjectId,
      clientEmail: fbClientEmail,
      privateKey: fbPrivateKey,
    }),
  });
  const auth = getAuth(app);

  const uids = [];
  let nextPageToken;

  do {
    const listResult = await auth.listUsers(1000, nextPageToken);
    uids.push(...listResult.users.map((u) => u.uid));
    nextPageToken = listResult.pageToken;
  } while (nextPageToken);

  if (!uids.length) {
    console.log(`   No Firebase users found — skipping.`);
    return 0;
  }

  console.log(`   Found ${uids.length} Firebase user(s). Deleting…`);

  const BATCH = 1000;
  for (let i = 0; i < uids.length; i += BATCH) {
    const batch = uids.slice(i, i + BATCH);
    const result = await auth.deleteUsers(batch);
    console.log(
      `   Deleted ${Math.min(i + BATCH, uids.length)}/${uids.length}` +
        (result.failureCount
          ? ` (${result.failureCount} failed)`
          : "")
    );
  }

  console.log(`   ✓ All Firebase users deleted.`);
  return uids.length;
}

// ── Main ───────────────────────────────────────────────────────────────────
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  CLEARING: orders, payment data & user accounts");
console.log("  KEEPING:  products, collections, categories,");
console.log("            siteSettings, contactMessages, newsletter");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

const orders = await deleteSanityType("order");
const customers = await deleteSanityType("customer");
const fbUsers = await deleteAllFirebaseUsers();

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`  ✓ Done.`);
console.log(`    Orders deleted:          ${orders}`);
console.log(`    Customers deleted:       ${customers}`);
console.log(`    Firebase users deleted:  ${fbUsers}`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
