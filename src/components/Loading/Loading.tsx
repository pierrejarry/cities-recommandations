import './Loading.css'

function Loading({text}: {text?: string}) {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      {text && <p>{text}</p>}
    </div>
  )
}

export default Loading