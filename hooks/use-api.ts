import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/lib/api';
import { 
  LoginRequest, 
  Player,
  PlayerUpdateRequest, 
  PlayerAddRequest,
  PlayerQueryRequest,
  CompetitionListRequest,
  Competition,
  CompetitionUpdateRequest,
  CompetitionAddRequest
} from '@/types';

// 登录
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => api.login(data),
  });
};

// 获取运动员列表
export const usePlayers = (params: any) => {
  return useQuery({
    queryKey: ['players', params],
    queryFn: () => api.getPlayers(params),
  });
};

// 更新运动员
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: PlayerUpdateRequest) => api.updatePlayer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};

// 查询运动员详情
export const usePlayerDetail = (data: PlayerQueryRequest) => {
  return useQuery({
    queryKey: ['player-detail', data],
    queryFn: () => api.getPlayerDetail(data),
    enabled: !!data.name,
  });
};

// 删除运动员
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => api.deletePlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};

// 添加运动员
export const useAddPlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: PlayerAddRequest) => api.addPlayer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};

// 获取比赛列表
export const useCompetitions = (params: CompetitionListRequest) => {
  return useQuery({
    queryKey: ['competitions', params],
    queryFn: () => api.getCompetitions(params),
  });
};

// 添加比赛
export const useAddCompetition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CompetitionAddRequest) => api.addCompetition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
    },
  });
};

// 更新比赛信息（新接口）
export const useUpdateCompetitionInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CompetitionUpdateRequest) => api.updateCompetition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
    },
  });
};

// 更新比赛（兼容旧接口）
export const useUpdateCompetition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Competition) => api.updateCompetition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
    },
  });
};

// 删除比赛
export const useDeleteCompetition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => api.deleteCompetition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
    },
  });
};
