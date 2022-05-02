import { Temporal } from "@js-temporal/polyfill";
import { ChangeEvent, useEffect, useState } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import { IDailySchedule, IMonthAndYearSelect } from "../interfaces/interfaces";

export default function DailySchedule({ month, year }: IMonthAndYearSelect) {
  const { schedules, selectedPeriod, setSelectedPeriod } = useSchedule();

  useEffect(() => {
    console.log(selectedPeriod)
  }, [selectedPeriod]);

  const [period, setPeriod] = useState<string>(selectedPeriod.replace('-', '/'));
  
  const handlePeriodSelect = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;
    if (value.length === 7) return;
    setPeriod(value);
  };

  const applyMask = () => {
    const maskedValue = period.slice(0,2) + "/" + period.slice(2);
    setSelectedPeriod(period.slice(0,2) + "-" + period.slice(2))
    setPeriod(maskedValue);
  };

  const removeMask = () => {
    const value = period.replace("/", "");
    setPeriod(value);
  };

  const formattedMonth: string = Temporal.PlainDate.from({
    year,
    month,
    day: 50,
  }).toString();

  const [selectedMonthData, setSelectedMonthData] =
    useState<IDailySchedule[]>();

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        value={period}
        className="border h-10 rounded px-2 w-24"
        type="text"
        name="period-select"
        maxLength={7}
        onChange={(e) => handlePeriodSelect(e)}
        onFocus={removeMask}
        onBlur={applyMask}
      />
      <h1>Horários ({period}) </h1>

      {schedules[period.replace('/', '-')]?.length === 0 ?
        <p>Não há dados para exibir</p>
        :
        schedules[period.replace('/', '-')]?.map((schedule: IDailySchedule, index: number) => (
          <div key={index}>
            {schedule.date}
          </div>
        ))
      }
    </div>
  );
}
