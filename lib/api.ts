import { 
  LoginRequest, 
  LoginResponse, 
  Player, 
  PlayerUpdateRequest, 
  PlayerQueryRequest,
  Competition,
  CompetitionListRequest,
  CompetitionListResponse,
  CompetitionUpdateRequest,
  PlayerListResponse
} from '@/types';
import { fetcher } from './fetcher';
import { mockPlayers, mockCompetitions, mockUsers } from './mock-data';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 登录API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetcher('/system/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as LoginResponse;
};

// 获取运动员列表
export const getPlayers = async (params: PlayerQueryRequest): Promise<PlayerListResponse> => {
  const response: PlayerListResponse = await fetcher('/system/player', {
    method: 'POST',
    body: JSON.stringify(params)
  });
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
  await delay(300);
  
  const index = mockPlayers.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('运动员不存在');
  }
  
  mockPlayers.splice(index, 1);
};

// 添加运动员
export const addPlayer = async (data: Omit<Player, 'id'>): Promise<Player> => {
  await delay(500);
  
  const newPlayer: Player = {
    ...data,
    id: Math.max(...mockPlayers.map(p => p.id)) + 1
  };
  
  mockPlayers.push(newPlayer);
  return newPlayer;
};

// 获取比赛列表
export const getCompetitions = async (params: CompetitionListRequest): Promise<CompetitionListResponse> => {
  const response: CompetitionListResponse = await fetcher('/system/comp_info', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  const total = response.total;
  
  return {
    records: response.records,
    total,
    size: params.size,
    current: response.current
  };
};

// 添加比赛
export const addCompetition = async (data: Omit<Competition, 'id'>): Promise<Competition> => {
  await delay(500);
  
  const newCompetition: Competition = {
    ...data,
    id: Math.max(...mockCompetitions.map(c => c.id)) + 1
  };
  
  mockCompetitions.push(newCompetition);
  return newCompetition;
};

// 更新比赛
export const updateCompetition = async (data: CompetitionUpdateRequest): Promise<Competition> => {
  const response = await fetcher('/system/update_comp_info', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response as Competition;
  
};

// 删除比赛
export const deleteCompetition = async (id: number): Promise<void> => {
  await delay(300);
  
  const index = mockCompetitions.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error('比赛不存在');
  }
  
  mockCompetitions.splice(index, 1);
};
