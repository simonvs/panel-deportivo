import Form from '@/app/ui/futbol/partidos/create-form';
import Breadcrumbs from '@/app/ui/futbol/partidos/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  	title: 'Create Invoice',
};

export default async function Page() {

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
				{ label: 'Partidos', href: '/futbol/partidos' },
				{
					label: 'Crear partido',
					href: '/futbol/partidos/create',
					active: true,
				},
				]}
			/>
			<Form />
		</main>
  );
}
