import SingleQuote from "./SingleQuote"

export default function Viewer({viewerData,handleCheckRemove}) {
    const arrOfQuotes = viewerData.map(quoteObj=>(<SingleQuote handleCheckRemove={handleCheckRemove} quoteData={quoteObj} key={quoteObj.id}/>))
  return (
    <div id="viewer">
        <h4>Results: {viewerData.length}</h4>
        {arrOfQuotes}
    </div>
  )
}