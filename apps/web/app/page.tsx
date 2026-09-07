"use client"
import { useState } from "react";
import { solveQuadratic, QuadraticResult } from "../lib/api";
import {GraphCanvas} from "./graph/graphcanvas"

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<QuadraticResult | null>(null);
  const [error, setError] = useState("");

  const handleSolve = () => {
    setError("");
    try {
      const res = solveQuadratic(Number(a), Number(b), Number(c));
      setResult(res);
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center">
      <div className="h-45 w-screen bg-primary">
        <div className="flex justify-center items-center">
         
          <div className="flex items-center">
            <div className="-translate-x-5">
              <img src = "./parabola.png" className="h-50 w-80"/>
            </div>
            <div className="-translate-x-25">
            <p className="text-3xl text-shade font-Poppins text-8xl ">Parabola</p>
            </div>
            </div>
        </div>
      </div>
      <div className="pt-30">
      <p className="font-Poppins text-dark text-2xl mb-6">Solve any quadratic equation ax² + bx + c = 0</p>
      
      
      <div className="flex justify-center gap-3 mb-4">
        <input value={a} onChange={(e) => setA(e.target.value)} placeholder="a" className="w-16 border rounded p-2 text-dark" />
        <input value={b} onChange={(e) => setB(e.target.value)} placeholder="b" className="w-16 border rounded p-2 text-dark" />
        <input value={c} onChange={(e) => setC(e.target.value)} placeholder="c" className="w-16 border rounded p-2 text-dark" />
        <button onClick={handleSolve} className="bg-secondary text-white px-4 rounded">Solve</button>
      </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="bg-rose-50 pt-16">
          <div className="text-center">
            <p className="font-Poppins text-2xl text-dark">Root Analysis:</p>
            </div>
            <div className="text-center">
          <div className="p-2">
          <p className="font-Poppins text-secondary text-xl">Discriminant: {result.discriminant}</p>
          </div>
          <div className="pt-2 text-xl">
          <p className="font-Poppins text-secondary">Type: {result.type}</p>
          </div>
          <div className="pt-2 text-xl">
          <p className="font-Poppins text-secondary">Root 1: {result.roots[0]}</p>
          </div>
          <div className="pt-2 text-xl">
          <p className="font-Poppins text-secondary">Root 2: {result.roots[1]}</p>
          </div>
          </div>
          <div className="pt-16 text-center">
          <p className ="font-Poppins text-2xl text-dark">
              Quadratic Graph
            </p>
            </div>
          <div className="pt-8 pb-16 ">
            
          <GraphCanvas
    a={Number(a)}
    b={Number(b)}
    c={Number(c)}
    roots={result.roots}
    type={result.type}
  />
        </div>
      </div>
        
      )}
    </div>
  );
}