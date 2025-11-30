import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification, ScheduleItem, ExamSchedule, PostCategory, User, Task, Activity, TimelineEvent } from '../types';
import { INITIAL_NOTIFICATIONS, SCHEDULE, EXAMS, TASKS, ACTIVITIES, TIMELINE_EVENTS } from '../constants';

interface DataContextType {
  notifications: Notification[];
  schedule: ScheduleItem[];
  exams: ExamSchedule[];
  tasks: Task[];
  activities: Activity[];
  timelineEvents: TimelineEvent[];
  addNotification: (notification: Omit<Notification, 'id' | 'date'>) => void;
  deleteNotification: (id: number, user: User) => void;
  updateSchedule: (item: ScheduleItem) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  deleteActivity: (id: number, user: User) => void;
  updateActivity: (activity: Activity, user: User) => void;
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  deleteTimelineEvent: (id: number) => void;
  canPost: (user: User, category: PostCategory) => boolean;
  canDelete: (user: User, notification: Notification) => boolean;
  canManageSchedule: (user: User) => boolean;
  canManageActivities: (user: User) => boolean;
  canManageTimeline: (user: User) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(SCHEDULE);
  const [exams] = useState<ExamSchedule[]>(EXAMS);
  const [tasks] = useState<Task[]>(TASKS);
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(TIMELINE_EVENTS);

  // --- PERMISSION LOGIC ---

  // Check if user can POST to a specific category
  const canPost = (user: User, category: PostCategory): boolean => {
    if (user.role === 'admin') return true; 
    
    switch (category) {
      case 'general': return user.role === 'monitor';
      case 'academic': return false; // STRICT: Only GVCN (admin) updates academic notices
      case 'discipline': return user.role === 'vice_discipline';
      case 'movement': return user.role === 'secretary';
      case 'fee': return user.role === 'monitor';
      default: return false;
    }
  };

  const canDelete = (user: User, notification: Notification): boolean => {
    if (user.role === 'admin') return true; 
    return user.username === notification.authorUsername; 
  };

  // STRICT: Only GVCN can manage Schedule
  const canManageSchedule = (user: User): boolean => {
    return user.role === 'admin';
  };

  // STRICT: Only GVCN can manage Timeline
  const canManageTimeline = (user: User): boolean => {
      return user.role === 'admin';
  }

  // Activity management: Admin + Monitor + Secretary
  const canManageActivities = (user: User): boolean => {
    return ['admin', 'monitor', 'secretary'].includes(user.role);
  };

  // --- CRUD OPERATIONS ---

  const addNotification = (data: Omit<Notification, 'id' | 'date'>) => {
    const newNote: Notification = {
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      ...data,
      fullContent: data.content 
    };
    setNotifications(prev => [newNote, ...prev]);
  };

  const deleteNotification = (id: number, user: User) => {
    const note = notifications.find(n => n.id === id);
    if (note && canDelete(user, note)) {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const updateSchedule = (updatedItem: ScheduleItem) => {
    setSchedule(prev => {
        const existingIndex = prev.findIndex(item => item.id === updatedItem.id);
        if (existingIndex >= 0) {
            const newSchedule = [...prev];
            newSchedule[existingIndex] = updatedItem;
            return newSchedule;
        } else {
            return [...prev, updatedItem];
        }
    });
  };

  const addActivity = (data: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      id: Date.now(),
      ...data
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const deleteActivity = (id: number, user: User) => {
    if (canManageActivities(user)) {
       setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  const updateActivity = (updatedActivity: Activity, user: User) => {
    if (canManageActivities(user)) {
        setActivities(prev => prev.map(a => a.id === updatedActivity.id ? updatedActivity : a));
    }
  };

  const addTimelineEvent = (data: Omit<TimelineEvent, 'id'>) => {
      const newEvent: TimelineEvent = {
          id: Date.now(),
          ...data
      };
      setTimelineEvents(prev => [newEvent, ...prev].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  }

  const deleteTimelineEvent = (id: number) => {
      setTimelineEvents(prev => prev.filter(e => e.id !== id));
  }

  return (
    <DataContext.Provider value={{ 
        notifications, schedule, exams, tasks, activities, timelineEvents,
        addNotification, deleteNotification,
        updateSchedule,
        addActivity, deleteActivity, updateActivity,
        addTimelineEvent, deleteTimelineEvent,
        canPost, canDelete, canManageSchedule, canManageActivities, canManageTimeline
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};