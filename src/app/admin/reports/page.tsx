import * as React from 'react';
import ReportTabs from './components/report-tabs';

export default function AdminReportsPage () {
  return (

       <div className='h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md'>
         <div className='flex items-center justify-between gap-2'>
           <div className='flex flex-col gap-1'>
             <h2 className='text-2xl font-semibold tracking-tight'>Reports</h2>
             <p className='text-muted-foreground'>All Transaction Reports</p>
           </div>
      </div>
         <ReportTabs/>
       </div>
  );
}
