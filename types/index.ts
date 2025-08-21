// 登录相关类型
export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

// 运动员相关类型
export interface Player {
  id: number;
  gender: string;
  chineseName: string;
  englishName: string;
  association: string;
  ranking: number;
  score: number;
  playStyleCn: string;
  playStyleEn: string;
  age: number;
  birthDate: string;
}

export interface PlayerUpdateRequest extends Player {}

export interface PlayerQueryRequest {
  name: string;
}

// 比赛相关类型
export interface Competition {
  id: number;
  compNameEn: string;
  compNameCn: string;
  rivalChineseName: string;
  compEventsCn: string;
  matchResult: string;
  compResult: string;
  compDatetime: string;
}

export interface CompetitionListRequest {
  compNameEn?: string;
  compNameCn?: string;
  rivalChineseName?: string;
  compEventsCn?: string;
  matchResult?: string;
  compResult?: string;
  compDatetimeStart?: string;
  compDatetimeEnd?: string;
  size: number;
  current: number;
}

export interface CompetitionListResponse {
  records: Competition[];
  total: number;
  size: number;
  current: number;
}

// 更新比赛信息接口类型
export interface CompetitionUpdateRequest {
  id: number;
  playerId?: number;
  representTeam?: string;
  compSeriesCn?: string;
  compSpecificationCn?: string;
  compType?: string;
  compNameEn?: string;
  compNameCn?: string;
  compLocationCn?: string;
  compYear?: string;
  compDate?: string;
  compDatetime?: string;
  opponentPlayerId?: string;
  rivalAssociation?: string;
  rivalChineseName?: string;
  rivalEnglishName?: string;
  playStyleEn?: string;
  playStyleCn?: string;
  partnerChineseName?: string;
  partnerEnglishName?: string;
  compEventsCn?: string;
  compRoundsCn?: string;
  compScore?: string;
  compPoints?: string;
  matchResult?: string;
  compResult?: string;
  teamPlace?: string;
  teamMember?: string;
  offsiteGuidance?: string;
}
