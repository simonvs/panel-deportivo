import {
    PresentationChartLineIcon,
    ClockIcon,
    ShareIcon
} from '@heroicons/react/24/outline';
import { montserrat } from '@/app/ui/fonts';
//import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    golesTotal: PresentationChartLineIcon,
    golesPorPartido: ClockIcon,
    asitenciasTotal: ShareIcon,
    asistenciasPorPartido: ClockIcon
};

export default async function CardWrapper() {
    // const {
    //     numberOfInvoices,
    //     numberOfCustomers,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    // } = await fetchCardData();

    const numberOfInvoices = 0;
    const numberOfCustomers = 0;
    const totalPaidInvoices = 0;
    const totalPendingInvoices = 0;

    return (
        <>
        <Card title="Total de goles" value={totalPaidInvoices} type="golesTotal" />
        <Card title="Goles promedio por partido" value={totalPendingInvoices} type="golesPorPartido" />
        <Card title="Total Asistencias" value={numberOfInvoices} type="asitenciasTotal" />
        <Card
            title="Asistencias promedio por partido"
            value={numberOfCustomers}
            type="asistenciasPorPartido"
        />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'golesTotal' | 'golesPorPartido' | 'asitenciasTotal' | 'asistenciasPorPartido';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${montserrat.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
