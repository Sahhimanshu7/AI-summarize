import React, { useState, useEffect} from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary };

      const updatedArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
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
        </form>

        {/* Browse URL history */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='bg-slate-200 relative flex justify-center items-center space-x-4 md:w-[50vw] w-[80vw] pr-2 pl-2'
            >
              <div className='object-contain'>
                <ContentCopyIcon sx={{ color: "black" }, { fontSize: 18}}/>
              </div>
              <p className='flex-1 text-blue-700 font-medium text-[12px]'>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=''>
        {isFetching ? (
          <button type="button" class="bg-indigo-500 ..." disabled>
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            </svg>
            Processing...
          </button>
        )
      : error ? (
        <p className='font-bold text-black text-center'> Well, that wasn't supposed to happen
        <br />
        <span className='font-normal text-gray-700'>
          {error?.data?.error}
        </span>
        </p>
      ) : (
        article.summary && (
          <div className='flex flex-col gap-3 w-[98vw] p-4 items-center bg-slate-200 mt-2 ml-2 mr-2'>
            <h2 className='font-bold text-xl text-gray-600 text-center'>Article <span className="text-blue-600">Summary</span></h2>
            <div className='w-[80vw]'>
              <p className='text-left text-gray-600 text-[12px]'>{article.summary}</p>
            </div>
          </div>
        )
      )
      }
      </div>
    </section>
  )
}

export default Demo