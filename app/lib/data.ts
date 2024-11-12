import { sql } from '@vercel/postgres';
import { MatchesTable } from './definitions';


const ITEMS_PER_PAGE = 6;
export async function fetchMatchesPages() {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM matches
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchMatches(
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<MatchesTable>`
      SELECT
        matches.id,
        matches.date,
        matches.team,
        matches.goals,
        matches.assists,
        matches.goaldifference,
        matches.duration
      FROM matches
      ORDER BY matches.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch matches.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const totalGoalsPromise = sql`SELECT SUM(goals) FROM matches`;
    const averageGoalsPromise = sql`SELECT AVG(goals) FROM matches`;
    const totalAssistsPromise = sql`SELECT SUM(assists) FROM matches`;
    const averageAssistsPromise = sql`SELECT AVG(assists) FROM matches`;

    const data = await Promise.all([
      totalGoalsPromise,
      averageGoalsPromise,
      totalAssistsPromise,
      averageAssistsPromise,
    ]);

    const totalGoals = Number(data[0].rows[0].sum ?? '0');
    const averageGoals = Number(data[1].rows[0].avg ?? '0');
    const totalAssists = Number(data[2].rows[0].sum ?? '0');
    const averageAssists = Number(data[3].rows[0].avg ?? '0');

    return {
      totalGoals,
      averageGoals,
      totalAssists,
      averageAssists,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}