import React from 'react';

export interface Account {
    currency: string;
    iban: string;
    balance: number;
}

interface DiversifiedProgressBarProps {
    accounts: Account[];
    colorPalette?: string[];  // Optional color palette prop
}

// Helper function to return currency symbol based on currency code
const getCurrencySymbol = (currency: string): string => {
    switch (currency) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'GBP':
            return '£';
        case 'JPY':
            return '¥';
        case 'CAD':
            return 'C$';
        case 'AUD':
            return 'A$';
        case 'CHF':
            return 'Fr';
        case 'CNY':
            return '¥';
        default:
            return currency;  // Return the currency code as fallback
    }
};

const DiversifiedProgressBar: React.FC<DiversifiedProgressBarProps> = ({ accounts, colorPalette }) => {
    // Default accessible color palette
    const defaultColorPalette = [
        '#3a7e8a', // Ocean Petrol (Closest match to Teal)
        '#93c1b4', // Yellow (Exact match)
        '#d5dbb6', // Mint (Closest match to Light Blue-Gray)
        '#d6c18b', // Mint (Closest match to Light Blue-Gray)
        '#bf925e', // Mint (Closest match to Light Blue-Gray)
        '#9b5c2f', // Mint (Closest match to Light Blue-Gray)
    ];

    // Use the provided colorPalette prop, or fallback to the default palette
    const colors = colorPalette || defaultColorPalette;

    // Helper function to get colors based on index
    const getColor = (index: number) => {
        return colors[index % colors.length];
    };

    const sortedAccounts = accounts.sort((a, b) => b.balance - a.balance);

    // Calculate total balance
    const totalBalance = sortedAccounts.reduce((sum, account) => sum + account.balance, 0);

    // Map sortedAccounts data to sections with percentage and colors
    const sections = sortedAccounts.map((account, index) => {
        const sign = getCurrencySymbol(account.currency);
        const symbol = account.currency;
        return {
            label: `${symbol} ${account.balance.toFixed(2)} ${sign}`,
            value: (account.balance / totalBalance) * 100, // Percentage of the total
            color: getColor(index), // Get color based on index
        };
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Your Currency Breakdown</h1>

            <div className="border border-gray-300 rounded-full overflow-hidden h-8 flex w-full">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        title={`${section.label}: ${section.value.toFixed(2)}%`}
                        className={`flex items-center justify-center text-[002ec3] text-sm font-bold`}
                        style={{
                            width: `${section.value}%`,
                            backgroundColor: section.color,
                        }}
                    >
                        {/* Optionally display currency symbol inside the bar */}
                    </div>
                ))}
            </div>

            {/* Legend Section */}
            <div className="mt-4 grid grid-flow-col grid-rows-2 gap-4">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className="flex items-center text-gray-700"
                    >
                        <span
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: section.color }}
                        />
                        <span className="ml-2 text-sm font-semibold">{section.label}</span>
                        <span className="ml-2 text-sm">({section.value.toFixed(2)}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiversifiedProgressBar;
