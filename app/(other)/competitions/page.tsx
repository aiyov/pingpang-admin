'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCompetitions, useUpdateCompetitionInfo, useDeleteCompetition, useAddCompetition, usePlayers } from '@/hooks/use-api';
import { Competition, CompetitionListRequest, CompetitionUpdateRequest, CompetitionAddRequest, Player } from '@/types';
import { Edit, Eye, Search, Plus, Trash2 } from 'lucide-react';
import { MultiSelect, MultiSelectOption } from '@/components/ui/multi-select';

export default function CompetitionsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view'>('edit');
  const [selectedOpponents, setSelectedOpponents] = useState<MultiSelectOption[]>([]);
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [requestParams, setRequestParams] = useState<CompetitionListRequest>({
    current: currentPage,
    size: 10,
    compNameCn: '',
    rivalChineseName: '',
    compEventsCn: '',
    matchResult: ''
  });

  useEffect(() => {
    setRequestParams({
      ...requestParams,
      current: currentPage,
    });
  }, [currentPage]);

  const [filters, setFilters] = useState({
    compNameCn: '',
    rivalChineseName: '',
    compEventsCn: '',
    matchResult: ''
  });

  const [formData, setFormData] = useState<CompetitionUpdateRequest>({
    id: 0,
    compNameEn: '',
    compNameCn: '',
    rivalChineseName: '',
    compEventsCn: '',
    matchResult: '',
    compResult: '',
    compDatetime: '',
    compPoints: '',
    compScore: '',
    compType: '',
    compRoundsCn: '',
    compLocationCn: '',
    compSeriesCn: '',
    compSpecificationCn: '',
    offsiteGuidance: '',
    partnerChineseName: '',
    partnerEnglishName: '',
    playStyleCn: '',
    playStyleEn: '',
    rivalAssociation: '',
    rivalEnglishName: ''
  });



  const { data: competitionsData, isLoading } = useCompetitions(requestParams);
  const updateCompetitionMutation = useUpdateCompetitionInfo();
  const addCompetitionMutation = useAddCompetition();
  const deleteCompetitionMutation = useDeleteCompetition();
  
  // 获取运动员列表用于对手选择
  const { data: playersData, isLoading: playersLoading } = usePlayers({
    current: 1,
    size: 50,
    name: playerSearchQuery
  });

  const handleEdit = (competition: Competition) => {
    setDialogType('edit');
    setEditingCompetition(competition);
    setFormData(competition);
    
    // 解析对手信息
    if (competition.rivalChineseName) {
      const opponentNames = competition.rivalChineseName.split('/');
      const opponentIds = competition.opponentPlayerId ? competition.opponentPlayerId.split('/') : [];
      
      const opponents: MultiSelectOption[] = opponentNames.map((name, index) => {
        const playerId = opponentIds[index] ? parseInt(opponentIds[index]) : null;
        
        // 优先使用 opponentPlayerId 匹配，如果没有则通过姓名匹配
        const matchedPlayer = playerId 
          ? playersData?.records.find(player => player.id === playerId)
          : playersData?.records.find(player => player.chineseName === name.trim());
        
        return {
          id: matchedPlayer?.id || (index + 1000), // 如果匹配不到，使用临时ID
          value: name.trim(),
          label: matchedPlayer ? `${matchedPlayer.chineseName} (${matchedPlayer.englishName})` : name.trim()
        };
      });
      setSelectedOpponents(opponents);
      
      // 同时设置表单数据中的对手信息字段
      if (competition.rivalEnglishName || competition.rivalAssociation || competition.playStyleCn || competition.playStyleEn || competition.partnerEnglishName) {
        setFormData(prev => ({
          ...prev,
          rivalEnglishName: competition.partnerEnglishName || competition.rivalEnglishName || '',
          rivalAssociation: competition.rivalAssociation || '',
          playStyleCn: competition.playStyleCn || '',
          playStyleEn: competition.playStyleEn || ''
        }));
      }
    } else {
      setSelectedOpponents([]);
    }
    
    setIsEditDialogOpen(true);
  };

  const handleView = (competition: Competition) => {
    setDialogType('view');
    setEditingCompetition(competition);
    setFormData(competition);
    
    // 解析对手信息
    if (competition.rivalChineseName) {
      const opponentNames = competition.rivalChineseName.split('/');
      const opponentIds = competition.opponentPlayerId ? competition.opponentPlayerId.split('/') : [];
      
      const opponents: MultiSelectOption[] = opponentNames.map((name, index) => {
        const playerId = opponentIds[index] ? parseInt(opponentIds[index]) : null;
        
        // 优先使用 opponentPlayerId 匹配，如果没有则通过姓名匹配
        const matchedPlayer = playerId 
          ? playersData?.records.find(player => player.id === playerId)
          : playersData?.records.find(player => player.chineseName === name.trim());
        
        return {
          id: matchedPlayer?.id || (index + 1000),
          value: name.trim(),
          label: matchedPlayer ? `${matchedPlayer.chineseName} (${matchedPlayer.englishName})` : name.trim()
        };
      });
      setSelectedOpponents(opponents);
      
      // 同时设置表单数据中的对手信息字段
      if (competition.rivalEnglishName || competition.rivalAssociation || competition.playStyleCn || competition.playStyleEn || competition.partnerEnglishName) {
        setFormData(prev => ({
          ...prev,
          rivalEnglishName: competition.partnerEnglishName || competition.rivalEnglishName || '',
          rivalAssociation: competition.rivalAssociation || '',
          playStyleCn: competition.playStyleCn || '',
          playStyleEn: competition.playStyleEn || ''
        }));
      }
    } else {
      setSelectedOpponents([]);
    }
    
    setIsEditDialogOpen(true); 
  };

  const handleAdd = () => {
    setDialogType('add');
    setEditingCompetition(null);
    setSelectedOpponents([]);
    setFormData({
      id: 0,
      playerId: "28",
      representTeam: '',
      compSeriesCn: '',
      compSpecificationCn: '',
      compType: '',
      compNameEn: '',
      compNameCn: '',
      compLocationCn: '',
      compYear: '',
      compDate: '',
      compDatetime: '',
      opponentPlayerId: '',
      rivalAssociation: '',
      rivalChineseName: '',
      rivalEnglishName: '',
      playStyleEn: '',
      playStyleCn: '',
      partnerChineseName: '',
      partnerEnglishName: '',
      compEventsCn: '',
      compRoundsCn: '',
      compScore: '',
      compPoints: '',
      matchResult: '',
      compResult: '',
      teamPlace: '',
      teamMember: '',
      offsiteGuidance: ''
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (competition: Competition) => {
    if (confirm(`确定要删除比赛 ${competition.compNameCn} 吗？`)) {
      try {
        await deleteCompetitionMutation.mutateAsync(competition.id);
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  const handleOpponentChange = (selected: MultiSelectOption[]) => {
    const previousSelected = selectedOpponents;
    setSelectedOpponents(selected);
    // 只在新增模式下自动填充，编辑模式下保持用户已输入的信息
    if (dialogType === 'add') {
      // 新增模式：自动填充对手信息
      if (selected.length > 0) {
        const matchedPlayers = selected.map(opponent => 
          playersData?.records.find(player => player.id === opponent.id)
        ).filter(Boolean);
        
        if (matchedPlayers.length > 0) {
          setFormData(prev => ({
            ...prev,
            rivalChineseName: matchedPlayers.map(player => player!.chineseName).join('/'),
            rivalEnglishName: matchedPlayers.map(player => player!.englishName).join('/'),
            rivalAssociation: matchedPlayers.map(player => player!.association).join('/'),
            playStyleCn: matchedPlayers.map(player => player!.playStyleCn).join('/'),
            playStyleEn: matchedPlayers.map(player => player!.playStyleEn).join('/')
          }));
        }
      } else {
        // 清空对手信息
        setFormData(prev => ({
          ...prev,
          rivalChineseName: '',
          rivalEnglishName: '',
          rivalAssociation: '',
          playStyleCn: '',
          playStyleEn: ''
        }));
      }
    } else {
      // 编辑模式：智能填充对手信息
      if (selected.length > 0) {
        const matchedPlayers = selected.map(opponent => 
          playersData?.records.find(player => player.id === opponent.id)
        ).filter(Boolean);
        
        if (matchedPlayers.length > 0) {
          setFormData(prev => {
            // 确保所有选中的对手都被正确处理
            const allPlayerNames = matchedPlayers.map(player => player!.chineseName);
            const allEnglishNames = matchedPlayers.map(player => player!.englishName);
            const allAssociations = matchedPlayers.map(player => player!.association);
            const allPlayStylesCn = matchedPlayers.map(player => player!.playStyleCn);
            const allPlayStylesEn = matchedPlayers.map(player => player!.playStyleEn);
            
            return {
              ...prev,
              rivalChineseName: allPlayerNames.join('/'),
              // 每个字段独立判断：如果为空则自动填充，否则保持用户已输入的内容
              rivalEnglishName: allEnglishNames.join('/'),
              rivalAssociation: allAssociations.join('/'),
              playStyleCn: allPlayStylesCn.join('/'),
              playStyleEn: allPlayStylesEn.join('/')
            };
          });
        }
      } else {
        // 清空对手信息
        setFormData(prev => ({
          ...prev,
          rivalChineseName: '',
          rivalEnglishName: '',
          rivalAssociation: '',
          playStyleCn: '',
          playStyleEn: ''
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // 将选中的对手ID合并到表单数据中
      const submitData = {
        ...formData,
        opponentPlayerId: selectedOpponents.map(opponent => opponent.id).join('/')
      };

      if (dialogType === 'add') {
        await addCompetitionMutation.mutateAsync(submitData as CompetitionAddRequest);
        setIsEditDialogOpen(false);
      } else if (editingCompetition) {
        await updateCompetitionMutation.mutateAsync(submitData);
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      alert('操作失败');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setRequestParams({
      ...requestParams,
      compNameCn: filters.compNameCn,
      rivalChineseName: filters.rivalChineseName,
      compEventsCn: filters.compEventsCn,
      matchResult: filters.matchResult,
      current: 1,
    });
  };

  const handleReset = () => {
    setFilters({
      compNameCn: '',
      rivalChineseName: '',
      compEventsCn: '',
      matchResult: ''
    });
    setCurrentPage(1);
    setRequestParams({
      ...requestParams,
      compNameCn: '',
      rivalChineseName: '',
      compEventsCn: '',
      matchResult: '',
      current: 1,
    });
  };

  const totalPages = Math.ceil((competitionsData?.total || 0) / 10);

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>比赛管理</CardTitle>
              <CardDescription>管理乒乓球比赛信息</CardDescription>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              新增比赛
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* 搜索筛选 */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">比赛名称</label>
                <Input
                  placeholder="请输入比赛名称"
                  value={filters.compNameCn}
                  onChange={(e) => setFilters({ ...filters, compNameCn: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">对手姓名</label>
                <Input
                  placeholder="请输入对手姓名"
                  value={filters.rivalChineseName}
                  onChange={(e) => setFilters({ ...filters, rivalChineseName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">比赛项目</label>
                <Select value={filters.compEventsCn} onValueChange={(value) => setFilters({ ...filters, compEventsCn: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择比赛项目" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="男单（单项）">男单（单项）</SelectItem>
                    <SelectItem value="男单（团体）">男单（团体）</SelectItem>
                    <SelectItem value="男双（单项）">男双（单项）</SelectItem>
                    <SelectItem value="男双（团体）">男双（团体）</SelectItem>
                    <SelectItem value="混双（单项）">混双（单项）</SelectItem>
                    <SelectItem value="混双（团体）">混双（团体）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">比赛结果</label>
                <Select value={filters.matchResult} onValueChange={(value) => setFilters({ ...filters, matchResult: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择比赛结果" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="胜">胜</SelectItem>
                    <SelectItem value="负">负</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleReset}>
                重置
              </Button>
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
            </div>
          </div>

          {/* 比赛列表 */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>比赛名称</TableHead>
                <TableHead>对手</TableHead>
                <TableHead>比赛项目</TableHead>
                <TableHead>胜负</TableHead>
                <TableHead>赛果</TableHead>
                <TableHead>比赛时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitionsData?.records.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">暂无数据</TableCell>
                </TableRow>
              )}
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">加载中...</TableCell>
                </TableRow>
              ) : (
              competitionsData?.records.map((competition) => (
                <TableRow key={competition.id}>
                  <TableCell>{competition.compNameCn}</TableCell>
                  <TableCell>{competition.rivalChineseName}</TableCell>
                  <TableCell>{competition.compEventsCn}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      competition.matchResult === '胜' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {competition.matchResult}
                    </span>
                  </TableCell>
                  <TableCell>{competition.compResult}</TableCell>
                  <TableCell>{competition.compDatetime}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(competition)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(competition)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(competition)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                上一页
              </Button>
              <span className="text-sm">
                第 {currentPage} 页，共 {totalPages} 页
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                下一页
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 编辑比赛对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'add' ? '新增比赛' : dialogType === 'edit' ? '编辑比赛' : '查看比赛'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* 基本信息 */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">基本信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">比赛名称(英文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compNameEn}
                    onChange={(e) => setFormData({ ...formData, compNameEn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">比赛名称(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compNameCn}
                    onChange={(e) => setFormData({ ...formData, compNameCn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">比赛地点(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compLocationCn}
                    onChange={(e) => setFormData({ ...formData, compLocationCn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">比赛日期</label>
                  <Input
                    type="date"
                    disabled={dialogType === 'view'}
                    value={formData.compDatetime}
                    onChange={(e) => setFormData({ ...formData, compDatetime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">赛事体系(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compSeriesCn}
                    onChange={(e) => setFormData({ ...formData, compSeriesCn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">赛事规格(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compSpecificationCn}
                    onChange={(e) => setFormData({ ...formData, compSpecificationCn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">赛事类型</label>
                  <Select disabled={dialogType === 'view'} value={formData.compType} onValueChange={(value) => setFormData({ ...formData, compType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择赛事类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="成人赛事">成人赛事</SelectItem>
                      <SelectItem value="青少年赛事">青少年赛事</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">比赛轮次(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compRoundsCn}
                    onChange={(e) => setFormData({ ...formData, compRoundsCn: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 对手信息 */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">对手信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium">选择对手</label>
                  <MultiSelect
                    options={playersData?.records.map(player => ({
                      id: player.id,
                      value: player.chineseName,
                      label: `${player.chineseName} (${player.englishName})`
                    })) || []}
                    selected={selectedOpponents}
                    onChange={handleOpponentChange}
                    placeholder="选择对手运动员"
                    disabled={dialogType === 'view'}
                    loading={playersLoading}
                    onSearch={setPlayerSearchQuery}
                    searchPlaceholder="搜索运动员..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">对手中文名</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.rivalChineseName}
                    onChange={(e) => setFormData({ ...formData, rivalChineseName: e.target.value })}
                    placeholder="自动填充或手动输入"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">对手英文名</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.rivalEnglishName}
                    onChange={(e) => setFormData({ ...formData, rivalEnglishName: e.target.value })}
                    placeholder="自动填充或手动输入"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">对手协会</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.rivalAssociation}
                    onChange={(e) => setFormData({ ...formData, rivalAssociation: e.target.value })}
                    placeholder="自动填充或手动输入"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">对手打法(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.playStyleCn}
                    onChange={(e) => setFormData({ ...formData, playStyleCn: e.target.value })}
                    placeholder="自动填充或手动输入"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">对手打法(英文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.playStyleEn}
                    onChange={(e) => setFormData({ ...formData, playStyleEn: e.target.value })}
                    placeholder="自动填充或手动输入"
                  />
                </div>
              </div>
            </div>

            {/* 比赛信息 */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">比赛信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">比赛项目</label>
                  <Select value={formData.compEventsCn} onValueChange={(value) => setFormData({ ...formData, compEventsCn: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择比赛项目" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男单（单项）">男单（单项）</SelectItem>
                      <SelectItem value="男单（团体）">男单（团体）</SelectItem>
                      <SelectItem value="男双（单项）">男双（单项）</SelectItem>
                      <SelectItem value="男双（团体）">男双（团体）</SelectItem>
                      <SelectItem value="混双（单项）">混双（单项）</SelectItem>
                      <SelectItem value="混双（团体）">混双（团体）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">胜负</label>
                  <Select value={formData.matchResult} onValueChange={(value) => setFormData({ ...formData, matchResult: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择胜负" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="胜">胜</SelectItem>
                      <SelectItem value="负">负</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">赛果</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compResult}
                    onChange={(e) => setFormData({ ...formData, compResult: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">比分</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compScore}
                    onChange={(e) => setFormData({ ...formData, compScore: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">局分</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.compPoints}
                    onChange={(e) => setFormData({ ...formData, compPoints: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 团队信息 */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">团队信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">己方搭档(中文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.partnerChineseName}
                    onChange={(e) => setFormData({ ...formData, partnerChineseName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">己方搭档(英文)</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.partnerEnglishName}
                    onChange={(e) => setFormData({ ...formData, partnerEnglishName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">代表团队</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.representTeam}
                    onChange={(e) => setFormData({ ...formData, representTeam: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">团体出场位次</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.teamPlace}
                    onChange={(e) => setFormData({ ...formData, teamPlace: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">团队成员</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.teamMember}
                    onChange={(e) => setFormData({ ...formData, teamMember: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">场外指导</label>
                  <Input
                    disabled={dialogType === 'view'}
                    value={formData.offsiteGuidance}
                    onChange={(e) => setFormData({ ...formData, offsiteGuidance: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            {dialogType !== 'view' && (
              <Button 
                onClick={handleSubmit} 
                disabled={updateCompetitionMutation.isPending || addCompetitionMutation.isPending}
              >
                {dialogType === 'add' 
                  ? (addCompetitionMutation.isPending ? '添加中...' : '添加')
                  : (updateCompetitionMutation.isPending ? '更新中...' : '更新')
                }
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
