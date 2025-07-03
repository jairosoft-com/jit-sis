'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserRoleChartProps {
  data: { role: string; count: number }[];
}

export default function UserRoleChart({ data }: UserRoleChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: 300 }}>
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="role" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
