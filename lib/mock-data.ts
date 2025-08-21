import { Player, Competition } from '@/types';

// Mock运动员数据
export const mockPlayers: Player[] = [
  {
    id: 1,
    gender: "男",
    chineseName: "张本智和",
    englishName: "Tomokazu Harimoto",
    association: "日本乒协",
    ranking: 4,
    score: 8500,
    playStyleCn: "横拍快攻结合弧圈",
    playStyleEn: "Penhold Fast Attack with Loop",
    age: 20,
    birthDate: "2003-06-27"
  },
  {
    id: 2,
    gender: "男",
    chineseName: "樊振东",
    englishName: "Fan Zhendong",
    association: "中国乒协",
    ranking: 1,
    score: 12000,
    playStyleCn: "横拍弧圈结合快攻",
    playStyleEn: "Shakehand Loop with Fast Attack",
    age: 26,
    birthDate: "1997-01-22"
  },
  {
    id: 3,
    gender: "女",
    chineseName: "孙颖莎",
    englishName: "Sun Yingsha",
    association: "中国乒协",
    ranking: 1,
    score: 11500,
    playStyleCn: "横拍快攻结合弧圈",
    playStyleEn: "Shakehand Fast Attack with Loop",
    age: 23,
    birthDate: "2000-11-04"
  },
  {
    id: 4,
    gender: "女",
    chineseName: "伊藤美诚",
    englishName: "Mima Ito",
    association: "日本乒协",
    ranking: 5,
    score: 7800,
    playStyleCn: "横拍快攻",
    playStyleEn: "Shakehand Fast Attack",
    age: 23,
    birthDate: "2000-10-21"
  },
  {
    id: 5,
    gender: "男",
    chineseName: "王楚钦",
    englishName: "Wang Chuqin",
    association: "中国乒协",
    ranking: 2,
    score: 11000,
    playStyleCn: "横拍弧圈结合快攻",
    playStyleEn: "Shakehand Loop with Fast Attack",
    age: 24,
    birthDate: "2000-05-11"
  }
];

// Mock比赛数据
export const mockCompetitions: Competition[] = [
  {
    id: 1,
    compNameEn: "World Table Tennis Championships",
    compNameCn: "世界乒乓球锦标赛",
    rivalChineseName: "张本智和",
    compEventsCn: "男单（单项）",
    matchResult: "胜",
    compResult: "4-2",
    compDatetimeStart: "2024-05-15 14:30:00",
    compDatetimeEnd: "2024-05-15 16:45:00"
  },
  {
    id: 2,
    compNameEn: "Olympic Games",
    compNameCn: "奥运会",
    rivalChineseName: "伊藤美诚",
    compEventsCn: "女单（单项）",
    matchResult: "胜",
    compResult: "4-1",
    compDatetimeStart: "2024-07-28 10:00:00",
    compDatetimeEnd: "2024-07-28 11:30:00"
  },
  {
    id: 3,
    compNameEn: "Asian Games",
    compNameCn: "亚运会",
    rivalChineseName: "樊振东",
    compEventsCn: "男单（团体）",
    matchResult: "负",
    compResult: "2-4",
    compDatetimeStart: "2024-09-20 19:00:00",
    compDatetimeEnd: "2024-09-20 20:45:00"
  },
  {
    id: 4,
    compNameEn: "ITTF World Tour",
    compNameCn: "国际乒联世界巡回赛",
    rivalChineseName: "王楚钦",
    compEventsCn: "男双（单项）",
    matchResult: "胜",
    compResult: "3-1",
    compDatetimeStart: "2024-03-10 15:30:00",
    compDatetimeEnd: "2024-03-10 17:00:00"
  },
  {
    id: 5,
    compNameEn: "China Open",
    compNameCn: "中国公开赛",
    rivalChineseName: "孙颖莎",
    compEventsCn: "混双（单项）",
    matchResult: "胜",
    compResult: "3-2",
    compDatetimeStart: "2024-06-05 20:00:00",
    compDatetimeEnd: "2024-06-05 21:30:00"
  }
];

// Mock用户数据
export const mockUsers = [
  {
    account: "admin",
    password: "123456",
    user: {
      id: 1,
      username: "管理员",
      role: "admin"
    }
  },
  {
    account: "user",
    password: "123456",
    user: {
      id: 2,
      username: "普通用户",
      role: "user"
    }
  }
];
