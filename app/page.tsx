'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }
    
    // 直接重定向到运动员管理页面
    router.push('/players');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500">正在跳转...</div>
    </div>
  );
}
