import { useState } from "react"

export default function SingleQuote({ quoteData, handleCheckRemove }) {
  let textDiv = null
  const keyFunc = (e) => {
    const the_key = e.key
    if (the_key === "ArrowUp") {
      textDiv.style.fontSize = `${parseFloat(textDiv.style.fontSize) + 0.1}rem`
    } else if (the_key === "ArrowDown") {
      textDiv.style.fontSize = `${parseFloat(textDiv.style.fontSize) - 0.1}rem`
    }
  }
  const handleMouseOver = (e) => {
    textDiv = e.target
    document.addEventListener("keydown", keyFunc)
  }
  const handleMouseLeave = (e) => {
    document.removeEventListener("keydown", keyFunc)
  }
  return (
    <article className="single-quote">
      <div className="single-quote-article">
        <input type="hidden" name="quote-id" value={quoteData._id}/>
        <img src="/quotation-mark.png" alt="" width="130" />
        <div
          className="quote-content"
          style={{ fontSize: "2rem" }}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {quoteData.content}
        </div>
        <div className="quote-author">-{quoteData.author}</div>
      </div>
      <div className="check-remove">
        <button className="def-on" onClick={handleCheckRemove}>
          <i className="fa-solid fa-check"></i>
        </button>
        <button className="def-off" onClick={handleCheckRemove}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </article>
  )
}
