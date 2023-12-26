import { useState } from 'react'
import ControlPanel from './components/ControlPanel'
import Viewer from './components/Viewer'
import exportAsImage from './utils/exportAsImage'

function App() {
  const [viewerData, setViewerData] = useState([])
  const [allChecked, setAllChecked] = useState([])
  const fetchQuotes =(e)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const categorySlug = formData.get("category")
    const numberOfQuotes = formData.get("number-of-quotes")
    const author = formData.get('author')

    let url = `https://api.quotable.io/quotes/random?limit=${numberOfQuotes}&tags=${categorySlug}&author=${author}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setViewerData(prev=>[...prev,...data])
    })
    .catch(err=>console.log(err))
  }

  const clearBtn=()=>{
    setViewerData([])
  }
  const refreshBtn=()=>{
    window.location.reload()
  }
  const handleCheckRemove=(e)=>{
    const targetBtn = e.currentTarget
    const classType = targetBtn.className
    const targetQuote = targetBtn.closest('.single-quote').querySelector('.single-quote-article')
    const targetQuoteId = targetQuote.querySelector('[name="quote-id"]').value

    if (classType==='def-on'){
      targetBtn.className = 'on'
      //add the dom to an arr 
      setAllChecked(prev=>([...prev,{id:targetQuoteId, dom:targetQuote}]))

    }else if (classType==='def-off'){
      //remove quote
      const index = viewerData.findIndex(obj=>obj._id === targetQuoteId)
      let newVD = [...viewerData]
      newVD.splice(index, 1)
      setViewerData(newVD)

    }else if (classType==='on'){
      targetBtn.className = "def-on"
      //remove dom from the arr
      const index = allChecked.findIndex((obj) => obj.querySelector('[name="quote-id"]').value === targetQuoteId)
      let newAC = [...allChecked]
      newAC.splice(index, 1)
      setAllChecked(newAC)
    }
  }
  const handleDownload=()=>{
    let domQuotes = []
    if (allChecked.length) {
      domQuotes = allChecked.map(quote=>quote.dom)
      domQuotes.forEach((quote, idx) => {
        exportAsImage(quote, `image-${idx + 1}`)
      })
      //remove class on
      allChecked.forEach(quote=>{
        const checkBtn = quote.dom.closest('.single-quote').querySelector('.on')
        checkBtn.className = 'def-on'
      })
      let temp = [...viewerData]
      allChecked.forEach((quote) => {
        const idx = temp.findIndex(quoteVD=>quoteVD._id === quote.id)
        temp.splice(idx,1)
      })
      setViewerData(temp)
      setAllChecked([])
    }else {
      domQuotes = [...document.querySelectorAll('.single-quote-article')]
      domQuotes.forEach((quote, idx) => {
        exportAsImage(quote, `image-${idx + 1}`)
      })
      setViewerData([])
    }
  }

  return (
    <div>
      <ControlPanel fetchQuotes={fetchQuotes} clearBtn={clearBtn} refreshBtn={refreshBtn} handleDownload={handleDownload} numOfChecked={allChecked.length}/>
      <Viewer viewerData={viewerData} handleCheckRemove={handleCheckRemove}/>
    </div>
  )
}

export default App
