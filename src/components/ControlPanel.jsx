import { useEffect, useState } from "react"

export default function ControlPanel({fetchQuotes,clearBtn,refreshBtn,handleDownload,numOfChecked}) {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetch("https://api.quotable.io/tags")
        .then(res=>res.json())
        .then(data=>{
            const filtered = data.filter(item=>item.quoteCount >= 10).map(item=>({category:item.name, quoteCount: item.quoteCount,slug:item.slug})).sort((a,b)=>(b.quoteCount-a.quoteCount))
            setCategories(filtered)
        })
        .catch(err=>console.log(err))
    },[])
    const options = categories.map(item=>(<option value={item.slug} key={item.slug}>{item.category}--{item.quoteCount}</option>))

  return (
    <div id="control-panel">
        <form id="fetch-form" onSubmit={fetchQuotes}>
            <div className="form-group">
                <label htmlFor="category" className="form-label">Category: </label>
                <select name="category" id="category" className="form-select">
                    <option value="">select a category</option>
                    {options}
                </select>
            </div>
            <br/>
            <div className="form-group">
                <label htmlFor="author" className="form-label">Author: </label>
                <input className="form-control" type="text" id="author" name="author" placeholder="Author's slug/name"/>
            </div>
            <br/>
            <div className="form-group">
                <label htmlFor="category" className="form-label">Number of Quotes: </label>
                <input type="number" min="1" max="50" name="number-of-quotes" id="number-of-quotes" defaultValue="5" className="form-control"/>
            </div>
            <br />
            <div className="d-grid col-6 mx-auto">
                <button className="btn btn-primary" type="submit">Fetch</button>
            </div>
            <br />
            <div className="d-grid col-6 mx-auto">
                <button className="btn btn-light" type="button" onClick={clearBtn}>Clear Viewer</button>
            </div>
            <br />
            <div className="d-grid col-6 mx-auto">
                <button className="btn btn-light" type="button" onClick={refreshBtn}>Refresh</button>
            </div>
            <br />
            <div className="d-grid col-6 mx-auto">
                <button className="btn btn-light" type="button" onClick={handleDownload}>Download</button>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="num-of-checked" className="form-label">Num of Checked: </label>
                <input className="form-control" type="text" id="num-of-checked" readOnly value={numOfChecked}/>
            </div>
        </form>
        
    </div>
  )
}