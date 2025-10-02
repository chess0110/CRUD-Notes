'use client'
import './keywordStyle.css'
//import svgTrashCan from '../../../../public/trashcan.svg'
import React, { useState, useEffect, use } from 'react'
//import { useSearchParams } from 'next/navigation'
import NoteList from '../NoteList'
import KeyList from '../KeyList'
import TextAreaNote from '../TextAreaNote'

type Props = {
  MainKeyword:string
}

export default function HomeNotes({MainKeyword}:Props) {


  return (
    <div id='main'>

      <NoteList keywd={MainKeyword}/>

      <section className='editingSide'>
        <div className='editingHead'>
          <input type='text' placeholder='Title'/>
          <div className='editingBtn'>
            <button>Create New Note</button>
            <button>Save Note</button>
          </div>
        </div>

        
        <TextAreaNote />
      </section>

      <KeyList />
    
    </div>
  )
}
