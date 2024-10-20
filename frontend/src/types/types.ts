export interface AbstractListElement {
  id: number;
}

export interface HistoryElement extends AbstractListElement {
  transactionType: string;
  transactionDate: string;
  amount: number
}

export interface ForexElement extends HistoryElement {
  originalAmount: number;
  targetCurrency: string;
  currency: string;
  exchangedAmount: number;
}

export interface LoanElement extends HistoryElement {
  description: string;
  loanAmount: number;
  currency: string;
}

export interface StockElement extends HistoryElement {
  currency: string;
  stockName: string;
}

export interface MoneyTransferElement extends HistoryElement {
  currency: string;
  description: string;
}

export interface StockDataPoint {
  date: string;
  price: number;
  fullIndex: number;
}


export interface StockItem extends AbstractListElement {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercentage: string;
  color: string;
}


export type HistoryDataElement = ForexElement | StockElement | LoanElement | MoneyTransferElement;