import { apiFetch, userFetch } from ".";
import { NotificationType } from "../types/notifications";
import { Notification } from "../types/notifications";

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface SendNotificationRequest {
  header: string;
  message: string;
  type: NotificationType;
  target_id?: number; 
  org_token?: string; 
}

export const getNotifications = async () => {
  return await userFetch<NotificationsResponse>("/notifications", {
    method: "GET",
  });
};

export const sendNotification = async (body: SendNotificationRequest) => {
  return await apiFetch<Notification>("/notifications", {
    method: "POST",
    body,
  });
};