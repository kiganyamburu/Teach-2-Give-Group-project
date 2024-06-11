export interface Project {
    id: number;
    name: string;
    description?: string;
    status: string;
    assignedTo?: number;
    createdAt: Date;
    updatedAt: Date;
  }  