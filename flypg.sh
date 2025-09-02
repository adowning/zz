#!/bin/bash

# --- Configuration ---
# EDIT THESE VARIABLES to match your desired setup.

# The name of your Postgres application. This must be unique on Fly.io.
APP_NAME="tiny-pg-app-asdf-1234"

# The Fly.io organization to deploy into.
# Find yours by running `fly orgs list`.
ORG_NAME="cashflow-796"

# The region where your database will be deployed.
# Find the closest one by running `fly platform regions`.
REGION="dfw" # Ashburn, VA

# The VM size for your Postgres instance.
# 'shared-cpu-1x-256mb' is the smallest and most cost-effective option.
VM_SIZE="shared-cpu-1x"

# The initial size of the persistent storage volume in gigabytes (GB).
# 1GB is the minimum.
VOLUME_SIZE="1"

# The version of PostgreSQL you want to use.
# It's a good practice to pin to a specific version.
PG_VERSION="15.3"

# --- Script ---

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if the organization is set
if [ "$ORG_NAME" == "" ] || [ "$ORG_NAME" == "personal" ]; then
  echo "🛑 Error: Please set your Fly.io organization name in the ORG_NAME variable."
  echo "You can find your organization slug by running: fly orgs list"
  exit 1
fi

echo "🚀 Creating Fly.io Postgres app named '$APP_NAME' in the '$ORG_NAME' organization..."

# The core command to create the Postgres cluster.
# This single command handles:
# - Creating a new Fly.io application.
# - Provisioning a persistent volume for storage.
# - Setting the necessary secrets (like passwords).
# - Launching the Postgres virtual machine.
fly pg create \
  --name "$APP_NAME" \
  --org "$ORG_NAME" \
  --region "$REGION" \
  --vm-size "$VM_SIZE" \
  --volume-size "$VOLUME_SIZE" \
  --image-ref "flyio/postgres-flex:${PG_VERSION}"

echo "✅ Success! Your Postgres server has been deployed."
echo ""
echo "--- Next Steps ---"
echo "➡️  To connect another Fly.io app to this database, run:"
echo "    fly pg attach --app <your-app-name> ${APP_NAME}"
echo ""
echo "➡️  To connect to the database shell directly from your local machine, run:"
echo "    fly pg connect --app ${APP_NAME}"