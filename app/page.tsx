'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePlayers, useCompetitions } from '@/hooks/use-api';
import { Users, Trophy, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [user, setUser] = useState<any>({});
  const router = useRouter();
  
  const { data: players = [] } = usePlayers();
  const { data: competitionsData } = useCompetitions({ size: 10, current: 1 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
  }, [router]);

  const stats = [
    {
      title: '运动员总数',
      value: players.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: '比赛总数',
      value: competitionsData?.total || 0,
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '胜率',
      value: competitionsData?.records ? 
        `${Math.round((competitionsData.records.filter(c => c.matchResult === '胜').length / competitionsData.records.length) * 100)}%` : 
        '0%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: '本月比赛',
      value: competitionsData?.records?.filter(c => {
        const compDate = new Date(c.compDatetimeStart);
        const now = new Date();
        return compDate.getMonth() === now.getMonth() && compDate.getFullYear() === now.getFullYear();
      }).length || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  if (!user) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          欢迎回来！
        </h1>
        <p className="text-gray-600">
          这里是乒乓球管理系统的控制台，您可以管理运动员和比赛信息。
        </p>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              运动员管理
            </CardTitle>
            <CardDescription>
              管理运动员信息，包括基本信息、排名、积分等
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                当前共有 <span className="font-semibold">{players.length}</span> 名运动员
              </p>
              <Link href="/players">
                <Button className="w-full">
                  进入运动员管理
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              比赛管理
            </CardTitle>
            <CardDescription>
              管理比赛信息，包括比赛结果、时间安排等
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                当前共有 <span className="font-semibold">{competitionsData?.total || 0}</span> 场比赛
              </p>
              <Link href="/competitions">
                <Button className="w-full">
                  进入比赛管理
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
