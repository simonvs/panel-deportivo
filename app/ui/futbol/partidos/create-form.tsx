'use client';

import Link from 'next/link';
import {
  LifebuoyIcon,
  ShareIcon,
  UserGroupIcon,
  ArrowsUpDownIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMatch, State } from '@/app/lib/actions';
import { useActionState, useState, useEffect } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createMatch, initialState);
  const [today, setToday] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setToday(formattedDate);
  }, []);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-zinc-700 p-4 md:p-6">


      <div className="mb-4">
            <label htmlFor="team" className="mb-2 block text-sm font-medium">
                Equipo
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="team"
                    name="team"
                    type="text"
                    placeholder="Ingresa el nombre del equipo"
                    className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-800 bg-zinc-200 text-black"
                    aria-describedby="team-error"
                />
                <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-800 peer-focus:text-gray-900" />
                </div>
            </div>

            <div id="team-error" aria-live="polite" aria-atomic="true">
                {state.errors?.team &&
                state.errors.team.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
        </div>

        
        <div className="mb-4">
          <label htmlFor="goals" className="mb-2 block text-sm font-medium">
            Goles
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="goals"
                name="goals"
                type="number"
                step="1"
                placeholder="Ingresa la cantidad de goles que hiciste"
                className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-800 bg-zinc-200 text-black"
                aria-describedby="goals-error"
              />
              <LifebuoyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-800 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="goals-error" aria-live="polite" aria-atomic="true">
            {state.errors?.goals &&
              state.errors.goals.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


        <div className="mb-4">
          <label htmlFor="assists" className="mb-2 block text-sm font-medium">
            Asistencias
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="assists"
                name="assists"
                type="number"
                step="1"
                placeholder="Ingresa la cantidad de asistencias que hiciste"
                className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-800 bg-zinc-200 text-black"
                aria-describedby="assists-error"
              />
              <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-800 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="assists-error" aria-live="polite" aria-atomic="true">
            {state.errors?.assists &&
              state.errors.assists.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        
        <div className="mb-4">
          <label htmlFor="goaldifference" className="mb-2 block text-sm font-medium">
            Diferencia de gol
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="goaldifference"
                name="goaldifference"
                type="number"
                step="1"
                placeholder="Ingresa por cuánto ganaron"
                className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-800 bg-zinc-200 text-black"
                aria-describedby="goaldifference-error"
              />
              <ArrowsUpDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-800 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="goaldifference-error" aria-live="polite" aria-atomic="true">
            {state.errors?.goaldifference &&
              state.errors.goaldifference.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        

        <div className="mb-4">
          <label htmlFor="duration" className="mb-2 block text-sm font-medium">
            Duración
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="duration"
                name="duration"
                type="number"
                step="1"
                placeholder="Ingresa cuántos minutos duró el partido"
                className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-800 bg-zinc-200 text-black"
                aria-describedby="duration-error"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-800 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="duration-error" aria-live="polite" aria-atomic="true">
            {state.errors?.duration &&
              state.errors.duration.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


        <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-sm font-medium">
                Fecha del Partido
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={today}
                    onChange={(e) => setToday(e.target.value)}
                    placeholder="Selecciona la fecha del partido"
                    className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-800 bg-zinc-200 text-zinc-800"
                    aria-describedby="date-error"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-800 peer-focus:text-zinc-800" />
                </div>
            </div>

            <div id="date-error" aria-live="polite" aria-atomic="true">
                {state.errors?.date &&
                state.errors.date.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
        </div>



        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/futbol/partidos"
          className="flex h-10 items-center rounded-lg bg-zinc-300 px-4 text-sm font-medium text-zinc-800 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear partido</Button>
      </div>
    </form>
  );
}
