import { Temporal } from "@js-temporal/polyfill";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ScheduleContextType,
  IDailySchedule,
  IContextProviderChildren,
  ISchedule,
  IWeekDays,
} from "../interfaces/interfaces";

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const useSchedule = () => {
  return useContext(ScheduleContext) as ScheduleContextType;
};

const mon = new Date().getMonth() + 1;
const startMonth: string = `${
    mon < 10 ? "0" + mon : mon
  }-${new Date().getFullYear()}`;
const baseSchedules: ISchedule = {};
baseSchedules[startMonth] = [];

const generateId = () => {
  const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$'
  let uniqueId = '';

  for (let i = 0; i < 15; i++) {
    const randomNumber: number = Math.floor(Math.random() * options.length);
    uniqueId += options[randomNumber]
  }

  return uniqueId;
}

const baseDailyWorkSchedule: IDailySchedule = {
  id: '',
  date: '',
  day: '',
  entry1: '',
  entry2: '',
  entry3: '',
  entry4: '',
  total: '',
  balance: '',
}

const storedSchedules:string = window.localStorage.getItem('work-schedules') || '{}';

const daysOfWeek: IWeekDays = {
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
  7: "Domingo",
}

export const ScheduleProvider: FC<IContextProviderChildren> = ({
  children,
}) => {
  const [schedules, setSchedules] = useState<ISchedule>(JSON.parse(storedSchedules) || baseSchedules);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(startMonth);

  useEffect(() => {
    const schedulesCopy = Object.assign({}, schedules);
    if (!Object.keys(schedules).includes(selectedPeriod)) {
      schedulesCopy[selectedPeriod] = [];
      const [month, year] = selectedPeriod.split('-')
      const formattedMonth: string = Temporal.PlainDate.from({
        year: parseInt(year),
        month: parseInt(month),
        day: 50,
      }).toString();

      const lastDay = parseInt(formattedMonth.split('-')[2]);

      for (let i = 1; i <= lastDay; i++) {
        const weekDay: number = Temporal.PlainDate.from({
          year: parseInt(year),
          month: parseInt(month),
          day: i,
        }).dayOfWeek;
        const day = i < 10 ? '0' + i : i.toString();
        const baseScheduleDay: IDailySchedule = Object.assign({}, baseDailyWorkSchedule);
        baseScheduleDay.id = generateId();
        baseScheduleDay.date = day + '/' + selectedPeriod.replace('-', '/');
        baseScheduleDay.day =  daysOfWeek[weekDay];

        schedulesCopy[selectedPeriod].push(baseScheduleDay);
      }

      window.localStorage.setItem("work-schedules", JSON.stringify(schedulesCopy));
      setSchedules(schedulesCopy);
    }
  }, [selectedPeriod]);

  const addSchedule = (schedule: IDailySchedule[]) => {
    const schedulesCopy = Object.assign({}, schedules);
    schedulesCopy[selectedPeriod] = schedule;
    setSchedules(schedulesCopy);
  };

  const updateSchedule = (id: string, month: string) => {
    const scheduleToUpdate: IDailySchedule = schedules[month].filter(
      (schedule: IDailySchedule) => schedule.id === id
    )[0];

    console.log(scheduleToUpdate);
  };

  const memoizedValues = useMemo(
    () => ({
      schedules,
      selectedPeriod,
      addSchedule,
      updateSchedule,
      setSelectedPeriod,
    }),
    [schedules, selectedPeriod]
  );

  return (
    <ScheduleContext.Provider value={memoizedValues}>
      {children}
    </ScheduleContext.Provider>
  );
};
