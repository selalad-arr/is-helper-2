export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: any;
  createdAt: any;
  assignedTo: string[]; // List of student UIDs, or ['all']
  classId: string;
  teacherId: string;
  status: 'active' | 'archived';
  points?: number;
}

export interface TaskResponse {
  taskId: string;
  studentId: string;
  status: 'pending' | 'submitted' | 'graded';
  submissionText?: string;
  grade?: number;
  feedback?: string;
  updatedAt: any;
}

export interface ProjectCollaborator {
  name: string;
  role: string;
  assignedSections: string[]; // e.g., ["Chapter 1", "Abstract"]
  status: 'pending' | 'active' | 'completed';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'student' | 'teacher' | 'admin' | null;
  onboardingComplete: boolean;
  isPremium?: boolean;
  subscriptionExpires?: any; 
  aiUsageCount?: number;
  projectCount?: number;
  classId?: string;
  classroomIds?: string[];
  createdAt: any;
}
