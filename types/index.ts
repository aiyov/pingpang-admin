// 登录相关类型
export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
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
  compPoints: string;
  compScore: string;
  compType: string;
  compRoundsCn: string;
  compLocationCn: string;
  compSeriesCn: string;
  compSpecificationCn: string;
  offsiteGuidance: string;
  partnerChineseName: string;
  partnerEnglishName: string;
  playStyleCn: string;
  playStyleEn: string;
  rivalAssociation: string;
  rivalEnglishName: string;
}

export interface CompetitionListResponse {
  records: Competition[];
  total: number;
  size: number;
  current: number;
}


export interface CompetitionListRequest {
  compNameEn?: string;
  compNameCn?: string;
  rivalChineseName?: string;
  compEventsCn?: string;
  matchResult?: string;
  compResult?: string;
  compDatetime?: string;
  size: number;
  current: number;
}

export interface CompetitionListResponse {
  records: Competition[];
  total: number;
  size: number;
  current: number;
}
