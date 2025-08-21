'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlayers, useUpdatePlayer, useDeletePlayer } from '@/hooks/use-api';
import { Player } from '@/types';
import { Edit, Trash2 } from 'lucide-react';

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

  const { data: players = [], isLoading } = usePlayers();
  const updatePlayerMutation = useUpdatePlayer();
  const deletePlayerMutation = useDeletePlayer();


  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
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

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这个运动员吗？')) {
      try {
        await deletePlayerMutation.mutateAsync(id);
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingPlayer) {
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>运动员管理</CardTitle>
              <CardDescription>管理乒乓球运动员信息</CardDescription>
            </div>
            
          </div>
        </CardHeader>
        <CardContent>
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
              {players.map((player) => (
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
                        onClick={() => handleEdit(player)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(player.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 编辑运动员对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑运动员</DialogTitle>
            <DialogDescription>修改运动员信息</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">中文名</label>
              <Input
                value={formData.chineseName}
                onChange={(e) => setFormData({ ...formData, chineseName: e.target.value })}
                placeholder="请输入中文名"
              />
            </div>
            <div>
              <label className="text-sm font-medium">英文名</label>
              <Input
                value={formData.englishName}
                onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                placeholder="请输入英文名"
              />
            </div>
            <div>
              <label className="text-sm font-medium">性别</label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择性别" />
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
                value={formData.association}
                onChange={(e) => setFormData({ ...formData, association: e.target.value })}
                placeholder="请输入所属协会"
              />
            </div>
            <div>
              <label className="text-sm font-medium">世界排名</label>
              <Input
                type="number"
                value={formData.ranking}
                onChange={(e) => setFormData({ ...formData, ranking: parseInt(e.target.value) || 0 })}
                placeholder="请输入世界排名"
              />
            </div>
            <div>
              <label className="text-sm font-medium">积分</label>
              <Input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
                placeholder="请输入积分"
              />
            </div>
            <div>
              <label className="text-sm font-medium">年龄</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                placeholder="请输入年龄"
              />
            </div>
            <div>
              <label className="text-sm font-medium">生日</label>
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">打法(中文)</label>
              <Input
                value={formData.playStyleCn}
                onChange={(e) => setFormData({ ...formData, playStyleCn: e.target.value })}
                placeholder="请输入打法(中文)"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">打法(英文)</label>
              <Input
                value={formData.playStyleEn}
                onChange={(e) => setFormData({ ...formData, playStyleEn: e.target.value })}
                placeholder="请输入打法(英文)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={updatePlayerMutation.isPending}>
              {updatePlayerMutation.isPending ? '更新中...' : '更新'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
