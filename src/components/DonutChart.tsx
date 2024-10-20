"use client";
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const accounts = [
    {currency: "USD", iban: "US12345678901234567890", balance: 11000.50},
    {currency: "EUR", iban: "DE12345678901234567890", balance: 22500.75},
    {currency: "GBP", iban: "GB12345678901234567890", balance: 31500.00},
    {currency: "PLN", iban: "PL12345678901234567890", balance: 43000.00},
    {currency: "AUD", iban: "AU12345678901234567890", balance: 5800.00},
];

const DonutChart = () => {
    // Prepare the data for the pie chart
    const chartData = accounts.map((account) => ({
        name: account.currency,
        y: account.balance,
    }));

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            width: null,
            events: {
                render() {
                    const chart = this,
                        series = chart.series[0];
                    let customLabel = chart.options.chart.custom?.label;

                    if (!customLabel) {
                        customLabel = chart.options.chart.custom = {
                            label: chart.renderer
                                .label('')
                                .css({
                                    color: '#000',
                                    textAnchor: 'middle',
                                })
                                .add(),
                        };
                    }

                    const x = series.center[0] + chart.plotLeft;
                    const y =
                        series.center[1] + chart.plotTop - customLabel.label?.attr('height') / 2;

                    customLabel.label?.attr({
                        x,
                        y,
                    });

                    // Set font size based on chart diameter
                    customLabel.label?.css({
                        fontSize: `${series.center[2] / 12}px`,
                    });
                },
            },

        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '',
        },
        legend: {
            enabled: false,
            layout: "vertical",
            align: "right",
            verticalAlign: 'middle',
            itemMarginTop: 10,
            itemMarginBottom: 10,
            labelFormatter: function () {
                console.log(this);
                return '<span style="font-size: 1.1em;"> ' + this.y + '€</span>';
            },
        },
        plotOptions: {
            series: {
                enableMouseTracking: false,
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: [
                    {
                        enabled: false,
                        distance: 20,
                        format: '{point.name}',
                    },
                    {
                        enabled: true,
                        distance: -15,
                        format: '',
                        style: {
                            fontSize: '0.9em',
                        },
                    },
                ],
                showInLegend: true,
            },
        },
        // Add custom colors here
        colors: [
            '#3a7e8a', // Ocean Petrol (Closest match to Teal)
            '#93c1b4', // Yellow (Exact match)
            '#d5dbb6', // Mint (Closest match to Light Blue-Gray)
            '#d6c18b', // Mint (Closest match to Light Blue-Gray)
            '#bf925e', // Mint (Closest match to Light Blue-Gray)
            '#9b5c2f', // Mint (Closest match to Light Blue-Gray)
        ],
        series: [
            {
                name: 'Balance',
                colorByPoint: true,
                innerSize: '75%',
                data: chartData,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
        ],
        credits: {
            enabled: false,
        }
    };

    const defaultColorPalette = [
        '#3a7e8a', // Ocean Petrol (Closest match to Teal)
        '#93c1b4', // Yellow (Exact match)
        '#d5dbb6', // Mint (Closest match to Light Blue-Gray)
        '#d6c18b', // Mint (Closest match to Light Blue-Gray)
        '#bf925e', // Mint (Closest match to Light Blue-Gray)
        '#9b5c2f', // Mint (Closest match to Light Blue-Gray)
    ];

    return (
        <figure className="grid grid-cols-4">
            <div className={"col-span-2"}>
                <HighchartsReact
                    containerProps={{
                        style: {
                        },
                    }}
                    highcharts={Highcharts} options={options}/>
            </div>
            <div className={"grid grid-cols-1 py-16 gap-1"}>
                {
                    accounts.map(
                        ({balance, iban, currency}) =>
                            (
                                <p key={iban} className={"font-bold"}>{balance} {currency}</p>
                            )
                    )
                }
            </div>
        </figure>
    );
};

export default DonutChart;
