import Pagination from '@/app/ui/futbol/partidos/pagination';
import Table from '@/app/ui/futbol/partidos/table';
import { CreateMatch } from '@/app/ui/futbol/partidos/buttons';
import { montserrat } from '@/app/ui/fonts';
import { MatchesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchMatchesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partidos',
};

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchMatchesPages();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${montserrat.className} text-2xl`}>Partidos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateMatch />
      </div>
      <Suspense key={currentPage} fallback={<MatchesTableSkeleton />}>
        <Table currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
