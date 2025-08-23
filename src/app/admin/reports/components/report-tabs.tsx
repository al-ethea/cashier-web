'use client'

import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAdminReports from '@/features/admin/reports/useAdminReports';

export interface IReportTabsProps {
}

export default function ReportTabs(props: IReportTabsProps) {
  const {reportTabsHeader, activeTab, handleTabChange} = useAdminReports()
  return (
    <div>
      <Tabs defaultValue={activeTab} className='w-full'>
        <TabsList className='w-full'>
          {reportTabsHeader.map((tab) => (
            <TabsTrigger 
              key={tab.key} 
              value={tab.key} 
              onClick={() => handleTabChange(tab.key)}
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:font-bold"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {reportTabsHeader.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
