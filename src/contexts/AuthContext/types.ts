import { User } from 'firebase/auth';
import { UserProfile } from '../../types';

export interface AuthContextType {
  user: User | null;
  userData: UserProfile | null;
  userRole: 'student' | 'teacher' | 'admin' | null;
  loading: boolean;
  isUserDataLoaded: boolean;
  login: (provider?: 'google' | 'facebook' | 'line') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  joinClassroom: (classCode: string) => Promise<void>;
  selectClassroom: (classId: string | null) => Promise<void>;
  selectRole: (role: 'student' | 'teacher' | 'admin') => Promise<void>;
  switchRole: () => Promise<void>;
  checkAccess: (type: 'ai' | 'project') => boolean;
  authError: string | null;
  clearError: () => void;
}
