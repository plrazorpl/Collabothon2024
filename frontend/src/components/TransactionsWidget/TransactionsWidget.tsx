import React, { useEffect, useState } from 'react';
import { Typography } from "@material-tailwind/react";
import { TransactionsAPI } from "../../api/TransactionsAPI.ts";
import {Tooltip} from "@material-tailwind/react";
import {Transactions} from "../../model/Transactions.ts";
import {useTranslation} from "react-i18next";

function TransactionsWidget() {
    const [transactions, setTransactions] = useState<Transactions  | null>(null);
    const { t} = useTranslation();

    useEffect(() => {
        async function fetchTransactionsData() {
            const data = await TransactionsAPI.getTransactionsData(1)
            setTransactions(data);
        }

        fetchTransactionsData();
    }, []);

    if (!transactions) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={'glossy-background w-full h-full text-white p-4 rounded-xl'}>
                <div className="content">
                    <Typography className={'text-3xl font-bold my-2'}>{t('transactions')}</Typography>
                    <div className={'w-full flex flex-col mb-0 text-xl'}>
                        <Typography className={'text-xl'}>
                            <span className={'font-bold'}>{t('cashTransactions')}:</span> {transactions.cashTransactions}
                        </Typography>
                        <Typography className={'text-xl'}>
                            <span className={'font-bold'}>{t('onlineTransactions')}:</span> {transactions.onlineTransactions}
                        </Typography>
                        <div className={'md:flex md:items-center gap-4 text-xl'}>
                            <Typography><span className={'font-bold'}>{t('carbonFootprint')}:</span> {transactions.cashTransactions * 0.5 + transactions.onlineTransactions * 0.2} kg CO2</Typography>
                            <Tooltip
                                content={
                                    <div className=" w-60 bg-bottle-green p-4 border-2 border-textColor">
                                        <Typography color="white" className="font-bold text-lg mb-2">
                                            {t('carbonFootprintTooltip')}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal bg-bottle-green"
                                        >
                                            {t('tooltipContent')}
                                        </Typography>
                                    </div>
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5 cursor-pointer text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionsWidget;
