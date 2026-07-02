import { getProjects, saveProjects } from "./storage";

export function getAllProjects() {
  return getProjects();
}

export function addProject(projectData) {
  const projects = getProjects();

  const newProject = {
    id: `PROJ-${Date.now()}`,
    status: "Nieuw",
    progress: 0,
    tasks: [],
    createdAt: new Date().toLocaleDateString("nl-NL"),
    ...projectData,
  };

  const updated = [...projects, newProject];

  saveProjects(updated);

  return updated;
}

export function updateProject(projectId, updates) {
  const projects = getProjects();

  const updated = projects.map((project) =>
    project.id === projectId
      ? { ...project, ...updates }
      : project
  );

  saveProjects(updated);

  return updated;
}

export function deleteProject(projectId) {
  const projects = getProjects();

  const updated = projects.filter(
    (project) => project.id !== projectId
  );

  saveProjects(updated);

  return updated;
}

export function addTask(projectId, taskText) {
  const projects = getProjects();

  const newTask = {
    id: `TASK-${Date.now()}`,
    text: taskText,
    completed: false,
    createdAt: new Date().toLocaleDateString("nl-NL"),
  };

  const updated = projects.map((project) => {
    if (project.id !== projectId) return project;

    return {
      ...project,
      tasks: [...(project.tasks || []), newTask],
    };
  });

  saveProjects(updated);

  return updated;
}

export function toggleTask(projectId, taskId) {
  const projects = getProjects();

  const updated = projects.map((project) => {
    if (project.id !== projectId) return project;

    return {
      ...project,
      tasks: project.tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      ),
    };
  });

  saveProjects(updated);

  return updated;
}

export function calculateProgress(project) {
  if (!project.tasks || project.tasks.length === 0) {
    return 0;
  }

  const completed = project.tasks.filter(
    (task) => task.completed
  ).length;

  return Math.round((completed / project.tasks.length) * 100);
}
