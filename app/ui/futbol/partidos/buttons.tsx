import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteMatch } from '@/app/lib/actions';
import { montserrat } from '@/app/ui/fonts';
import { clsx } from 'clsx';

export function CreateMatch() {
  return (
    <Link
      href="/futbol/partidos/create"
      className="flex h-10 items-center rounded-lg bg-green-900 px-4 text-sm font-medium text-white transition-colors hover:bg-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className={clsx(montserrat.className,"hidden md:block")}>Nuevo partido</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMatch({ id }: { id: string }) {
  return (
    <Link
      href={`/futbol/partidos/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-950"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMatch({ id }: { id: string }) {
  const deleteMatchWithId = deleteMatch.bind(null, id);

  return (
    <form onSubmit={deleteMatchWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-green-950">
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
