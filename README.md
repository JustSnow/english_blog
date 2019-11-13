# english_blog
Blog on nodejs

# Postgres SQL
write flow how to prepare databases
`/Applications/Postgres.app/Contents/Versions/11/bin/psql -U postgres`
create database

# Session store

`psql mydatabase < node_modules/connect-pg-simple/table.sql`

```
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```
