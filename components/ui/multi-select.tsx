'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Check, ChevronDown, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
  id: number;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: MultiSelectOption[];
  onChange: (selected: MultiSelectOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "选择选项",
  disabled = false,
  loading = false,
  onSearch,
  searchPlaceholder = "搜索..."
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  const handleSelect = (option: MultiSelectOption) => {
    const isSelected = selected.some(item => item.id === option.id);
    if (isSelected) {
      onChange(selected.filter(item => item.id !== option.id));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option: MultiSelectOption) => {
    onChange(selected.filter(item => item.id !== option.id));
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 选择器触发器 */}
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-between text-left font-normal",
          !selected.length && "text-gray-500"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="truncate">
          {selected.length === 0 
            ? placeholder 
            : selected.length === 1 
              ? selected[0].label 
              : `已选择 ${selected.length} 项`
          }
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>

      {/* 已选择的标签 */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selected.map((option) => (
            <div
              key={option.id}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
            >
              <span>{option.label}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemove(option)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 下拉菜单 */}
      {isOpen && (
        <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-hidden">
          {/* 搜索框 */}
          {onSearch && (
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          )}

          {/* 选项列表 */}
          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">加载中...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? '未找到匹配的选项' : '暂无选项'}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.some(item => item.id === option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={cn(
                      "w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between",
                      isSelected && "bg-blue-50"
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                );
              })
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
