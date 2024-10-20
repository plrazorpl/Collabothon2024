import React, {useEffect, useState} from 'react';
import {Typography} from "@material-tailwind/react";
import {TimeSpent} from "../../model/TimeSpent.ts";
import {TimeSpentAPI} from "../../api/TimeSpentAPI.ts";
import {useTranslation} from "react-i18next";

function TimeSpentWidget() {

    const [timeSpent, setTimeSpent] = useState<TimeSpent | null>(null);
    const { t} = useTranslation();

    useEffect( () => {
        async function fetchTimeSpentData() {
            const data = await TimeSpentAPI.getTimeSpentData(1)
            setTimeSpent(data);
        }
        fetchTimeSpentData();
    }, []);
    return (
        <>
            {/* bg-gradient-to-l from-bottle-green */}
            <div className={'bg-gradient-to-r from-cb-yellow via-bottle-green-light to-bottle-green p-4 rounded-xl'}>
                <Typography color="gray" className={'text-3xl font-bold my-2'}>{t('timeSpent')}</Typography>
                <div className={'w-full flex flex-col mb-0 text-xl'}>
                    <div>
                        <Typography><span className={'font-bold'}>{t('ourClients')}</span> {timeSpent?.averageCustomersTimeInComparison} %</Typography>
                    </div>
                    <div>
                        <Typography><span className={'font-bold'}>{t('averageClientsTime')}:</span> {(timeSpent?.customerAverageTime / 60.0).toFixed(2)} min</Typography>
                    </div>
                    <div>
                        <Typography><span className={'font-bold'}>{t('yourAverageTime')}:</span> {(timeSpent?.lastVisitDuration / 60.0).toFixed(2)} min</Typography>
                    </div>
                    <div>
                        <Typography><span className={'font-bold'}>{t('trend')}:</span> {timeSpent?.visitTrend} %</Typography>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TimeSpentWidget;