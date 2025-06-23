import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Language, Theme, Child, Parent, Notification } from '../types';

interface AppState {
  user: User | null;
  language: Language;
  theme: Theme;
  notifications: Notification[];
  children: Child[];
  isAuthenticated: boolean;
  currentParent: Parent | null;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'SET_CHILDREN'; payload: Child[] }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_CURRENT_PARENT'; payload: Parent | null }
  | { type: 'ADD_CHILD'; payload: Child }
  | { type: 'UPDATE_CHILD'; payload: Child }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string };

const initialState: AppState = {
  user: null,
  language: 'en',
  theme: 'light',
  notifications: [],
  children: [],
  isAuthenticated: false,
  currentParent: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_CHILDREN':
      return { ...state, children: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_CURRENT_PARENT':
      return { ...state, currentParent: action.payload };
    case 'ADD_CHILD':
      return { ...state, children: [...state.children, action.payload] };
    case 'UPDATE_CHILD':
      return {
        ...state,
        children: state.children.map(child =>
          child.id === action.payload.id ? action.payload : child
        ),
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}