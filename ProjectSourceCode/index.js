// Keep any existing environment-loading code before importing app.
// const app = require('./app');
// const db = require('./db');
const { app, db } = require('./app');
const port = process.env.PORT || 3000;

//======== API TO DATABASE ==================
async function apiToDatabase() {
  //Checks if countries are already stored
  const result = await db.one( 
    'SELECT COUNT(*) FROM countries'
  );

  //If there are no countries it will insert them
  if (Number(result.count) === 0) {

    let offset = 0;
    const limit = 100;

    while (true) {
      const url =
        `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}&response_fields=names.common,capital,codes.alpha_3,flag.png,region,population,area`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`
        }
      });

      console.log('API status:', response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const countries = data.data?.objects;

      for (const country of countries) {
        
        const insertQuery = await db.none(`
          INSERT INTO countries (
            c_name, c_capital, c_codes, c_flag,
            c_region, c_population, c_area
          )
          VALUES ($1,$2,$3,$4,$5,$6,$7)
        `, [
            country.names?.common,
            country.capitals?.[0]?.name ?? null,
            country.codes?.alpha_3 || null,
            country.flag?.url_png ?? null,
            country.region ?? null,
            country.population ?? null,
            country.area?.kilometers ?? null
          ]);

      }

      if (countries.length < limit) {
        break;
      }

      offset += limit;
    }

  }
}

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

async function startServer() {
  try {
    await apiToDatabase();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Startup error:', error);
  }
}

startServer();