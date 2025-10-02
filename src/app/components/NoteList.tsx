import React from 'react'
import './noteListStyle.css'

type Props = {
  keywd:string
}

function ListarNotas({keywd}:Props){

  


  return(
    <>
      <aside className='searchSide'>
        <div className='searchKeywordMain'>
          <input type="text" placeholder='Keyword'/>

          <button>Search Notes</button>
        </div>
        <h2 className='tituloKeywd'>{keywd}</h2>
        <div className='notesContainer'>
          <ul>
            <li><button></button><button>Nota_Test</button></li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default ListarNotas