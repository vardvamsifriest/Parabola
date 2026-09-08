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
          <div className="flex flex-col sm:flex-row items-center">
            <div className="sm:-translate-x-5">
              <img src = "./parabola.png" className="h-32 w-52 sm:h-50 sm:w-80"/>
            </div>
            <div className="sm:-translate-x-25">
            <p className="text-5xl sm:text-8xl text-shade font-Poppins">Parabola</p>
            </div>
            </div>
        </div>
      </div>
      <div className="pt-30">
      <p className="font-Poppins text-dark text-2xl mb-6">Solve any quadratic equation ax² + bx + c = 0</p>
      
      
      <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap px-2">
        <input value={a} onChange={(e) => setA(e.target.value)} placeholder="a" className="w-16 border rounded p-2 text-dark" />
        <input value={b} onChange={(e) => setB(e.target.value)} placeholder="b" className="w-16 border rounded p-2 text-dark" />
        <input value={c} onChange={(e) => setC(e.target.value)} placeholder="c" className="w-16 border rounded p-2 text-dark" />
        <button onClick={handleSolve} className="bg-secondary text-white px-4 rounded">Solve</button>
      </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="bg-rose-50 pt-12 sm:pt-16">
            <div className="w-full max-w-md rounded-xl border border-pink-200 bg-white/40 p-5 shadow-sm">


        <div className="mb-4 border-b border-pink-200 pb-3">
            <p className="font-Poppins text-2xl font-semibold text-dark">
               Root Analysis
            </p>
        </div>


        <div className="flex items-center justify-between py-3">
            <p className="font-Poppins text-lg text-dark">
              Discriminant
          </p>

        <span className="rounded-md bg-pink-100 px-3 py-1 font-Poppins text-lg font-semibold text-secondary">
            {result.discriminant}
        </span>
    </div>


    <div className="flex items-center justify-between py-3">
        <p className="font-Poppins text-lg text-dark">
            Nature of Roots
      </p>

        <span className="rounded-md bg-pink-100 px-3 py-1 font-Poppins text-lg font-semibold text-secondary">
            {result.type}
        </span>
    </div>

    <div className="flex items-center justify-between py-3">
  <p className="font-Poppins text-lg text-dark">
    Root 1
  </p>

  <span className="rounded-md bg-pink-100 px-3 py-1 font-Poppins text-lg font-semibold text-secondary">
    {result.roots[0]}
  </span>
    </div>


    <div className="flex items-center justify-between py-3">
        <p className="font-Poppins text-lg text-dark">
          Root 2
        </p>

        <span className="rounded-md bg-pink-100 px-3 py-1 font-Poppins text-lg font-semibold text-secondary">
          {result.roots[1]}
        </span>
      </div>

      </div>
          <div className="pt-16 text-center">
          <p className ="font-Poppins text-2xl text-dark">
              Quadratic Graph
            </p>
            </div>
          

          <div className="pt-8 pb-16 w-full overflow-x-auto flex justify-center">  
          <GraphCanvas
              a={Number(a)}
              b={Number(b)}
              c={Number(c)}
              roots={result.roots}
              type={result.type}/>
        </div>
      </div>
        
      )}
    </div>
  );
}