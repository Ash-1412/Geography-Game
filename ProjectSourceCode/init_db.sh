PG_URI="postgresql://users_db_gw6l_user:zBTdqhHZC8AeHGudl5vOsaWGOCjxxe5X@dpg-dbvm3ct9fdbs73bm0pv0-a.oregon-postgres.render.com/users_db_gw6l"

for file in init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done