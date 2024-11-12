import {
    LifebuoyIcon,
    ClockIcon,
    ShareIcon
} from '@heroicons/react/24/outline';
import { montserrat } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    golesTotal: LifebuoyIcon,
    golesPorPartido: ClockIcon,
    asitenciasTotal: ShareIcon,
    asistenciasPorPartido: ClockIcon
};

export default async function CardWrapper() {
    const {
        totalGoals,
        averageGoals,
        totalAssists,
        averageAssists,
    } = await fetchCardData();

    return (
        <>
        <Card title="Total de goles" value={totalGoals} type="golesTotal" />
        <Card title="Goles promedio" value={averageGoals} type="golesPorPartido" />
        <Card title="Total Asistencias" value={totalAssists} type="asitenciasTotal" />
        <Card title="Asistencias promedio" value={averageAssists} type="asistenciasPorPartido" />
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
        <div className="rounded-xl bg-green-900 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-6 w-6 p-0.5 text-white rounded-md bg-green-950" /> : null}
                <h3 className={`${montserrat.className} py-0.5 px-1 ml-2 text-sm font-medium`}>{title}</h3>
            </div>
            <p
                className={`${montserrat.className}
                truncate rounded-xl bg-green-950 px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
