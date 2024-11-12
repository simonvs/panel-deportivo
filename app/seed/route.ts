import { db } from '@vercel/postgres';
import { matches } from '../lib/placeholder-data';

const client = await db.connect();

async function seedMatches() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS matches (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      team VARCHAR(255) NOT NULL,
      goals INT NOT NULL,
      assists INT NOT NULL,
      goalDifference INT NOT NULL,
      duration INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedMatches = await Promise.all(
    matches.map(async (match) => {
      return client.sql`
        INSERT INTO matches (id, team, goals, assists, goalDifference, duration, date)
        VALUES (${match.id}, ${match.team}, ${match.goals}, ${match.assists}, ${match.goalDifference}, ${match.duration}, ${match.date})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedMatches;
}



export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedMatches();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }
  