  import { useState } from 'react'

  import './App.css'
  import NoteForm from './components/NoteForm'
  import History from './components/History';

  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  function App() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [sidemenu,setSideMenu] = useState(0);
  const [notesInfo,setNotesInfo] = useState({
    id:'',
    title:'',
    notes:'',
    summary:'',
  })

  const handleSubmit = async () => {
    if(notesInfo.title === '' || notesInfo.notes === ''){

    }
    else{
    setLoading(true);
    try{
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: notesInfo.notes,
        }),
      }
    
    );

    const data = await response.json();
    const summaryText = data[0]?.summary_text || "No summary found.";

     const updatedNote = {
      ...notesInfo,
      summary: summaryText,
    };

    
    setNotesInfo(updatedNote);
    setHistory((prev) => [...prev, updatedNote]);
    
  }catch (error){
    console.error("Error fetching summary:", error);
    setNotesInfo((prev) => ({
      ...prev,
      summary: "Error getting summary.",
    }));
  }finally{
    setLoading(false);     
  }
}
  };
  const handleClear = () =>{
    setNotesInfo((prev) => ({ ...prev, 
      notes: '',
      title: '',
      summary: ''
    }))
  }
  const toggleSide = ()=>{
      setSideMenu(!sidemenu);
  }

    return (
      <>
        {sidemenu?
        <div className='sidebar--expanded'>
           <History history={history} toggleSide={toggleSide} setNotesInfo={setNotesInfo}/>
        </div>
         
            :
           <div className='sidebar'>
             <button className='history' onClick={toggleSide}>🕓</button>
          </div>

        }
       
        <div className={`title ${sidemenu ? "content--shifted" : ""}`}>
            <h1>SummNotes</h1>
        </div>

        <div className={`content ${sidemenu ? "content--shifted" : ""}`}>
            <div className='note-form'>
              <NoteForm 
              notesInfo={notesInfo} 
              setNotesInfo={setNotesInfo}
              onSubmit={handleSubmit}
              loading={loading}/>
            </div>
            <div className='summary'>
              <textarea className='summ'
                readOnly
                 value={notesInfo.summary}
              />
            </div>

        </div>
        {loading && <div className='loading'>

        </div>
        }
        
      
      
      
      </>
    )
  }

  export default App
