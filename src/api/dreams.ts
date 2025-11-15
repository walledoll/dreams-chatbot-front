const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface IDreamsAPI {
  getDreams: () => Promise<any[]>;
  saveDream: (dream: any) => Promise<any>;
  getInterpretation: (id: string) => Promise<any>;
  getPublicInterpretation: (dream: string) => Promise<string>;
}

export const DreamsAPI: IDreamsAPI = {
  getDreams: async () => {
    const res = await fetch(`${API_URL}/dreams`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch dreams');
    return res.json();
  },

  saveDream: async (dream) => {
    const res = await fetch(`${API_URL}/dreams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dream),
    });
    if (!res.ok) throw new Error('Failed to save dream');
    return res.json();
  },

  getInterpretation: async (id) => {
    const res = await fetch(`${API_URL}/dreams/${id}/interpret`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to get interpretation');
    return res.json();
  },

  getPublicInterpretation: async (dream: string) => {
    const response = await fetch(`${API_URL}/dreams/interpret-public`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include', // ← не нужно, если публичный эндпоинт без авторизации
      body: JSON.stringify({ text: dream }),
      // ❌ НЕТ mode: 'no-cors'!
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Не удалось получить толкование: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.interpretation;
  },
};