CREATE TYPE "public"."conference_media_type" AS ENUM('image', 'video', 'presentation', 'cover_letter', 'pdf', 'link');--> statement-breakpoint
CREATE TABLE "conference_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"conference_id" integer NOT NULL,
	"type" "conference_media_type" NOT NULL,
	"url" text,
	"title" text,
	"description" text,
	"body" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "conference_speakers" (
	"conference_id" integer NOT NULL,
	"speaker_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "conference_speakers_conference_id_speaker_id_pk" PRIMARY KEY("conference_id","speaker_id")
);
--> statement-breakpoint
CREATE TABLE "conference_tags" (
	"conference_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "conference_tags_conference_id_tag_id_pk" PRIMARY KEY("conference_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "conferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"location" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"embedding" vector(1536),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "speakers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"bio" text,
	"email" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "conference_media" ADD CONSTRAINT "conference_media_conference_id_conferences_id_fk" FOREIGN KEY ("conference_id") REFERENCES "public"."conferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conference_speakers" ADD CONSTRAINT "conference_speakers_conference_id_conferences_id_fk" FOREIGN KEY ("conference_id") REFERENCES "public"."conferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conference_speakers" ADD CONSTRAINT "conference_speakers_speaker_id_speakers_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conference_tags" ADD CONSTRAINT "conference_tags_conference_id_conferences_id_fk" FOREIGN KEY ("conference_id") REFERENCES "public"."conferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conference_tags" ADD CONSTRAINT "conference_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "conference_media_conference_idx" ON "conference_media" USING btree ("conference_id");--> statement-breakpoint
CREATE INDEX "conference_media_type_idx" ON "conference_media" USING btree ("type");