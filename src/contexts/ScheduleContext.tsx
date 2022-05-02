import { createContext, FC, useContext, useMemo, useState } from "react";
import { ScheduleContextType, IDailySchedule, IContextProviderChildren, ISchedule } from "../interfaces/interfaces";

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const useSchedule = () => {
  return useContext(ScheduleContext) as ScheduleContextType;
};

const mon = new Date().getMonth() + 1;
const startMonth: string = `${mon < 10 ? '0' + mon : mon}-${new Date().getFullYear()}`;
const baseSchedules: ISchedule = {};
baseSchedules[startMonth] = [];

export const ScheduleProvider: FC<IContextProviderChildren> = ({ children }) => {
  
  const [schedules, setSchedules] = useState<ISchedule>(baseSchedules);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(startMonth);

  const addSchedule = (schedule: IDailySchedule[]) => {
    const schedulesCopy = Object.assign({}, schedules);
    schedulesCopy[selectedPeriod] = schedule;
    setSchedules(schedulesCopy);
  }

  const updateSchedule = (id: string, month: string) => {
    const scheduleToUpdate: IDailySchedule = schedules[month].filter((schedule: IDailySchedule) => schedule.id === id)[0];

    console.log(scheduleToUpdate);
  }

  const memoizedValues = useMemo(() => ({
    schedules,
    selectedPeriod,
    addSchedule,
    updateSchedule,
    setSelectedPeriod
  }), [schedules, selectedPeriod]);

  return (
    <ScheduleContext.Provider value={memoizedValues}>
      {children}
    </ScheduleContext.Provider>
  );
}