from transformers import pipeline

summarizer = pipeline('summarization')

def getSummary(article):
  ARTICLE = article.replace('.', '.<eos>')
  ARTICLE = article.replace('!', '!<eos>')
  ARTICLE = article.replace('?', '?<eos>')
  sentences = ARTICLE.split('<eos>')

  max_chunks = 500
  current_chunk = 0
  chunks = []

  for sentence in sentences:
    if len(chunks) == current_chunk + 1:
      if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunks:
        chunks[current_chunk].extend(sentence.split(' '))
      else:
        current_chunk += 1
        chunks.append(sentence.split(' '))
    else:
      chunks.append(sentence.split(' '))
      
  for chunk_id in range(len(chunks)):
    chunks[chunk_id] = ' '.join(chunks[chunk_id])

  summary = summarizer(chunks, max_length = 120, min_length = 3, do_sample = False)

  final = ' '.join([summ['summary_text'] for summ in summary])

  return final

from fastapi import FastAPI
from pydantic import BaseModel

class text_summary(BaseModel):
  paragraph: str = None
  
app = FastAPI()

@app.post("/summarize")
async def create_summary(paragraph: text_summary):
  summary = getSummary(paragraph.paragraph)
  return summary
  