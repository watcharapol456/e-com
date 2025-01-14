ALTER TABLE "user" RENAME TO "userpass";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_userpass_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userpass"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_userpass_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userpass"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_userpass_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userpass"("id") ON DELETE cascade ON UPDATE no action;