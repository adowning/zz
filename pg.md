Postgres cluster tiny-pg-app-asdf-1234 created
Username: postgres
Password: qF3vbjpmKmpJy7V
Hostname: tiny-pg-app-asdf-1234.internal
Flycast: fdaa:24:9428:0:1::2
Proxy port: 5432
Postgres port: 5433
Connection string: postgres://postgres:qF3vbjpmKmpJy7V@tiny-pg-app-asdf-1234.flycast:5432

Save your credentials in a secure place -- you won't be able to see them again!

Connect to postgres
Any app within the cashflow organization can connect to this Postgres using the above connection string

Now that you've set up Postgres, here's what you need to understand: https://fly.io/docs/postgres/getting-started/what-you-should-know/
✅ Success! Your Postgres server has been deployed.

--- Next Steps ---
➡️ To connect another Fly.io app to this database, run:
fly pg attach --app <your-app-name> tiny-pg-app-asdf-1234

➡️ To connect to the database shell directly from your local machine, run:
fly pg connect --app tiny-pg-app-asdf-1234
