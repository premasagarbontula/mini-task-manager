import API from "./api";

export const getTasks = () => API.get("/");

export const createTask = (data: { title: string; description?: string }) =>
  API.post("/", data);

export const updateTask = (
  id: string,
  data: Partial<{
    title: string;
    description: string;
    completed?: boolean;
  }>,
) => API.patch(`/${id}`, data);

export const deleteTask = (id: string) => API.delete(`/${id}`);
