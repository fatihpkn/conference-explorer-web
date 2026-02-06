import { config } from "@dotenvx/dotenvx";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { speakers } from "../src/shared/lib/db/schemas/speaker.schema";
import { conferences } from "../src/shared/lib/db/schemas/conference.schema";
import { tags } from "../src/shared/lib/db/schemas/tag.schema";
import { conferenceSpeakers } from "../src/shared/lib/db/schemas/conference-speaker.schema";
import { conferenceTags } from "../src/shared/lib/db/schemas/conference-tag.schema";
import { conferenceMedia } from "../src/shared/lib/db/schemas/conference-media.schema";

config({ path: ".env.local" });

async function seedDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (process.env.RUN_SEED !== "true" || !process.env.RUN_SEED) {
    console.log("🪧 ☢️ Seeding is disabled");
    return;
  }

  console.log("🌱 Seeding database...");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const db = drizzle(pool);

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await db.delete(conferenceMedia);
  await db.delete(conferenceSpeakers);
  await db.delete(conferenceTags);
  await db.delete(conferences);
  await db.delete(speakers);
  await db.delete(tags);

  // Seed Speakers
  console.log("👤 Seeding speakers...");
  const speakerData = Array.from({ length: 30 }).map(() => ({
    name: faker.person.fullName(),
    bio: faker.person.bio(),
    email: faker.internet.email().toLowerCase(),
  }));

  const insertedSpeakers = await db
    .insert(speakers)
    .values(speakerData)
    .returning();
  console.log(`✅ Created ${insertedSpeakers.length} speakers`);

  // Seed Tags
  console.log("🏷️  Seeding tags...");
  const techTags = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AI/ML",
    "DevOps",
    "Cloud",
    "Kubernetes",
    "Docker",
    "GraphQL",
    "REST API",
    "Microservices",
    "Serverless",
    "Web3",
    "Blockchain",
    "Cybersecurity",
    "Data Science",
    "Mobile Development",
  ];

  const tagData = techTags.map((name) => ({ name }));
  const insertedTags = await db.insert(tags).values(tagData).returning();
  console.log(`✅ Created ${insertedTags.length} tags`);

  // Seed Conferences
  console.log("🎤 Seeding conferences...");
  const conferenceTypes = [
    "Summit",
    "Conference",
    "Meetup",
    "Workshop",
    "Symposium",
    "Forum",
    "Expo",
    "Convention",
  ];

  const conferenceTopics = [
    "Web Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Data Engineering",
    "Mobile Apps",
    "DevOps",
    "Cybersecurity",
    "Blockchain",
    "UX/UI Design",
    "Software Architecture",
  ];

  const conferenceData = Array.from({ length: 100 }).map(() => {
    const startDate = faker.date.between({
      from: new Date(),
      to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Next year
    });
    const endDate = new Date(
      startDate.getTime() +
        faker.number.int({ min: 1, max: 5 }) * 24 * 60 * 60 * 1000
    );

    return {
      name: `${faker.helpers.arrayElement(
        conferenceTopics
      )} ${faker.helpers.arrayElement(
        conferenceTypes
      )} ${startDate.getFullYear()}`,
      description: faker.lorem.paragraphs(2),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      startDate,
      endDate,
      embedding: null,
    };
  });

  const insertedConferences = await db
    .insert(conferences)
    .values(conferenceData)
    .returning();
  console.log(`✅ Created ${insertedConferences.length} conferences`);

  // Seed Conference-Speaker relationships
  console.log("🔗 Linking speakers to conferences...");
  const conferenceSpeakerData = [];
  for (const conference of insertedConferences) {
    // Each conference has 2-5 speakers
    const speakerCount = faker.number.int({ min: 2, max: 5 });
    const selectedSpeakers = faker.helpers.arrayElements(
      insertedSpeakers,
      speakerCount
    );

    for (const speaker of selectedSpeakers) {
      conferenceSpeakerData.push({
        conferenceId: conference.id,
        speakerId: speaker.id,
      });
    }
  }

  await db.insert(conferenceSpeakers).values(conferenceSpeakerData);
  console.log(
    `✅ Created ${conferenceSpeakerData.length} speaker-conference links`
  );

  // Seed Conference-Tag relationships
  console.log("🔗 Linking tags to conferences...");
  const conferenceTagData = [];
  for (const conference of insertedConferences) {
    // Each conference has 2-4 tags
    const tagCount = faker.number.int({ min: 2, max: 4 });
    const selectedTags = faker.helpers.arrayElements(insertedTags, tagCount);

    for (const tag of selectedTags) {
      conferenceTagData.push({
        conferenceId: conference.id,
        tagId: tag.id,
      });
    }
  }

  await db.insert(conferenceTags).values(conferenceTagData);
  console.log(`✅ Created ${conferenceTagData.length} tag-conference links`);

  // Seed Conference Media
  console.log("📸 Seeding conference media...");
  const mediaData = [];
  for (const conference of insertedConferences) {
    // Each conference has 1 cover letter, 1-2 images, and optionally video/slides
    mediaData.push({
      conferenceId: conference.id,
      type: "cover_letter" as const,
      title: `About ${conference.name}`,
      description: faker.lorem.paragraph(),
      body: faker.lorem.paragraphs(3),
      url: null,
    });

    // Add 1-2 images
    const imageCount = faker.number.int({ min: 1, max: 2 });
    for (let i = 0; i < imageCount; i++) {
      const imageNumber = faker.number.int({ min: 1, max: 1000 });
      mediaData.push({
        conferenceId: conference.id,
        type: "image" as const,
        url: `https://static.photos/gradient/640x360/${imageNumber}`,
        title: `${conference.name} - Image ${i + 1}`,
        description: faker.lorem.sentence(),
        body: null,
      });
    }

    // 50% chance of having a video
    if (faker.datatype.boolean()) {
      mediaData.push({
        conferenceId: conference.id,
        type: "video" as const,
        url: `https://www.youtube.com/watch?v=${faker.string.alphanumeric(11)}`,
        title: `${conference.name} - Highlights`,
        description: faker.lorem.sentence(),
        body: null,
      });
    }

    // 50% chance of having slides
    if (faker.datatype.boolean()) {
      mediaData.push({
        conferenceId: conference.id,
        type: "presentation" as const,
        url: `https://slides.com/${faker.internet.username()}/${faker.string.alphanumeric(
          8
        )}`,
        title: `${conference.name} - Presentation`,
        description: faker.lorem.sentence(),
        body: null,
      });
    }

    // 30% chance of having a PDF document
    if (faker.datatype.boolean()) {
      mediaData.push({
        conferenceId: conference.id,
        type: "pdf" as const,
        url: `https://example.com/docs/${faker.string.alphanumeric(8)}.pdf`,
        title: `${conference.name} - Whitepaper`,
        description: faker.lorem.sentence(),
        body: null,
      });
    }

    // 30% chance of having a link resource
    if (faker.datatype.boolean()) {
      mediaData.push({
        conferenceId: conference.id,
        type: "link" as const,
        url: `https://${faker.internet.domainName()}/article/${faker.string.alphanumeric(
          8
        )}`,
        title: `${conference.name} - Related Article`,
        description: faker.lorem.sentence(),
        body: null,
      });
    }
  }

  await db.insert(conferenceMedia).values(mediaData);
  console.log(`✅ Created ${mediaData.length} media items`);

  await pool.end();
  console.log("✅ Database seeded successfully!");
}

seedDatabase().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
