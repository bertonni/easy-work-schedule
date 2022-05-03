import { ReactNode } from "react";

export interface IDailySchedule {
  id: string;
  date: string;
  day: string;
  entry1: string;
  entry2: string;
  entry3: string;
  entry4: string;
  total: string;
  balance: string;
}

export interface IWeekDays {
  [key: string]: string;
}

export interface ISchedule {
  [key: string]: IDailySchedule[];
}

export interface IMonthAndYearSelect {
  month: number,
  year: number
}

export interface IContextProviderChildren {
  children: ReactNode;
}

export type ScheduleContextType = {
  schedules: ISchedule;
  addSchedule: (schedule: IDailySchedule[]) => void;
  updateSchedule: (id: string, month: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}