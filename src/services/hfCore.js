import {
  getBusinessData,
  getBusinessHealth,
  getDailyAdvice,
  getMainDecision,
  getRevenueForecast,
} from "./aiCore";

import { getAiCeoMessage, getAiCeoSummary } from "./aiPersona";
import { addAutoPlanning } from "./planningService";
import { createInvoicesFromProjects } from "./invoiceService";
import { addNotification } from "./notificationService";
import { getProjects } from "./storage";

export function getHFDashboard() {
  const data = getBusinessData();
  const forecast = getRevenueForecast();
  const ceoMessage = getAiCeoMessage();
  const ceoSummary = getAiCeoSummary();

  return {
    data,
    forecast,
    ceoMessage,
    ceoSummary,
    businessHealth: getBusinessHealth(),
    mainDecision: getMainDecision(),
    dailyAdvice: getDailyAdvice(),
  };
}

export function runMorningRoutine() {
  const projects = getProjects();

  const planning = addAutoPlanning(projects);
  const invoices = createInvoicesFromProjects(projects);

  addNotification(
    "HF Core",
    "Ochtendroutine uitgevoerd: planning gecontroleerd en facturen verwerkt."
  );

  return {
    planning,
    invoices,
    message: "HF Core ochtendroutine succesvol uitgevoerd.",
  };
}

export function getCEOAdvice() {
  return {
    message: getAiCeoMessage(),
    summary: getAiCeoSummary(),
    health: getBusinessHealth(),
    decision: getMainDecision(),
    advice: getDailyAdvice(),
  };
}
