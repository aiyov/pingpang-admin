import { 
  LoginRequest, 
  LoginResponse, 
  Player, 
  PlayerUpdateRequest, 
  PlayerAddRequest,
  PlayerQueryRequest,
  Competition,
  CompetitionListRequest,
  CompetitionListResponse,
  CompetitionUpdateRequest,
  CompetitionAddRequest,
  PlayerListResponse
} from '@/types';
import { fetcher } from './fetcher';
import { mockPlayers, mockCompetitions, mockUsers } from './mock-data';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 登录API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetcher('/user/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as LoginResponse;
};

// 获取运动员列表
export const getPlayers = async (params: PlayerQueryRequest): Promise<PlayerListResponse> => {
  const response = await fetcher('/system/player', {
    method: 'POST',
    body: JSON.stringify(params)
  }) as PlayerListResponse;
  const total = response.total;
  return {
    records: response.records,
    total,
    size: params.size,
    current: response.current
  };
};

// 更新运动员信息
export const updatePlayer = async (data: PlayerUpdateRequest): Promise<Player> => {
  const response = await fetcher('/system/player/update', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as Player;
};

// 查询运动员详情
export const getPlayerDetail = async (data: PlayerQueryRequest): Promise<Player | null> => {
  return await fetcher('/system/player', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// 删除运动员
export const deletePlayer = async (id: number): Promise<void> => {
  const response = await fetcher('/system/player/delete?id=' + id, {
    method: 'POST'
  });
  
  return response as void;
};

// 添加运动员
export const addPlayer = async (data: PlayerAddRequest): Promise<Player> => {
  const response = await fetcher('/system/player/add', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as Player;
};

// 获取比赛列表
export const getCompetitions = async (params: CompetitionListRequest): Promise<CompetitionListResponse> => {
  const response = await fetcher('/system/comp_info', {
    method: 'POST',
    body: JSON.stringify(params)
  }) as CompetitionListResponse;
  const total = response.total;
  
  return {
    records: response.records,
    total,
    size: params.size,
    current: response.current
  };
};

// 添加比赛
export const addCompetition = async (data: CompetitionAddRequest): Promise<Competition> => {
  const response = await fetcher('/system/add/comp_info', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as Competition;
};

// 更新比赛信息
export const updateCompetition = async (data: CompetitionUpdateRequest): Promise<Competition> => {
  const response = await fetcher('/system/update_comp_info', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as Competition;
  
};

// 删除比赛
export const deleteCompetition = async (id: number): Promise<void> => {
  const response = await fetcher('/system/comp_info/delete?id=' + id, {
    method: 'POST'
  });
  return response as void;
};
