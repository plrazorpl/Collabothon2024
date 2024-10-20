import { NotificationMethod } from "./notificationMethod.type";

export type Subscription = {
    currency: string; // Currency code (e.g., "USD", "EUR")
    isActive: boolean;
    percentageFall: string;
    exchangeRateFall: string;
    notificationMethod: NotificationMethod[];
  };