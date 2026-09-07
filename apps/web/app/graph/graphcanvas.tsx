interface GraphProps  {
    a: number;
    b: number;
    c: number;
    roots?: [string, string];
    type: "real" | "repeated" | "complex";
  };
  
  const WIDTH = 400;
  const HEIGHT = 400;
  
  export  function GraphCanvas({ a, b, c, roots, type }: GraphProps) {
    
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
  
    
    const range = Math.max(6, Math.abs(vertexX) * 2 + 4);
    const xMin = vertexX - range / 2;
    const xMax = vertexX + range / 2;
  
    
    const points: [number, number][] = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = a * x * x + b * x + c;
      points.push([x, y]);
    }
  
    const yValues = points.map((p) => p[1]);
    const yMin = Math.min(...yValues, -5);
    const yMax = Math.max(...yValues, 5);
  
    const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * WIDTH;
    const toSvgY = (y: number) => HEIGHT - ((y - yMin) / (yMax - yMin)) * HEIGHT;
  
    const pathD = points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${toSvgX(x)} ${toSvgY(y)}`)
      .join(" ");
  
    const xAxisY = toSvgY(0);
    const yAxisX = toSvgX(0);
  
    const realRoots =
      type === "real" || type === "repeated"
        ? roots?.map((r) => parseFloat(r)).filter((r) => !isNaN(r))
        : [];
  
    return (
      <svg width={WIDTH} height={HEIGHT} className="bg-#FFF1F2 border rounded shadow">
        
        <line x1={0} y1={xAxisY} x2={WIDTH} y2={xAxisY} stroke="#660033" />
        <line x1={yAxisX} y1={0} x2={yAxisX} y2={HEIGHT} stroke="#660033" />
  
        
        <path d={pathD} fill="none" stroke="#AD1457" strokeWidth={2} />
  
        
        {realRoots?.map((r, i) => (
          <circle key={i} cx={toSvgX(r)} cy={xAxisY} r={5} fill="red" />
        ))}
      </svg>
    );
  }