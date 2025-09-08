'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlayers, useUpdatePlayer, useAddPlayer, useDeletePlayer } from '@/hooks/use-api';
import { Player, PlayerQueryRequest, PlayerAddRequest } from '@/types';
import { Edit, Eye, Search, Plus, Trash2 } from 'lucide-react';

export default function PlayersPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<Omit<Player, 'id'>>({
    gender: '',
    chineseName: '',
    englishName: '',
    association: '',
    ranking: 0,
    score: 0,
    playStyleCn: '',
    playStyleEn: '',
    age: 0,
    birthDate: ''
  });

  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('edit');
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('')
  const [requestParams, setRequestParams] = useState<PlayerQueryRequest>({
    current: currentPage,
    size: 10,
    name: ''
  });

  useEffect(() => {
    setRequestParams({
      ...requestParams,
      current: currentPage,
    });
  }, [currentPage]);

  const handleReset = () => {
    setCurrentPage(1);
    setName('');
    setRequestParams({
      current: 1,
      size: 10,
      name: ''
    });
  };
  
  const { data: playerData, isLoading } = usePlayers(requestParams);
  const players = playerData?.records || [];
  const updatePlayerMutation = useUpdatePlayer();
  const addPlayerMutation = useAddPlayer();
  const deletePlayerMutation = useDeletePlayer();
  
  const handleSearch = () => {
    setCurrentPage(1);
    setRequestParams({
      ...requestParams,
      name: name,
      current: 1,
    });
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setModalType('edit');
    setFormData({
      gender: player.gender,
      chineseName: player.chineseName,
      englishName: player.englishName,
      association: player.association,
      ranking: player.ranking,
      score: player.score,
      playStyleCn: player.playStyleCn,
      playStyleEn: player.playStyleEn,
      age: player.age,
      birthDate: player.birthDate
    });
    setIsEditDialogOpen(true);
  };

  const handleView = (player: Player) => {
    setEditingPlayer(player);
    setModalType('view');
    setFormData({
      gender: player.gender,
      chineseName: player.chineseName,
      englishName: player.englishName,
      association: player.association,
      ranking: player.ranking,
      score: player.score,
      playStyleCn: player.playStyleCn,
      playStyleEn: player.playStyleEn,
      age: player.age,
      birthDate: player.birthDate
    });
    setIsEditDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPlayer(null);
    setModalType('add');
    setFormData({
      gender: '',
      chineseName: '',
      englishName: '',
      association: '',
      ranking: 0,
      score: 0,
      playStyleCn: '',
      playStyleEn: '',
      age: 0,
      birthDate: ''
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (player: Player) => {
    if (confirm(`确定要删除运动员 ${player.chineseName} 吗？`)) {
      try {
        await deletePlayerMutation.mutateAsync(player.id);
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (modalType === 'add') {
        await addPlayerMutation.mutateAsync(formData as PlayerAddRequest);
        setIsEditDialogOpen(false);
      } else if (editingPlayer) {
        await updatePlayerMutation.mutateAsync({
          ...formData,
          id: editingPlayer.id
        });
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      alert('操作失败');
    }
  };


  const totalPages = Math.ceil(playerData?.total || 0 / 10);

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>运动员管理</CardTitle>
              <CardDescription>管理乒乓球运动员信息</CardDescription>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              新增运动员
            </Button>
          </div>
        </CardHeader>
        <CardContent>
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">运动员名称</label>
                <Input
                  placeholder="请输入运动员名称"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>英文名</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>所属协会</TableHead>
                <TableHead>世界排名</TableHead>
                <TableHead>积分</TableHead>
                <TableHead>年龄</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">暂无数据</TableCell>
                </TableRow>
              )}
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">加载中...</TableCell>
                </TableRow>
              ) : (
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.chineseName}</TableCell>
                  <TableCell>{player.englishName}</TableCell>
                  <TableCell>{player.gender}</TableCell>
                  <TableCell>{player.association}</TableCell>
                  <TableCell>{player.ranking}</TableCell>
                  <TableCell>{player.score}</TableCell>
                  <TableCell>{player.age}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(player)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(player)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(player)}
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

      {/* 编辑运动员对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {modalType === 'add' ? '新增运动员' : modalType === 'edit' ? '编辑运动员' : '查看运动员'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">中文名</label>
              <Input
                disabled={modalType === 'view'}
                value={formData.chineseName}
                onChange={(e) => setFormData({ ...formData, chineseName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">英文名</label>
              <Input
                disabled={modalType === 'view'}
                value={formData.englishName}
                onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">性别</label>
              <Select disabled={modalType === 'view'} value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">男</SelectItem>
                  <SelectItem value="Female">女</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">所属协会</label>
              <Input
                disabled={modalType === 'view'}
                value={formData.association}
                onChange={(e) => setFormData({ ...formData, association: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">世界排名</label>
              <Input
                disabled={modalType === 'view'}
                type="number"
                value={formData.ranking}
                onChange={(e) => setFormData({ ...formData, ranking: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">积分</label>
              <Input
                disabled={modalType === 'view'}
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">年龄</label>
              <Input
                disabled={modalType === 'view'}
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">生日</label>
              <Input
                disabled={modalType === 'view'}
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">打法(中文)</label>
              <Input
                disabled={modalType === 'view'}
                value={formData.playStyleCn}
                onChange={(e) => setFormData({ ...formData, playStyleCn: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">打法(英文)</label>
              <Input
                disabled={modalType === 'view'}
                value={formData.playStyleEn}
                onChange={(e) => setFormData({ ...formData, playStyleEn: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            {modalType !== 'view' && (
              <Button 
                onClick={handleSubmit} 
                disabled={updatePlayerMutation.isPending || addPlayerMutation.isPending}
              >
                {modalType === 'add' 
                  ? (addPlayerMutation.isPending ? '添加中...' : '添加')
                  : (updatePlayerMutation.isPending ? '更新中...' : '更新')
                }
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
