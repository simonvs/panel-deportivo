'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  team: z.string({
    invalid_type_error: 'Introduce el equipo con el que jugaste.',
  }),
  goals: z.coerce
    .number()
    .gt(0, { message: 'Introduce los goles que hiciste.' }),
  assists: z.coerce
    .number()
    .gt(0, { message: 'Introduce las asistencias que hiciste.' }),
	goaldifference: z.coerce
    .number()
    .gt(0, { message: 'Introduce por cuánto ganaron.' }),
	duration: z.coerce
    .number()
    .gt(0, { message: 'Introduce cuántos minutos duró el partido.' }),
  date: z.string({
    invalid_type_error: 'Introduce la fecha en la que se jugó.',
  }),
});

const CreateMatch = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    team?: string[];
    goals?: string[];
    assists?: string[];
		goaldifference?: string[];
		duration?: string[];
		date?: string[];
  };
  message?: string | null;
};

export async function createMatch(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateMatch.safeParse({
    team: formData.get('team'),
    goals: formData.get('goals'),
    assists: formData.get('assists'),
		goaldifference: formData.get('goaldifference'),
		duration: formData.get('duration'),
		date: formData.get('date'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al crear partido: faltan campos.',
    };
  }

  // Prepare data for insertion into the database
  const { team, goals, assists, goaldifference, duration, date } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO matches (team, goals, assists, goaldifference, duration, date)
      VALUES (${team}, ${goals}, ${assists}, ${goaldifference}, ${duration}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Match.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/futbol/partidos');
  redirect('/futbol/partidos');
}

export async function deleteMatch(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM matches WHERE id = ${id}`;
    revalidatePath('/futbol/partidos');
    return { message: 'Partido eliminado' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Match.' };
  }
}