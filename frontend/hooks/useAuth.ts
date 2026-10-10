'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { AdminUser } from '@/types';

export function useAuth(requireAuth: boolean = false) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const storedToken = localStorage.getItem('zovo_admin_token');

    if (!storedToken) {
      setToken(null);
      setUser(null);
      setLoading(false);
      if (requireAuth) {
        router.push('/admin/login');
      }
      return;
    }

    setToken(storedToken);

    try {
      const userData = await api.getAdminMe();
      setUser(userData);
    } catch {
      // Invalid/expired token
      localStorage.removeItem('zovo_admin_token');
      setToken(null);
      setUser(null);
      if (requireAuth) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [requireAuth, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = () => {
    localStorage.removeItem('zovo_admin_token');
    setToken(null);
    setUser(null);
    router.push('/admin/login');
  };

  return { token, user, loading, logout, refetch: checkAuth };
}
