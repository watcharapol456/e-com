CREATE TABLE "stock_inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"imgURL" text,
	"label_name" varchar(255) NOT NULL,
	"label_price" integer NOT NULL,
	"features" text,
	"ingredients" text,
	"properties" text,
	"usage" text,
	"registration_number" text,
	"brand" varchar(255),
	"benefits" text,
	"warnings" text
);
