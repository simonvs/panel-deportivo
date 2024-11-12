import { UpdateMatch, DeleteMatch } from '@/app/ui/futbol/partidos/buttons';
import { fetchMatches } from '@/app/lib/data';
import { clsx } from 'clsx';
import { montserrat } from '@/app/ui/fonts';


export default async function InvoicesTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const matches = await fetchMatches(currentPage);
  
  return (
    <div className={clsx(montserrat.className, 'mt-6 flow-root')}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-zinc-700 p-2 md:pt-0">
          <div className="md:hidden bg-zinc-700">
            {matches?.map((match) => (
              <div
                key={match.id}
                className="mb-2 w-full rounded-md bg-zinc-700 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{match.team}</p>                      
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{String(match.date.getDate()).padStart(2, '0')+'-'+String(match.date.getMonth() + 1).padStart(2, '0')+'-'+match.date.getFullYear()}</p>
                    <p>Goles: {match.goals}</p>
                    <p>Asistencias: {match.assists}</p>
                    <p>Diferencia: {match.goaldifference}</p>
                    <p>{match.duration} mins</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMatch id={match.id} />
                    <DeleteMatch id={match.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr className='border-b'>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Equipo
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-center">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Goles
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Asistencias
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Diferencia resultado
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Duración
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-700">
              {matches?.map((match) => (
                <tr
                  key={match.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">
                    <div className="flex items-center gap-3">
                      <p>{match.team}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {String(match.date.getDate()).padStart(2, '0')+'-'+String(match.date.getMonth() + 1).padStart(2, '0')+'-'+match.date.getFullYear()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {match.goals}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {match.assists}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {match.goaldifference}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {match.duration} mins
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateMatch id={match.id} />
                      <DeleteMatch id={match.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
