CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "role" varchar
);

CREATE TABLE "cloths" (
  "id" integer PRIMARY KEY,
  "user_id" int,
  "description" string,
  "type" int,
  "season" string,
  "color_id" int,
  "material" int,
  "no_of_wears" int
);

CREATE TABLE "type" (
  "type_id" int PRIMARY KEY,
  "type_name" string
);

CREATE TABLE "colors" (
  "color_id" int PRIMARY KEY,
  "color_code" string,
  "color_name" string
);

CREATE TABLE "tags" (
  "tag_id" integer PRIMARY KEY,
  "tag_name" string
);

CREATE TABLE "materials" (
  "material_id" integer PRIMARY KEY,
  "material_type" string,
  "no_of_wears" int
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
  "when_is_event" date
);

CREATE TABLE "outfit_special_events" (
  "id" integer PRIMARY KEY,
  "outfit_id" integer,
  "special_events" integer
);

CREATE TABLE "outfit_location" (
  "id" integer PRIMARY KEY,
  "location" string
);

CREATE TABLE "outfit_calender" (
  "id" integer PRIMARY KEY,
  "outfit_id" integer,
  "user_id" integer,
  "date" date,
  "special_event_id" integer
);

COMMENT ON COLUMN "colors"."color_code" IS 'This is hex code of a color';

COMMENT ON COLUMN "materials"."no_of_wears" IS 'No of wears in days';

COMMENT ON COLUMN "outfit_clothing"."location_id" IS 'This defines in thsi specifci outfit, where does this clothing item goes';

COMMENT ON COLUMN "outfit_location"."location" IS 'Each location would be specific string that we will predefine and it asserts where the outfit goes just incase we need to show it visually, like Top or Bottom or Shocks or wearbale etc. Reason i did not put it in cloth itself is people are weird, some might wear a shirt in the bottom part, who knows';

ALTER TABLE "cloths" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cloths" ADD FOREIGN KEY ("type") REFERENCES "type" ("type_id");

ALTER TABLE "cloths" ADD FOREIGN KEY ("color_id") REFERENCES "colors" ("color_id");

ALTER TABLE "cloths" ADD FOREIGN KEY ("material") REFERENCES "materials" ("material_id");

ALTER TABLE "cloth_tag_table" ADD FOREIGN KEY ("cloth_id") REFERENCES "cloths" ("id");

ALTER TABLE "cloth_tag_table" ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("tag_id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "outfit_clothing" ADD FOREIGN KEY ("outfid_id") REFERENCES "outfits" ("id");

ALTER TABLE "outfit_clothing" ADD FOREIGN KEY ("cloth_id") REFERENCES "cloths" ("id");

ALTER TABLE "outfit_clothing" ADD FOREIGN KEY ("location_id") REFERENCES "outfit_location" ("id");

ALTER TABLE "outfit_special_events" ADD FOREIGN KEY ("outfit_id") REFERENCES "outfits" ("id");

ALTER TABLE "outfit_special_events" ADD FOREIGN KEY ("special_events") REFERENCES "special_events" ("id");

ALTER TABLE "outfit_calender" ADD FOREIGN KEY ("outfit_id") REFERENCES "outfits" ("id");

ALTER TABLE "outfit_calender" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "outfit_calender" ADD FOREIGN KEY ("special_event_id") REFERENCES "special_events" ("id");
