import React from 'react'

function Congomodel(props) {

  const reload = () =>{
    window.location.reload();
  }
  return (
    <div className='congout' style={props.modelDisplay}>
        <div>
            <p>Congratulations , You Played Really well!!
            <button className="btn btn-primary controlele" onClick={reload}>
            <i class="fa-solid fa-rotate-left"></i> Start Again
                </button>
            </p>
            <span>🎉</span>
        </div>
    </div>
  )
}

export default Congomodel