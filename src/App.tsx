import { useState } from 'react';
import { useSchedule } from './contexts/ScheduleContext';
import DailySchedule from './components/DailySchedule';

function App() {

  const { schedules } = useSchedule();

  return (
    <div className='h-screen w-screen flex flex-col items-center px-20 py-6'>
      <h1 className='text-xl text-gray-600'>Hello</h1>
        <DailySchedule month={4} year={2022} />
    </div>
  )
}

export default App
