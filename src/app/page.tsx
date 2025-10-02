'use client'
import './page.css'
import { useState } from 'react'
import FirstView from './components/MainComponent/FirstView'
import MainComponent from './components/MainComponent/MainComponent'


export default function Home() {
  const [ViewNotes, setViewNotes] = useState<boolean>(false)
  const [keyword, setKeyword] = useState('')


  return (
    <>
      {ViewNotes 
      ? <MainComponent MainKeyword={keyword}/>
      : <FirstView goNotes={setViewNotes} keywdToPage={setKeyword}/>}
      
    </>

  );
}
