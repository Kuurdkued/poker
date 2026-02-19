
import { HistoryItem } from '../types';

const STORAGE_KEY = 'dot_alias_history';

export const saveToHistory = (item: HistoryItem): void => {
  const history = getHistory();
  const updatedHistory = [item, ...history].slice(0, 50); // Keep last 50 entries
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = (): HistoryItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing history', e);
    return [];
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportHistoryCSV = (history: HistoryItem[]): void => {
  if (history.length === 0) return;
  const headers = ['Email', 'Username', 'Domain', 'Positions', 'Variations', 'Date'];
  const rows = history.map(item => [
    item.email,
    item.username,
    item.domain,
    item.dotPositions,
    item.totalVariations,
    new Date(item.timestamp).toLocaleString()
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'dot-alias-history.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
