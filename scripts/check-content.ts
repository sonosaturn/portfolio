// Gate check for the content layer (run with `npm run check:content`).
// Not a page — verifies the loader returns typed sample content and that
// getBySlug round-trips. Malformed-frontmatter rejection is exercised by the
// loader throwing; see the demo case at the bottom.
import assert from "node:assert/strict";
import matter from "gray-matter";
import {
  getAllProjects,
  getAllInterests,
  getProjectBySlug,
  getInterestBySlug,
  projectSchema,
} from "../lib/content.ts";

const projects = getAllProjects();
const interests = getAllInterests();

assert.ok(projects.length >= 1, "expected at least 1 project");
assert.ok(interests.length >= 1, "expected at least 1 interest");

for (const p of projects) {
  assert.equal(typeof p.title, "string");
  assert.ok(p.date instanceof Date && !Number.isNaN(p.date.getTime()), `bad date: ${p.slug}`);
  assert.ok(["wip", "completed"].includes(p.status), `bad status: ${p.slug}`);
  assert.ok(Array.isArray(p.tags) && Array.isArray(p.stack));
  assert.equal(typeof p.body, "string");
}
for (const i of interests) {
  assert.ok(
    ["gym", "gaming", "music", "movies", "other"].includes(i.category),
    `bad category: ${i.slug}`,
  );
}

// getBySlug round-trips
assert.equal(getProjectBySlug(projects[0].slug)?.slug, projects[0].slug);
assert.equal(getInterestBySlug(interests[0].slug)?.slug, interests[0].slug);
assert.equal(getProjectBySlug("does-not-exist"), undefined);

// Validation rejects malformed frontmatter with a clear error (agent safety net)
const badFile = matter("---\ntitle: X\n---\nbody").data; // missing required fields
const bad = projectSchema.safeParse(badFile);
assert.equal(bad.success, false, "malformed frontmatter must be rejected");

console.log(`OK — ${projects.length} project(s), ${interests.length} interest(s)`);
for (const p of projects)
  console.log(`  project:  ${p.slug} [${p.status}] ${p.date.toISOString().slice(0, 10)}`);
for (const i of interests) console.log(`  interest: ${i.slug} [${i.category}]`);
