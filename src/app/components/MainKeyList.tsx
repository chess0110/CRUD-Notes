'use client'
import { useState, useEffect } from 'react'

type Note = {
  id: number;
  key: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
type Props = {
  goNotesBtnList: (estado: boolean) => void;
  setKeyToMain:(keyword: string) => void
};
function MainKeyList({ goNotesBtnList, setKeyToMain }: Props) {
  const [keywordData, setKeywordData] = useState<Note[]>([]);

  const getKeywords = async () => {
    try {
      const res = await fetch('/api/notes', { method: 'GET' });
      const data: Note[] = await res.json();

      // Filtrar por key única
      const seen = new Set<string>();
      const uniqueNotes = data.filter(note => {
        if (seen.has(note.key)) return false;
        seen.add(note.key);
        return true;
      });

      setKeywordData(uniqueNotes);
    } catch (error) {
      console.error('Error al obtener keywords:', error);
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);

  const handleClick = (id: number,key:string) => {
    //console.log('Keyword seleccionada con ID:', id);
    // FUTURA IMPLEMENTACION
    //router.push(`/notes?keyword=${(key.trim()).replace(' ','_')}&id=${id}`)
    goNotesBtnList(true)
    setKeyToMain(key)
  };

  return (
    <ul>
      {keywordData.map(note => (
        <li key={note.id}>
          <button onClick={() => handleClick(note.id,note.key)}>{note.key}</button>
        </li>
      ))}
    </ul>
  );
}

export default MainKeyList;
