CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "role" varchar
);

CREATE TABLE "cloths" (
  "id" integer PRIMARY KEY,
  "user_id" int,
  "description" string,
  "no_of_wears" int,
  "wears_remaining" int,
  "media_id" int
);

CREATE TABLE "tags" (
  "tag_id" integer PRIMARY KEY,
  "tag_name" string
);

CREATE TABLE "cloth_tag_table" (
  "id" integer PRIMARY KEY,
  "cloth_id" integer,
  "tag_id" integer
);

CREATE TABLE "outfits" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "name" string,
  "description" text
);

CREATE TABLE "outfit_clothing" (
  "id" integer PRIMARY KEY,
  "outfid_id" integer,
  "cloth_id" integer,
  "location_id" integer
);

CREATE TABLE "special_events" (
  "id" integer PRIMARY KEY,
  "description" string,
  "priority" integer,
  "when_is_event" date,
  "outfit_id" integer
);

CREATE TABLE "outfit_calender" (
  "id" integer PRIMARY KEY,
  "outfit_id" integer,
  "user_id" integer,
  "date" date,
  "special_event_id" integer
);

COMMENT ON COLUMN "outfit_clothing"."location_id" IS 'This defines in thsi specifci outfit, where does this clothing item goes';

ALTER TABLE "cloths" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cloth_tag_table" ADD FOREIGN KEY ("cloth_id") REFERENCES "cloths" ("id");

ALTER TABLE "cloth_tag_table" ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("tag_id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "outfit_clothing" ADD FOREIGN KEY ("outfid_id") REFERENCES "outfits" ("id");

ALTER TABLE "outfit_clothing" ADD FOREIGN KEY ("cloth_id") REFERENCES "cloths" ("id");

ALTER TABLE "outfit_calender" ADD FOREIGN KEY ("outfit_id") REFERENCES "outfits" ("id");

ALTER TABLE "outfit_calender" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "outfit_calender" ADD FOREIGN KEY ("special_event_id") REFERENCES "special_events" ("id");
