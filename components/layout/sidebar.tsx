'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User, Users, Trophy, Home } from 'lucide-react';

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { href: '/players', label: '运动员管理', icon: Users },
    { href: '/competitions', label: '比赛管理', icon: Trophy },
  ];

  // 如果当前在登录页面，不显示侧边栏
  if (pathname === '/login') {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">乒乓球管理系统</h1>
        </div>

        {/* 用户信息 */}
        {user && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* 导航菜单 */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 退出登录 */}
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </Button>
        </div>
      </div>
    </div>
  );
}
