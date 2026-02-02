import { apiFetch, userFetch } from ".";
import { FeedbackMessage } from "../types/feedback";

export interface SendFeedbackRequest {
  header: string;
  content: string;
  user_id?: number; 
}

// Define request body for answering feedback
export interface AnswerFeedbackRequest {
  answer: string;
}

export const listFeedback = async () => {
  const response = await userFetch<{ feedback: FeedbackMessage[] }>("/feedback", {
    method: "GET",
  }); 
  return response.feedback;
};

export const listFeedbackAdmin = async () => {
  const response = await apiFetch<{ feedback: FeedbackMessage[] }>("/admin-feedback", {
    method: "GET",
  });
  return response.feedback;
};

export const sendFeedback = async (body: SendFeedbackRequest) => {
  return await apiFetch<{ message: string }>("/feedback-send", {
    method: "POST",
    body,
  });
};

export const answerFeedback = async (id: number, body: AnswerFeedbackRequest) => {
  return await apiFetch<{ message: string }>(`/feedback-answer/${id}`, {
    method: "POST",
    body,
  });
};
