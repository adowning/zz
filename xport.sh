# Set your database credentials
DB_USER="user"
DB_PASS="asdfasdf"
DB_NAME="cashinin"
DB_HOST="localhost"
DB_PORT="5439"

# Create the output directory if it doesn't exist
mkdir -p data

# Export the password as an environment variable
export PGPASSWORD="$DB_PASS"

# Get all table names from the public schema using the new connection details
TABLES=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public';")

# Loop through each table, export its data, and run the convex import
for TBL in $TABLES; do
  FILE_PATH="data/${TBL}.jsonl"
  echo "Exporting table: ${TBL} -> ${FILE_PATH}"

  # Export the data to a file in the data/ directory
  psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT row_to_json(t) FROM ${TBL} t;" > "$FILE_PATH"

  # Check if the file has data and then run the import
  if [ -s "$FILE_PATH" ]; then
    # Remove the very last newline character from the file if it exists
    if [ -n "$(tail -c 1 "$FILE_PATH")" ]; then
        : # File does not end with a newline, do nothing
    else
        truncate -s -1 "$FILE_PATH"
    fi

    echo "-> Importing ${FILE_PATH} to Convex table '${TBL}'..."
    bunx convex import --table "${TBL}" "${FILE_PATH}"
  else
    echo "-> Skipping import for empty table: ${TBL}"
    # Optional: remove the empty file
    rm "$FILE_PATH"
  fi
done

# Unset the password variable for security
unset PGPASSWORD

echo "Export and import process complete!"