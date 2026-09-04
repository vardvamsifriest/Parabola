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
      <div className="h-30 w-screen bg-primary">
        <div className="flex justify-center p-4">
            <p className="text-3xl text-shade font-Poppins mb-1 text-8xl">Parabola</p>
        </div>
      </div>
      <div className="pt-30">
      <p className="font-Poppins text-secondary text-2xl mb-6">Solve any quadratic equation ax² + bx + c = 0</p>
      
      
      <div className="flex justify-center gap-3 mb-4">
        <input value={a} onChange={(e) => setA(e.target.value)} placeholder="a" className="w-16 border rounded p-2 text-dark" />
        <input value={b} onChange={(e) => setB(e.target.value)} placeholder="b" className="w-16 border rounded p-2 text-dark" />
        <input value={c} onChange={(e) => setC(e.target.value)} placeholder="c" className="w-16 border rounded p-2 text-dark" />
        <button onClick={handleSolve} className="bg-secondary text-white px-4 rounded">Solve</button>
      </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="bg-white shadow rounded p-4 w-72 text-center">
          <p>Discriminant: {result.discriminant}</p>
          <p>Type: {result.type}</p>
          <p>Root 1: {result.roots[0]}</p>
          <p>Root 2: {result.roots[1]}</p>
          <GraphCanvas
    a={Number(a)}
    b={Number(b)}
    c={Number(c)}
    roots={result.roots}
    type={result.type}
  />
        </div>
        
      )}
    </div>
  );
}