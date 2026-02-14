'use client'

import { useState } from 'react'

// Scientific Calculator Component
function ScientificCalculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [newNumber, setNewNumber] = useState(true)
  const [angleMode, setAngleMode] = useState('deg') // deg or rad

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num))
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)
    
    if (prevValue === null) {
      setPrevValue(currentValue)
    } else if (operation && !newNumber) {
      const result = calculate(prevValue, currentValue, operation)
      setDisplay(String(result))
      setPrevValue(result)
    }
    
    setOperation(op)
    setNewNumber(true)
  }

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return current !== 0 ? prev / current : 0
      case '^':
        return Math.pow(prev, current)
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const currentValue = parseFloat(display)
      const result = calculate(prevValue, currentValue, operation)
      setDisplay(String(result))
      setPrevValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleScientificFunction = (func) => {
    const value = parseFloat(display)
    let result

    switch (func) {
      case 'sin':
        result = angleMode === 'deg' ? Math.sin(value * Math.PI / 180) : Math.sin(value)
        break
      case 'cos':
        result = angleMode === 'deg' ? Math.cos(value * Math.PI / 180) : Math.cos(value)
        break
      case 'tan':
        result = angleMode === 'deg' ? Math.tan(value * Math.PI / 180) : Math.tan(value)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      case 'x²':
        result = Math.pow(value, 2)
        break
      case '1/x':
        result = value !== 0 ? 1 / value : 0
        break
      case 'e':
        result = Math.E
        break
      case 'π':
        result = Math.PI
        break
      case '!':
        result = factorial(value)
        break
      default:
        result = value
    }

    setDisplay(String(result))
    setNewNumber(true)
  }

  const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Scientific Calculator</h2>
      
      {/* Display */}
      <div className="bg-slate-900/80 rounded-2xl p-6 mb-4 border border-slate-700/30">
        <div className="text-right">
          <div className="text-slate-500 text-sm mb-1 h-6 flex justify-between">
            <span className="text-purple-400 font-semibold">{angleMode.toUpperCase()}</span>
            <span>{prevValue !== null && operation ? `${prevValue} ${operation}` : ''}</span>
          </div>
          <div className="text-white text-4xl font-light break-all">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-5 gap-2">
        {/* Row 1 - Scientific Functions */}
        <button onClick={() => handleScientificFunction('sin')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">sin</button>
        <button onClick={() => handleScientificFunction('cos')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">cos</button>
        <button onClick={() => handleScientificFunction('tan')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">tan</button>
        <button onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">{angleMode}</button>
        <button onClick={handleClear} className="bg-red-600 hover:bg-red-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">AC</button>

        {/* Row 2 */}
        <button onClick={() => handleScientificFunction('ln')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">ln</button>
        <button onClick={() => handleScientificFunction('log')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">log</button>
        <button onClick={() => handleScientificFunction('sqrt')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">√</button>
        <button onClick={() => handleOperation('^')} className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">x^y</button>
        <button onClick={() => handleOperation('÷')} className={`${operation === '÷' ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-500'} text-white rounded-xl p-3 text-lg font-medium transition-all active:scale-95`}>÷</button>

        {/* Row 3 */}
        <button onClick={() => handleScientificFunction('x²')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">x²</button>
        <button onClick={() => handleScientificFunction('1/x')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">1/x</button>
        <button onClick={() => handleScientificFunction('!')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">x!</button>
        <button onClick={() => handleNumber(7)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">7</button>
        <button onClick={() => handleNumber(8)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">8</button>

        {/* Row 4 */}
        <button onClick={() => handleScientificFunction('π')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">π</button>
        <button onClick={() => handleScientificFunction('e')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 text-sm font-medium transition-all active:scale-95">e</button>
        <button onClick={() => handleOperation('×')} className={`${operation === '×' ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-500'} text-white rounded-xl p-3 text-lg font-medium transition-all active:scale-95`}>×</button>
        <button onClick={() => handleNumber(4)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">4</button>
        <button onClick={() => handleNumber(5)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">5</button>

        {/* Row 5 */}
        <button onClick={() => handleNumber(9)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">9</button>
        <button onClick={() => handleOperation('-')} className={`${operation === '-' ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-500'} text-white rounded-xl p-3 text-lg font-medium transition-all active:scale-95`}>−</button>
        <button onClick={() => handleNumber(6)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">6</button>
        <button onClick={() => handleNumber(1)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">1</button>
        <button onClick={() => handleNumber(2)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">2</button>

        {/* Row 6 */}
        <button onClick={() => handleOperation('+')} className={`${operation === '+' ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-500'} text-white rounded-xl p-3 text-lg font-medium transition-all active:scale-95`}>+</button>
        <button onClick={() => handleNumber(3)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">3</button>
        <button onClick={() => handleNumber(0)} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95 col-span-2">0</button>
        <button onClick={handleDecimal} className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 text-lg font-light transition-all active:scale-95">.</button>

        {/* Row 7 */}
        <button onClick={handleEquals} className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl p-3 text-lg font-medium transition-all active:scale-95 col-span-5">=</button>
      </div>
    </div>
  )
}

// Mortgage Calculator Component
function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const [totalInterest, setTotalInterest] = useState(null)

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate) / 100
    const monthlyRate = annualRate / 12
    const numberOfPayments = parseFloat(loanTerm) * 12

    if (principal && annualRate && numberOfPayments) {
      // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
      const monthly = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      
      const total = monthly * numberOfPayments
      const interest = total - principal

      setMonthlyPayment(monthly.toFixed(2))
      setTotalPayment(total.toFixed(2))
      setTotalInterest(interest.toFixed(2))
    }
  }

  const handleClear = () => {
    setLoanAmount('')
    setInterestRate('')
    setLoanTerm('')
    setMonthlyPayment(null)
    setTotalPayment(null)
    setTotalInterest(null)
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Mortgage Calculator</h2>
      
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="300000"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="3.5"
            step="0.01"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="30"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={calculateMortgage}
          className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Calculate
        </button>
        <button
          onClick={handleClear}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {monthlyPayment && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Monthly Payment</span>
            <span className="text-white text-2xl font-bold">${parseFloat(monthlyPayment).toLocaleString()}</span>
          </div>
          <div className="border-t border-slate-700/50 pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Total Payment</span>
              <span className="text-emerald-400 text-lg font-semibold">${parseFloat(totalPayment).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Interest</span>
              <span className="text-orange-400 text-lg font-semibold">${parseFloat(totalInterest).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {!monthlyPayment && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 text-center">
          <p className="text-slate-500 text-sm">Enter loan details and click Calculate</p>
        </div>
      )}
    </div>
  )
}

// Age Calculator Component
function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [ageResult, setAgeResult] = useState(null)

  const calculateAge = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const target = targetDate ? new Date(targetDate) : new Date()

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    // Adjust for negative days
    if (days < 0) {
      months--
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }

    // Adjust for negative months
    if (months < 0) {
      years--
      months += 12
    }

    // Calculate total days
    const totalDays = Math.floor((target - birth) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months

    // Calculate next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1)
    }
    const daysToNextBirthday = Math.floor((nextBirthday - target) / (1000 * 60 * 60 * 24))

    setAgeResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      daysToNextBirthday,
      nextBirthdayYear: nextBirthday.getFullYear()
    })
  }

  const handleClear = () => {
    setBirthDate('')
    setTargetDate('')
    setAgeResult(null)
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Age Calculator</h2>
      
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Calculate Age On (Optional)</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            placeholder="Leave empty for today"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          <p className="text-slate-500 text-xs mt-1">Leave empty to calculate age as of today</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={calculateAge}
          className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Calculate
        </button>
        <button
          onClick={handleClear}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {ageResult && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 space-y-4">
          {/* Main Age Display */}
          <div className="text-center pb-4 border-b border-slate-700/50">
            <div className="text-white text-4xl font-bold mb-2">
              {ageResult.years} <span className="text-2xl font-normal text-slate-400">years</span>
            </div>
            <div className="text-slate-300 text-lg">
              {ageResult.months} months, {ageResult.days} days
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Months</span>
              <span className="text-emerald-400 font-semibold">{ageResult.totalMonths.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Weeks</span>
              <span className="text-blue-400 font-semibold">{ageResult.totalWeeks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Days</span>
              <span className="text-purple-400 font-semibold">{ageResult.totalDays.toLocaleString()}</span>
            </div>
          </div>

          {/* Next Birthday */}
          <div className="pt-4 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-sm mb-1">Next Birthday</p>
            <p className="text-orange-400 font-semibold text-lg">
              {ageResult.daysToNextBirthday} days ({ageResult.nextBirthdayYear})
            </p>
          </div>
        </div>
      )}

      {!ageResult && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 text-center">
          <p className="text-slate-500 text-sm">Enter your birth date and click Calculate</p>
        </div>
      )}
    </div>
  )
}

// Temperature Converter Component
function TemperatureConverter() {
  const [celsius, setCelsius] = useState('')
  const [fahrenheit, setFahrenheit] = useState('')
  const [kelvin, setKelvin] = useState('')

  const handleCelsiusChange = (value) => {
    setCelsius(value)
    if (value === '') {
      setFahrenheit('')
      setKelvin('')
      return
    }
    const c = parseFloat(value)
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2))
      setKelvin((c + 273.15).toFixed(2))
    }
  }

  const handleFahrenheitChange = (value) => {
    setFahrenheit(value)
    if (value === '') {
      setCelsius('')
      setKelvin('')
      return
    }
    const f = parseFloat(value)
    if (!isNaN(f)) {
      const c = (f - 32) * 5/9
      setCelsius(c.toFixed(2))
      setKelvin((c + 273.15).toFixed(2))
    }
  }

  const handleKelvinChange = (value) => {
    setKelvin(value)
    if (value === '') {
      setCelsius('')
      setFahrenheit('')
      return
    }
    const k = parseFloat(value)
    if (!isNaN(k)) {
      const c = k - 273.15
      setCelsius(c.toFixed(2))
      setFahrenheit(((c * 9/5) + 32).toFixed(2))
    }
  }

  const handleClear = () => {
    setCelsius('')
    setFahrenheit('')
    setKelvin('')
  }

  const quickConversions = [
    { label: 'Freezing Point', c: 0, f: 32, k: 273.15 },
    { label: 'Room Temp', c: 20, f: 68, k: 293.15 },
    { label: 'Body Temp', c: 37, f: 98.6, k: 310.15 },
    { label: 'Boiling Point', c: 100, f: 212, k: 373.15 }
  ]

  const setQuickTemp = (temp) => {
    setCelsius(temp.c.toString())
    setFahrenheit(temp.f.toString())
    setKelvin(temp.k.toString())
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Temperature Converter</h2>
      
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Celsius (°C)</label>
          <input
            type="number"
            value={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
            placeholder="0"
            step="0.01"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Fahrenheit (°F)</label>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => handleFahrenheitChange(e.target.value)}
            placeholder="32"
            step="0.01"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">Kelvin (K)</label>
          <input
            type="number"
            value={kelvin}
            onChange={(e) => handleKelvinChange(e.target.value)}
            placeholder="273.15"
            step="0.01"
            className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="w-full bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg mb-6"
      >
        Clear All
      </button>

      {/* Quick Conversions */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700/30">
        <p className="text-slate-400 text-sm mb-3 font-medium">Quick Conversions</p>
        <div className="grid grid-cols-2 gap-2">
          {quickConversions.map((temp, index) => (
            <button
              key={index}
              onClick={() => setQuickTemp(temp)}
              className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg p-3 text-sm transition-all active:scale-95"
            >
              <div className="font-semibold">{temp.label}</div>
              <div className="text-xs text-slate-400 mt-1">{temp.c}°C / {temp.f}°F</div>
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Info */}
      {(celsius || fahrenheit || kelvin) && (
        <div className="mt-4 bg-slate-900/80 rounded-2xl p-4 border border-slate-700/30">
          <p className="text-slate-400 text-xs text-center">
            Enter a value in any unit to convert automatically
          </p>
        </div>
      )}
    </div>
  )
}

// Currency Converter Component
function CurrencyConverter() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState(null)
  const [rate, setRate] = useState(null)

  // Common exchange rates (base: USD) - these are approximate
  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.36,
    AUD: 1.53,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    MXN: 17.08,
    BRL: 4.97,
    ZAR: 18.45,
    KRW: 1320.50,
    SGD: 1.34,
    NZD: 1.64,
    HKD: 7.83,
    SEK: 10.42,
    NOK: 10.68,
    DKK: 6.87,
    RUB: 92.50
  }

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }
  ]

  const convertCurrency = () => {
    if (!amount || amount === '') {
      setResult(null)
      setRate(null)
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum)) return

    // Convert to USD first, then to target currency
    const amountInUSD = amountNum / exchangeRates[fromCurrency]
    const convertedAmount = amountInUSD * exchangeRates[toCurrency]
    const exchangeRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]

    setResult(convertedAmount.toFixed(2))
    setRate(exchangeRate.toFixed(4))
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
    setRate(null)
  }

  const handleClear = () => {
    setAmount('')
    setResult(null)
    setRate(null)
  }

  const quickAmounts = [100, 500, 1000, 5000]

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Currency Converter</h2>
      
      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-slate-300 text-sm font-medium mb-2 block">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
          step="0.01"
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt.toString())}
            className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg p-2 text-sm transition-all active:scale-95"
          >
            {amt}
          </button>
        ))}
      </div>

      {/* From Currency */}
      <div className="mb-4">
        <label className="text-slate-300 text-sm font-medium mb-2 block">From</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-emerald-500 transition-colors"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleSwapCurrencies}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 transition-all active:scale-95 shadow-lg"
          title="Swap currencies"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      {/* To Currency */}
      <div className="mb-6">
        <label className="text-slate-300 text-sm font-medium mb-2 block">To</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-emerald-500 transition-colors"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={convertCurrency}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Convert
        </button>
        <button
          onClick={handleClear}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Clear
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 space-y-3">
          <div className="text-center">
            <div className="text-slate-400 text-sm mb-2">Converted Amount</div>
            <div className="text-white text-3xl font-bold mb-1">
              {parseFloat(result).toLocaleString()} {toCurrency}
            </div>
            <div className="text-slate-400 text-sm">
              {parseFloat(amount).toLocaleString()} {fromCurrency}
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-3 text-center">
            <div className="text-slate-400 text-xs mb-1">Exchange Rate</div>
            <div className="text-emerald-400 font-semibold">
              1 {fromCurrency} = {rate} {toCurrency}
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 text-center">
          <p className="text-slate-500 text-sm">Enter amount and click Convert</p>
          <p className="text-slate-600 text-xs mt-2">Rates are approximate</p>
        </div>
      )}
    </div>
  )
}

// Unit Converter Component
function UnitConverter() {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('feet')
  const [result, setResult] = useState(null)

  const unitCategories = {
    length: {
      name: 'Length',
      units: {
        meter: { name: 'Meter', symbol: 'm', toBase: 1 },
        kilometer: { name: 'Kilometer', symbol: 'km', toBase: 1000 },
        centimeter: { name: 'Centimeter', symbol: 'cm', toBase: 0.01 },
        millimeter: { name: 'Millimeter', symbol: 'mm', toBase: 0.001 },
        mile: { name: 'Mile', symbol: 'mi', toBase: 1609.344 },
        yard: { name: 'Yard', symbol: 'yd', toBase: 0.9144 },
        feet: { name: 'Foot', symbol: 'ft', toBase: 0.3048 },
        inch: { name: 'Inch', symbol: 'in', toBase: 0.0254 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilogram: { name: 'Kilogram', symbol: 'kg', toBase: 1 },
        gram: { name: 'Gram', symbol: 'g', toBase: 0.001 },
        milligram: { name: 'Milligram', symbol: 'mg', toBase: 0.000001 },
        ton: { name: 'Metric Ton', symbol: 't', toBase: 1000 },
        pound: { name: 'Pound', symbol: 'lb', toBase: 0.453592 },
        ounce: { name: 'Ounce', symbol: 'oz', toBase: 0.0283495 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liter: { name: 'Liter', symbol: 'L', toBase: 1 },
        milliliter: { name: 'Milliliter', symbol: 'mL', toBase: 0.001 },
        gallon: { name: 'Gallon (US)', symbol: 'gal', toBase: 3.78541 },
        quart: { name: 'Quart (US)', symbol: 'qt', toBase: 0.946353 },
        pint: { name: 'Pint (US)', symbol: 'pt', toBase: 0.473176 },
        cup: { name: 'Cup (US)', symbol: 'cup', toBase: 0.236588 },
        fluidOunce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: 0.0295735 }
      }
    },
    area: {
      name: 'Area',
      units: {
        squareMeter: { name: 'Square Meter', symbol: 'm²', toBase: 1 },
        squareKilometer: { name: 'Square Kilometer', symbol: 'km²', toBase: 1000000 },
        squareCentimeter: { name: 'Square Centimeter', symbol: 'cm²', toBase: 0.0001 },
        hectare: { name: 'Hectare', symbol: 'ha', toBase: 10000 },
        acre: { name: 'Acre', symbol: 'ac', toBase: 4046.86 },
        squareMile: { name: 'Square Mile', symbol: 'mi²', toBase: 2589988 },
        squareYard: { name: 'Square Yard', symbol: 'yd²', toBase: 0.836127 },
        squareFeet: { name: 'Square Foot', symbol: 'ft²', toBase: 0.092903 }
      }
    },
    speed: {
      name: 'Speed',
      units: {
        meterPerSecond: { name: 'Meter/Second', symbol: 'm/s', toBase: 1 },
        kilometerPerHour: { name: 'Kilometer/Hour', symbol: 'km/h', toBase: 0.277778 },
        milePerHour: { name: 'Mile/Hour', symbol: 'mph', toBase: 0.44704 },
        knot: { name: 'Knot', symbol: 'kn', toBase: 0.514444 }
      }
    },
    time: {
      name: 'Time',
      units: {
        second: { name: 'Second', symbol: 's', toBase: 1 },
        minute: { name: 'Minute', symbol: 'min', toBase: 60 },
        hour: { name: 'Hour', symbol: 'h', toBase: 3600 },
        day: { name: 'Day', symbol: 'd', toBase: 86400 },
        week: { name: 'Week', symbol: 'wk', toBase: 604800 },
        month: { name: 'Month (30 days)', symbol: 'mo', toBase: 2592000 },
        year: { name: 'Year (365 days)', symbol: 'yr', toBase: 31536000 }
      }
    }
  }

  const convertUnits = () => {
    if (!amount || amount === '') {
      setResult(null)
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum)) return

    const currentCategory = unitCategories[category]
    const fromUnitData = currentCategory.units[fromUnit]
    const toUnitData = currentCategory.units[toUnit]

    // Convert to base unit first, then to target unit
    const baseValue = amountNum * fromUnitData.toBase
    const convertedValue = baseValue / toUnitData.toBase

    setResult(convertedValue.toFixed(6))
  }

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    const firstUnit = Object.keys(unitCategories[newCategory].units)[0]
    const secondUnit = Object.keys(unitCategories[newCategory].units)[1]
    setFromUnit(firstUnit)
    setToUnit(secondUnit)
    setResult(null)
  }

  const handleSwapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult(null)
  }

  const handleClear = () => {
    setAmount('')
    setResult(null)
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-700/50">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Unit Converter</h2>
      
      {/* Category Selector */}
      <div className="mb-4">
        <label className="text-slate-300 text-sm font-medium mb-2 block">Category</label>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-cyan-500 transition-colors"
        >
          {Object.keys(unitCategories).map((cat) => (
            <option key={cat} value={cat}>
              {unitCategories[cat].name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-slate-300 text-sm font-medium mb-2 block">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1"
          step="0.01"
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* From Unit */}
      <div className="mb-4">
        <label className="text-slate-300 text-sm font-medium mb-2 block">From</label>
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-cyan-500 transition-colors"
        >
          {Object.keys(unitCategories[category].units).map((unit) => (
            <option key={unit} value={unit}>
              {unitCategories[category].units[unit].name} ({unitCategories[category].units[unit].symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleSwapUnits}
          className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-full p-3 transition-all active:scale-95 shadow-lg"
          title="Swap units"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      {/* To Unit */}
      <div className="mb-6">
        <label className="text-slate-300 text-sm font-medium mb-2 block">To</label>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-cyan-500 transition-colors"
        >
          {Object.keys(unitCategories[category].units).map((unit) => (
            <option key={unit} value={unit}>
              {unitCategories[category].units[unit].name} ({unitCategories[category].units[unit].symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={convertUnits}
          className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Convert
        </button>
        <button
          onClick={handleClear}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 text-lg font-medium transition-all active:scale-95 shadow-lg"
        >
          Clear
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 space-y-3">
          <div className="text-center">
            <div className="text-slate-400 text-sm mb-2">Result</div>
            <div className="text-white text-3xl font-bold mb-1">
              {parseFloat(result).toLocaleString()} {unitCategories[category].units[toUnit].symbol}
            </div>
            <div className="text-slate-400 text-sm">
              {parseFloat(amount).toLocaleString()} {unitCategories[category].units[fromUnit].symbol}
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/30 text-center">
          <p className="text-slate-500 text-sm">Select category, enter amount, and click Convert</p>
        </div>
      )}
    </div>
  )
}

// Main Component with Single Calculator Selection
export default function DualCalculator() {
  const [selectedCalculator, setSelectedCalculator] = useState('scientific')

  const calculatorTypes = {
    scientific: { name: 'Scientific Calculator', component: ScientificCalculator },
    mortgage: { name: 'Mortgage Calculator', component: MortgageCalculator },
    age: { name: 'Age Calculator', component: AgeCalculator },
    temperature: { name: 'Temperature Converter', component: TemperatureConverter },
    currency: { name: 'Currency Converter', component: CurrencyConverter },
    unit: { name: 'Unit Converter', component: UnitConverter }
  }

  const calculatorKeys = Object.keys(calculatorTypes)
  const CalculatorComponent = calculatorTypes[selectedCalculator].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">Calculator Suite</h1>
        
        {/* Calculator Selector Dropdown */}
        <div className="mb-6">
          <select
            value={selectedCalculator}
            onChange={(e) => setSelectedCalculator(e.target.value)}
            className="w-full bg-slate-700/80 border border-slate-600/50 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors shadow-lg"
          >
            {Object.keys(calculatorTypes).map((type) => (
              <option key={type} value={type}>
                {calculatorTypes[type].name}
              </option>
            ))}
          </select>
        </div>

        {/* Calculator Display */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <CalculatorComponent />
          </div>
        </div>

        {/* Quick Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {calculatorKeys.map((key, index) => (
            <button
              key={key}
              onClick={() => setSelectedCalculator(key)}
              className={`w-3 h-3 rounded-full transition-all ${
                selectedCalculator === key
                  ? 'bg-purple-500 w-8'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              title={calculatorTypes[key].name}
            />
          ))}
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Select a calculator from the dropdown or click the dots below
          </p>
        </div>
      </div>
    </div>
  )
}

