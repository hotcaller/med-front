import { userFetch } from ".";

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
}
export interface Subscription {
  id: number;
  telegram_id: string;
  token: number;
  patient_id: string;
}

export const getSubscriptions = async () => {
  return await userFetch<SubscriptionsResponse>("/subscriptions?token=123", {
    method: "GET",
  });
};