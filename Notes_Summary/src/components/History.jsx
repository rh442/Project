import React from "react";

const History= ({setNotesInfo, history,toggleSide})=>{
    const LoadMain = (note) =>{
        setNotesInfo((prev)=>({...prev,
            notes: note.notes,
            title: note.title,
            summary: note.summary
        }))
    }
    return(
        <>
            <div className="button_contain">
                <button className='history' onClick={toggleSide}>🕓</button> 
            </div>
            <h2 className="bar-header">History </h2>
            {history && history.length > 0 ?(
                history.map((note,index)=>(
                    <div>
                    <button
                        key={index}
                        type="submit"
                        className="history-button"
                        onClick={()=>LoadMain(note)}
                        >
                        {note.title}</button>
                        <br></br>
                    </div>
                        
                        
                ))
            ):( 
                <div>
                    <h3>You haven't made    any summaries yet</h3>
                </div>
            )}
            
        </>
    )
}

export default History