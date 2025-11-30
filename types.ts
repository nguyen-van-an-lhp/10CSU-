
export type Role = 'admin' | 'monitor' | 'vice_discipline' | 'vice_academic' | 'secretary' | 'guest';

export type PostCategory = 'general' | 'academic' | 'discipline' | 'movement' | 'fee';

export interface User {
  username: string;
  displayName: string;
  role: Role;
}

export interface Student {
  id: number;
  name: string;
  gender: 'Nam' | 'Nữ';
  dob: string;
  pob: string;
  role?: string;
  avatar?: string;
}

export interface Notification {
  id: number;
  date: string;
  title: string;
  content: string; // Summary for card
  fullContent?: string; // Detailed content for modal (HTML supported)
  authorName: string;
  authorUsername: string; // NEW: For ownership check
  authorRole: Role;
  category: PostCategory;
  isPinned?: boolean;
}

export interface Task {
  id: number;
  title: string;
  deadline: string;
  type: 'academic' | 'movement' | 'other';
  isCompleted: boolean;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
}

export interface SubjectCombo {
  code: string;
  subjects: string;
}

export interface ScheduleItem {
  id: string; // Unique ID for updating
  day: 'Thứ 2' | 'Thứ 3' | 'Thứ 4' | 'Thứ 5' | 'Thứ 6' | 'Thứ 7';
  session: 'Sáng' | 'Chiều';
  period: number; // 1-5
  time: string;
  subject: string;
}

export interface ExamSchedule {
  id: number;
  subject: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: 'Giữa Kỳ' | 'Cuối Kỳ' | '15 Phút';
}

export interface TeacherProfile {
  name: string;
  degrees: string[];
  phone: string;
  email: string;
  address: string;
  image: string;
}

export interface Activity {
  id: number;
  title: string;
  date: string;
  summary: string;
  fullContent: string; // HTML supported
  image: string;
  gallery?: string[]; // New: Array of image URLs for the gallery
  authorName: string;
  authorUsername: string;
}
