'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCompetitions, useUpdateCompetition, useDeleteCompetition } from '@/hooks/use-api';
import { Competition, CompetitionListRequest } from '@/types';
import { Edit, Trash2, Search } from 'lucide-react';

export default function CompetitionsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  const [filters, setFilters] = useState({
    compNameCn: '',
    rivalChineseName: '',
    compEventsCn: '',
    matchResult: ''
  });

  const [formData, setFormData] = useState<Omit<Competition, 'id'>>({
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

  const requestParams: CompetitionListRequest = {
    ...filters,
    size: pageSize,
    current: currentPage
  };

  const { data: competitionsData, isLoading } = useCompetitions(requestParams);
  const updateCompetitionMutation = useUpdateCompetition();
  const deleteCompetitionMutation = useDeleteCompetition();

  const handleEdit = (competition: Competition) => {
    setEditingCompetition(competition);
    setFormData({
      compNameEn: competition.compNameEn,
      compNameCn: competition.compNameCn,
      rivalChineseName: competition.rivalChineseName,
      compEventsCn: competition.compEventsCn,
      matchResult: competition.matchResult,
      compResult: competition.compResult,
      compDatetime: competition.compDatetime,
      compPoints: competition.compPoints,
      compScore: competition.compScore,
      compType: competition.compType,
      compRoundsCn: competition.compRoundsCn,
      compLocationCn: competition.compLocationCn,
      compSeriesCn: competition.compSeriesCn,
      compSpecificationCn: competition.compSpecificationCn,
      offsiteGuidance: competition.offsiteGuidance,
      partnerChineseName: competition.partnerChineseName,
      partnerEnglishName: competition.partnerEnglishName,
      playStyleCn: competition.playStyleCn,
      playStyleEn: competition.playStyleEn,
      rivalAssociation: competition.rivalAssociation,
      rivalEnglishName: competition.rivalEnglishName
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这场比赛吗？')) {
      try {
        await deleteCompetitionMutation.mutateAsync(id);
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingCompetition) {
        await updateCompetitionMutation.mutateAsync({
          ...formData,
          id: editingCompetition.id
        });
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      alert('操作失败');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      compNameCn: '',
      rivalChineseName: '',
      compEventsCn: '',
      matchResult: ''
    });
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  const totalPages = Math.ceil((competitionsData?.total || 0) / pageSize);

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>比赛管理</CardTitle>
              <CardDescription>管理乒乓球比赛信息</CardDescription>
            </div>
            
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
              {competitionsData?.records.map((competition) => (
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
                        onClick={() => handleEdit(competition)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(competition.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑比赛</DialogTitle>
            <DialogDescription>修改比赛信息</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">比赛名称(英文)</label>
              <Input
                value={formData.compNameEn}
                onChange={(e) => setFormData({ ...formData, compNameEn: e.target.value })}
                placeholder="请输入比赛名称(英文)"
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛名称(中文)</label>
              <Input
                value={formData.compNameCn}
                onChange={(e) => setFormData({ ...formData, compNameCn: e.target.value })}
                placeholder="请输入比赛名称(中文)"
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛轮次</label>
              <Input
                value={formData.compRoundsCn}
                onChange={(e) => setFormData({ ...formData, compRoundsCn: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛地点</label>
              <Input
                value={formData.compLocationCn}
                onChange={(e) => setFormData({ ...formData, compLocationCn: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">对手姓名</label>
              <Input
                value={formData.rivalChineseName}
                onChange={(e) => setFormData({ ...formData, rivalChineseName: e.target.value })}
                placeholder="请输入对手姓名"
              />
            </div>
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
                value={formData.compResult}
                onChange={(e) => setFormData({ ...formData, compResult: e.target.value })}
                placeholder=""
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛时间</label>
              <Input
                type="date"
                value={formData.compDatetime}
                onChange={(e) => setFormData({ ...formData, compDatetime: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">比赛积分</label>
              <Input
                value={formData.compPoints}
                onChange={(e) => setFormData({ ...formData, compPoints: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛类型</label>
              <Input
                value={formData.compType}
                onChange={(e) => setFormData({ ...formData, compType: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛得分</label>
              <Input
                value={formData.compScore}
                onChange={(e) => setFormData({ ...formData, compScore: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛系列</label>
              <Input
                value={formData.compSeriesCn}
                onChange={(e) => setFormData({ ...formData, compSeriesCn: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛规格</label>
              <Input
                value={formData.compSpecificationCn}
                onChange={(e) => setFormData({ ...formData, compSpecificationCn: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛指导</label>
              <Input
                value={formData.offsiteGuidance}
                onChange={(e) => setFormData({ ...formData, offsiteGuidance: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛搭档(中文)</label>
              <Input
                value={formData.partnerChineseName}
                onChange={(e) => setFormData({ ...formData, partnerChineseName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛搭档(英文)</label>
              <Input
                value={formData.partnerEnglishName}
                onChange={(e) => setFormData({ ...formData, partnerEnglishName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">比赛打法(中文)</label>
              <Input
                value={formData.playStyleCn}
                onChange={(e) => setFormData({ ...formData, playStyleCn: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">比赛打法(英文)</label>
              <Input
                value={formData.playStyleEn}
                onChange={(e) => setFormData({ ...formData, playStyleEn: e.target.value })}
              />
            </div>






          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={updateCompetitionMutation.isPending}>
              {updateCompetitionMutation.isPending ? '更新中...' : '更新'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
