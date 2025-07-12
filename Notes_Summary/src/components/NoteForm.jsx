import React from "react";


const NoteForm = ({ notesInfo, setNotesInfo, onSubmit, loading }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
  };
    return(
        <>
        <form>
           
            <input 
            className="input__title"
            type="text" 
            required 
            placeholder="Header"
             value={notesInfo.title}
            onChange={(e) =>
              setNotesInfo((prev) => ({ ...prev, title: e.target.value}))
            }
            />
            <textarea 
            className="input__content"  
            required  
            maxLength={4000}
            placeholder="Your notes here..."
            value={notesInfo.notes}
            onChange={(e) =>
              setNotesInfo((prev) => ({ ...prev, notes: e.target.value }))
            }
           
            />
            <div className="">
                 <button 
            className="button_summ" 
            type="submit" 
            onClick={onSubmit}
            disabled={loading}>
                    Summarize!
            </button>
            <button
                className="clear"
                type="button"
                onClick={() =>
                    setNotesInfo({ id: "", title: "", notes: "", summary: "" })
                 }
            disabled={loading}
                >
                    Clear
            </button>
            </div>
           
            </form>
        </>
    )
    
};


export default NoteForm