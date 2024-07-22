export interface Task {
    id: number | null;
    entityname: string;
    date: string;  // ISO string format (e.g., 'YYYY-MM-DD')
    time: string;  // ISO string format (e.g., 'HH:mm:ss')
    taskType: string;
    contactNumber?: string; // Optional since it's not always required
    contactperson: string;
    notes?: string;
    status?: boolean; // Add status as optional boolean field
  }
  