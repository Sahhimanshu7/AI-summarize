import React, { useState, useEffect} from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendIcon from '@mui/icons-material/Send';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-[100vw] gap-2 items-center'>
        <form className='relative flex justify-center items-center space-x-4 md:w-[50vw] w-[80vw]'
        onSubmit={handleSubmit}
        >
          <InsertLinkIcon />
          <input 
          type='url'
          placeholder='Enter a URL'
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value })}
          className='peer outline-none bg-inherit ml-2 w-full'
          required
          />
          <button
          type='submit'
          className='peer-focus:border-black-900 peer-focus:text-black-900 text-gray-900 border-gray-900'
          >
            <SendIcon />
          </button>

          {/* Browse URL history */}
        </form>

        {/* Display Result  */}
      </div>
    </section>
  )
}

export default Demo