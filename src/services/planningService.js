import { getPlanning, savePlanning } from "./storage";

export function getTodayPlanning() {
  const planning = getPlanning();
  const today = new Date().toISOString().split("T")[0];

  return planning.filter((item) => item.date === today);
}

export function addAutoPlanning(projects) {
  const planning = getPlanning();
  const today = new Date().toISOString().split("T")[0];

  const todayPlanning = planning.filter((item) => item.date === today);

  if (todayPlanning.length > 0) {
    return planning;
  }

  const autoPlanning = projects.slice(0, 3).map((project, index) => ({
    id: `PLAN-${Date.now()}-${index}`,
    projectId: project.id,
    date: today,
    time: `${8 + index * 2}:00`,
  }));

  const updatedPlanning = [...planning, ...autoPlanning];

  savePlanning(updatedPlanning);

  return updatedPlanning;
}

export function clearPlanning() {
  savePlanning([]);
  return [];
}
