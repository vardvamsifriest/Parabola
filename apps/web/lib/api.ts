export interface QuadraticResult {
    discriminant: number;
    type: "real" | "repeated" | "complex";
    roots: [string, string];
  };
  
  export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
    if (a === 0) throw new Error("Not a quadratic equation (a cannot be 0)");
  
    const discriminant = b * b - 4 * a * c;
    const twoA = 2 * a;
  
    if (discriminant > 0) {
      const r1 = (-b + Math.sqrt(discriminant)) / twoA;
      const r2 = (-b - Math.sqrt(discriminant)) / twoA;
      return { discriminant, type: "real", roots: [r1.toFixed(3), r2.toFixed(3)] };
    }
  
    if (discriminant === 0) {
      const r = (-b / twoA).toFixed(3);
      return { discriminant, type: "repeated", roots: [r, r] };
    }
  
    const real = (-b / twoA).toFixed(3);
    const imag = (Math.sqrt(-discriminant) / twoA).toFixed(3);
    return {
      discriminant,
      type: "complex",
      roots: [`${real} + ${imag}i`, `${real} - ${imag}i`],
    };
  }