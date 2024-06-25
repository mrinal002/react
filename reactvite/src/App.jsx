import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
 const [length, setLength] = useState(8) ;
 const [number, setNumber] = useState(false);
 const [char, setChar] = useState(false);
 const [password, setPassword] = useState(false);

 //Ref Hook
 const passwordRef = useRef(null)



   const PasswordGenerater = useCallback(()=>{
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(number)str += "0123456789"
  if(char)str += "!@#$%^&*()"
  for(let i = 1; i <= length; i++){
   let char = Math.floor(Math.random() * str.length + 1)

   pass += str.charAt(char)
    }

   setPassword(pass)

     }, [length, number, char, setPassword ] )
   
     //Copybod 
     const copyBod = useCallback(() =>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,24);
      window.navigator.clipboard.writeText(password)
     }, [password] )

    useEffect(() => { PasswordGenerater()   }, [length, number, char,  ]);
  return (
    <>

<h1 className=' text-4xl text-black'>Password Generater</h1>
<div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div className="md:flex">
    <div className="p-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <input 
          className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 px-3"
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyBod} className="ml-4 bg-blue-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-800 transition duration-300">
          Copy
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="lengthInput" className="text-gray-700">Length: {length}</label>
          <input 
            id="lengthInput"
            className="cursor-pointer"
            type="range"
            min={6}
            max={24}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="numberInput" className="text-gray-700">Number</label>
          <input 
            id="numberInput"
            type="checkbox"
            defaultChecked={number}
            onChange={() => { setNumber(prev => !prev) }}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="charInput" className="text-gray-700">Char</label>
          <input 
            id="charInput"
            type="checkbox"
            defaultChecked={char}
            onChange={() => { setChar(prev => !prev) }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</div>




    </>
  )
}

export default App
