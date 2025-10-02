import './FirstViewStyle.css'
import { useState } from 'react'
import Image from 'next/image'
import imgNotebook from '../../../../public/notebook_1.png'
import MainKeyList from '../MainKeyList.tsx'

type Props = {
    goNotes:(estado: boolean) => void
    keywdToPage: (keyword: string) => void
}

function FirstView({goNotes,keywdToPage}:Props){
  const [keyword, setKeyword] = useState('')

  const handleButton = () => {
    goNotes(true)
    keywdToPage(keyword)
  }

  return (
    <>
      <div className='header'>
        <Image src={imgNotebook} width='100' height='100' alt='notebook'></Image>
        <h1>Type Your Notes</h1>
      </div>
      <section className='main'>
        <input type='text' placeholder='Topic Keyword' onChange={(e)=>{setKeyword(e.target.value)}} autoFocus/>
          {(/^[a-zA-Z _0-9]+$/.test(keyword) && keyword.length > 0 && keyword.trim() !== '') 
          && <button onClick={()=>handleButton()}>
            Go to Notes
          </button>}
      </section>
      <div className='keyContainer'>
        <h2>Saved Keywords</h2>
        <MainKeyList goNotesBtnList={goNotes} setKeyToMain={keywdToPage}/>
      </div>
    </>
  )  
}

export default FirstView