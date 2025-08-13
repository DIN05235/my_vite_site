import React, { useRef,useState,useEffect } from "react";
import BirthdayStrawberryCake from "./components/BirthdayStrawberryCake";

export default function App() {
  const cakeRef = useRef();
  const [text, setText] = useState(""); // Store input value
  const [isWide, setIsWide] = useState(window.innerWidth > 768);
  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth > 768);
    }

    window.addEventListener("resize", handleResize);
    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function handleClick() {
    cakeRef.current?.blowOut()
    setText("")
  }

  return (
    <>
      {/* Reset margin/padding for the whole page */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      </style>

      <div
        style={{
          width: "100vw",
          height:"100vh", 
          background: "linear-gradient(135deg, #ffe6f0, #fff0f5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          color: "#ff4d6d",
        }}
      >
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",width:"100%"}}>
          <h1
          style={{
            fontSize: isWide?"7vw":"7vh",
            textShadow: "2px 2px #ffc1cc",
            margin: 0,
          }}
        >
          🎉
        </h1>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"}}>
            <h1
              style={{
                fontSize: isWide?"5vw":"4vh",
                textShadow: "2px 2px #ffc1cc",
                margin: 0,
              }}
            >
              Happy Birthday kub!
            </h1>
            <h1
              style={{
                fontSize: isWide?"7vw":"7vh",
                textShadow: "2px 2px #ffc1cc",
                margin: 0,
              }}
            >
              ___
            </h1>
        </div>
        <h1
          style={{
            fontSize: isWide?"7vw":"7vh",
            textShadow: "2px 2px #ffc1cc",
            margin: 0,
          }}
        >
          🎉
        </h1>

        </div>
        

        <div
          style={{
            display: "flex",
            flexDirection: isWide?"row":"column",
            margin: "10px",
            background: "#FFF8F0",
            borderRadius: "16px",
            width: "90%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
            overflow: "hidden",
          }}
        >
          <div style={{ width: isWide?"40%":"90%", height: isWide?"90%":"50%",}}>
            <BirthdayStrawberryCake  ref={cakeRef} /> 
          </div>
          <div style={{ width: isWide?"40%":"90%", height: "100%",
            display:"flex",flexDirection:"column",paddingLeft:"10px",justifyContent:"center"}} >
            <h3 style={{fontSize:isWide?"2vw":"2vh",color:"black"}}>Enter your wish hear</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                padding: "10px",
                fontSize: isWide?"2vw":"2vh",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "90%",
                height:"60%",
                textAlign:"start",
                alignItems:"start"
              }}
            />
              <button
              onClick={handleClick}
              style={{
                margin:"5px 0",
                backgroundColor: "#555",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width:"30%",
                height:"10%",
                fontSize:isWide?"1.5vw":"1.5vh",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
              }}
            >
              Blow Out
            </button>
          </div>
        </div>
          
      </div>
    </>
  );
}
