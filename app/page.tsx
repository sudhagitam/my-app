"use client";

import { useState } from "react";

type Calculator =
  | "scientific"
  | "mortgage"
  | "age"
  | "temperature"
  | "currency"
  | "units";

const calculatorList: { id: Calculator; label: string; icon: string; short: string }[] = [
  { id: "scientific",  label: "Scientific Calculator",  icon: "🔬", short: "Scientific" },
  { id: "mortgage",    label: "Mortgage Calculator",    icon: "🏠", short: "Mortgage"   },
  { id: "age",         label: "Age Calculator",         icon: "🎂", short: "Age"        },
  { id: "temperature", label: "Temperature Converter",  icon: "🌡️", short: "Temp"       },
  { id: "currency",    label: "Live Currency Converter",icon: "💱", short: "Currency"   },
  { id: "units",       label: "Units Converter",        icon: "📏", short: "Units"      },
];

// ── Scientific Calculator ──────────────────────────────────────────────────
function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [isDeg, setIsDeg] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const toRad = (v: number) => (isDeg ? (v * Math.PI) / 180 : v);

  const handleNumber = (val: string) => {
    if (justEvaluated) {
      setDisplay(val); setExpression(val); setJustEvaluated(false);
    } else {
      setDisplay(display === "0" ? val : display + val);
      setExpression(expression + val);
    }
  };

  const handleOp = (op: string) => {
    setJustEvaluated(false);
    setExpression(expression + op);
    setDisplay(op);
  };

  const handleClear = () => {
    setDisplay("0"); setExpression(""); setJustEvaluated(false);
  };

  const handleEval = () => {
    try {
      const result = Function(`"use strict"; return (${expression})`)();
      setDisplay(String(result)); setExpression(String(result)); setJustEvaluated(true);
    } catch {
      setDisplay("Error"); setExpression("");
    }
  };

  const handleFn = (fn: string) => {
    const val = parseFloat(display);
    let result: number;
    switch (fn) {
      case "sin": result = Math.sin(toRad(val)); break;
      case "cos": result = Math.cos(toRad(val)); break;
      case "tan": result = Math.tan(toRad(val)); break;
      case "ln":  result = Math.log(val); break;
      case "log": result = Math.log10(val); break;
      case "√":   result = Math.sqrt(val); break;
      case "x²":  result = val * val; break;
      case "1/x": result = 1 / val; break;
      case "x!": { let f = 1; for (let i = 2; i <= val; i++) f *= i; result = f; break; }
      case "π":   result = Math.PI; break;
      case "e":   result = Math.E; break;
      default:    result = val;
    }
    const r = String(parseFloat(result.toFixed(10)));
    setDisplay(r); setExpression(r); setJustEvaluated(true);
  };

  const btn = (label: string, onClick: () => void, cls = "") => (
    <button key={label} onClick={onClick}
      className={`flex items-center justify-center rounded-xl font-semibold text-sm transition-all active:scale-95 h-10 ${cls}`}>
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl">
        <div className="bg-gray-800 rounded-xl p-3 mb-3 text-right">
          <div className="text-gray-400 text-xs h-4 mb-1 truncate">{expression}</div>
          <div className="text-white text-3xl font-light truncate">{display}</div>
        </div>
        <div className="flex justify-end mb-2">
          <button onClick={() => setIsDeg(!isDeg)} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
            {isDeg ? "DEG" : "RAD"}
          </button>
        </div>
        <div className="grid grid-cols-5 gap-1 mb-1">
          {["sin","cos","tan","π","e"].map((f) => btn(f, () => handleFn(f), "bg-gray-700 text-indigo-300 text-xs h-8"))}
        </div>
        <div className="grid grid-cols-5 gap-1 mb-1">
          {["ln","log","√","x²","1/x"].map((f) => btn(f, () => handleFn(f), "bg-gray-700 text-indigo-300 text-xs h-8"))}
        </div>
        <div className="grid grid-cols-5 gap-1 mb-1">
          {["x^y","x!","(",")", "AC"].map((f) =>
            btn(f,
              f === "AC" ? handleClear : f === "x^y" ? () => handleOp("**") : () => handleOp(f),
              f === "AC" ? "bg-red-600 text-white" : "bg-gray-700 text-indigo-300 text-xs h-8"
            )
          )}
        </div>
        <div className="grid grid-cols-4 gap-1 mt-2">
          {["7","8","9","÷","4","5","6","×","1","2","3","−","0",".","=","+"].map((k) => {
            const opMap: Record<string, string> = {"÷":"/","×":"*","−":"-","+":"+"};
            const isOp = k in opMap; const isEq = k === "=";
            return btn(k,
              isEq ? handleEval : isOp ? () => handleOp(opMap[k]) : () => handleNumber(k),
              isEq ? "bg-indigo-600 text-white" : isOp ? "bg-gray-600 text-yellow-300" : "bg-gray-700 text-white"
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Mortgage Calculator ────────────────────────────────────────────────────
function MortgageCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: string; total: string; interest: string } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal), r = parseFloat(rate) / 100 / 12, n = parseFloat(years) * 12;
    if (!P || !r || !n) return;
    const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = M * n;
    setResult({ monthly: M.toFixed(2), total: total.toFixed(2), interest: (total - P).toFixed(2) });
  };

  const field = (label: string, value: string, onChange: (v: string) => void, placeholder: string) => (
    <div key={label} className="mb-3">
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-5 shadow-2xl">
      <h2 className="text-white text-xl font-semibold mb-4">Mortgage Calculator</h2>
      {field("Loan Amount ($)", principal, setPrincipal, "e.g. 300000")}
      {field("Annual Interest Rate (%)", rate, setRate, "e.g. 6.5")}
      {field("Loan Term (years)", years, setYears, "e.g. 30")}
      <button onClick={calculate} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
        Calculate
      </button>
      {result && (
        <div className="mt-4 bg-gray-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-400">Monthly Payment</span><span className="text-white font-bold">${result.monthly}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Total Payment</span><span className="text-white">${result.total}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Total Interest</span><span className="text-red-400">${result.interest}</span></div>
        </div>
      )}
    </div>
  );
}

// ── Age Calculator ─────────────────────────────────────────────────────────
function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob), now = new Date();
    let y = now.getFullYear() - birth.getFullYear();
    let m = now.getMonth() - birth.getMonth();
    let d = now.getDate() - birth.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    setResult(`${y} years, ${m} months, ${d} days`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-5 shadow-2xl">
      <h2 className="text-white text-xl font-semibold mb-4">Age Calculator</h2>
      <label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500 mb-4" />
      <button onClick={calculate} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
        Calculate Age
      </button>
      {result && (
        <div className="mt-4 bg-gray-800 rounded-xl p-4 text-center text-white text-lg font-semibold">{result}</div>
      )}
    </div>
  );
}

// ── Temperature Converter ──────────────────────────────────────────────────
function TemperatureConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("Celsius");
  const scales = ["Celsius", "Fahrenheit", "Kelvin"];

  const convert = (val: number, f: string) => {
    let c: number;
    if (f === "Celsius") c = val;
    else if (f === "Fahrenheit") c = (val - 32) * 5 / 9;
    else c = val - 273.15;
    return { Celsius: c.toFixed(2), Fahrenheit: (c * 9 / 5 + 32).toFixed(2), Kelvin: (c + 273.15).toFixed(2) };
  };

  const results = value ? convert(parseFloat(value), from) : null;

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-5 shadow-2xl">
      <h2 className="text-white text-xl font-semibold mb-4">Temperature Converter</h2>
      <div className="flex gap-2 mb-3">
        {scales.map((s) => (
          <button key={s} onClick={() => setFrom(s)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${from === s ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}>
            {s}
          </button>
        ))}
      </div>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter value in ${from}`}
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500 mb-3" />
      {results && (
        <div className="bg-gray-800 rounded-xl p-4 space-y-3">
          {scales.map((s) => (
            <div key={s} className="flex justify-between text-sm">
              <span className="text-gray-400">{s}</span>
              <span className="text-white font-semibold">{results[s as keyof typeof results]}°</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Currency Converter ─────────────────────────────────────────────────────
function CurrencyConverter() {
  const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53, INR: 83.1, CNY: 7.24 };
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const converted = amount ? ((parseFloat(amount) / rates[from]) * rates[to]).toFixed(2) : "";

  const sel = (label: string, value: string, onChange: (v: string) => void) => (
    <div className="flex-1">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white rounded-lg px-2 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500">
        {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-5 shadow-2xl">
      <h2 className="text-white text-xl font-semibold mb-4">Live Currency Converter</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount"
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500 mb-3" />
      <div className="flex gap-3 mb-4 items-end">
        {sel("From", from, setFrom)}
        <div className="pb-3 text-gray-400 text-lg">→</div>
        {sel("To", to, setTo)}
      </div>
      {converted && (
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-gray-400 text-sm mb-1">{amount} {from} =</div>
          <div className="text-white text-2xl font-bold">{converted} {to}</div>
          <div className="text-gray-500 text-xs mt-1">Rate: 1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}</div>
        </div>
      )}
    </div>
  );
}

// ── Units Converter ────────────────────────────────────────────────────────
function UnitsConverter() {
  const categories = {
    Length: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084, in: 39.3701 },
    Weight: { kg: 1, g: 1000, lb: 2.20462, oz: 35.274, t: 0.001 },
    Area: { "m²": 1, "km²": 1e-6, "cm²": 10000, "ft²": 10.7639, ac: 0.000247105 },
  };

  const [category, setCategory] = useState<keyof typeof categories>("Length");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m");

  const units = Object.keys(categories[category]);
  const rates = categories[category] as Record<string, number>;
  const baseVal = value ? parseFloat(value) / rates[from] : null;

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-5 shadow-2xl">
      <h2 className="text-white text-xl font-semibold mb-4">Units Converter</h2>
      <div className="flex gap-2 mb-3">
        {(Object.keys(categories) as (keyof typeof categories)[]).map((c) => (
          <button key={c} onClick={() => { setCategory(c); setFrom(Object.keys(categories[c])[0]); setValue(""); }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${category === c ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-3">
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value"
          className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500" />
        <select value={from} onChange={(e) => setFrom(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-2 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-500">
          {units.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      {baseVal !== null && (
        <div className="bg-gray-800 rounded-xl p-3 space-y-2">
          {units.filter((u) => u !== from).map((u) => (
            <div key={u} className="flex justify-between text-sm">
              <span className="text-gray-400">{u}</span>
              <span className="text-white font-semibold">{(baseVal * rates[u]).toFixed(4)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState<Calculator>("scientific");

  const renderCalculator = () => {
    switch (active) {
      case "scientific":   return <ScientificCalculator />;
      case "mortgage":     return <MortgageCalculator />;
      case "age":          return <AgeCalculator />;
      case "temperature":  return <TemperatureConverter />;
      case "currency":     return <CurrencyConverter />;
      case "units":        return <UnitsConverter />;
    }
  };

  const activeItem = calculatorList.find((c) => c.id === active)!;

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ── Desktop Sidebar (md and up) ── */}
      <aside className="hidden md:flex w-56 min-h-screen bg-gray-900 border-r border-gray-800 flex-col p-4 shrink-0">
        <div className="mb-6">
          <h1 className="text-white text-lg font-bold tracking-tight">Calculator Suite</h1>
          <p className="text-gray-500 text-xs mt-0.5">Select a tool</p>
        </div>
        <nav className="flex flex-col gap-2">
          {calculatorList.map(({ id, label, icon }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active === id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}>
              <span className="text-base">{icon}</span>
              <span className="leading-tight">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Content Column ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Mobile top header */}
        <header className="md:hidden flex items-center gap-3 bg-gray-900 border-b border-gray-800 px-4 py-3 shrink-0">
          <span className="text-2xl">{activeItem.icon}</span>
          <div>
            <p className="text-white text-sm font-bold leading-tight">{activeItem.label}</p>
            <p className="text-gray-500 text-xs">Calculator Suite</p>
          </div>
        </header>

        {/* Scrollable content — pb-36 reserves space for the 2-row tab bar on mobile */}
        <main className="flex-1 overflow-y-auto p-4 pb-36 md:pb-8 md:flex md:items-center md:justify-center md:p-8">
          <div className="w-full max-w-lg mx-auto">
            {renderCalculator()}
          </div>
        </main>

        {/* ── Mobile Bottom Tab Bar (2 rows × 3 tabs) ── */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-gray-900 border-t border-gray-800 z-50">
          {/* Row 1 */}
          <div className="grid grid-cols-3">
            {calculatorList.slice(0, 3).map(({ id, icon, short }) => (
              <button key={id} onClick={() => setActive(id)}
                className={`relative flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
                  active === id ? "text-indigo-400" : "text-gray-500"
                }`}>
                {active === id && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-400 rounded-full" />
                )}
                <span className="text-xl leading-none">{icon}</span>
                <span className="text-[10px] font-semibold tracking-wide">{short}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-800" />
          {/* Row 2 */}
          <div className="grid grid-cols-3">
            {calculatorList.slice(3).map(({ id, icon, short }) => (
              <button key={id} onClick={() => setActive(id)}
                className={`relative flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
                  active === id ? "text-indigo-400" : "text-gray-500"
                }`}>
                {active === id && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-400 rounded-full" />
                )}
                <span className="text-xl leading-none">{icon}</span>
                <span className="text-[10px] font-semibold tracking-wide">{short}</span>
              </button>
            ))}
          </div>
        </nav>

      </div>
    </div>
  );
}
