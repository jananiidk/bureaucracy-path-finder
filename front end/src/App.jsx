import { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import InputCard from './components/InputCard';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import NetworkBackground from './components/NetworkBackground';

const API_URL = 'http://127.0.0.1:5000/check';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [speechError, setSpeechError] = useState('');

  const analyzeRequest = async (text) => {
    const input = text || userInput;
    if (!input.trim()) return;

    setResult(null);
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Unable to connect to AI backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    setSpeechError('');

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      analyzeRequest(transcript);
    };

    recognition.onerror = () => {
      setSpeechError('Speech recognition error. Please try again.');
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col relative overflow-hidden">
      <NetworkBackground />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-10 relative z-10 w-full max-w-7xl mx-auto h-full overflow-y-auto">
        <div className="w-full max-w-2xl space-y-2 pb-20 mt-10">
          {/* Hero text */}
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent mb-3 leading-tight drop-shadow-sm">
              Navigate Government Services
            </h2>
            <p className="text-sky-200/80 text-sm sm:text-base max-w-md mx-auto">
              Powered by AI to map service dependencies and guide you through bureaucratic processes
            </p>
          </div>

          <InputCard
            userInput={userInput}
            setUserInput={setUserInput}
            onAnalyze={() => analyzeRequest()}
            onSpeak={handleSpeak}
            loading={loading}
            speechError={speechError}
          />

          {loading && <LoadingSpinner />}

          {error && (
            <div className="mt-6 animate-slide-up">
              <div className="glass rounded-xl p-4 border border-red-500/20 bg-red-500/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-300 font-medium text-sm">Connection Error</p>
                  <p className="text-red-400/70 text-xs">{error}</p>
                </div>
              </div>
            </div>
          )}

          <ResultCard result={result} />

          {/* Footer */}
          <div className="text-center pt-8 pb-4">
            <p className="text-indigo-200/40 text-xs tracking-wider">
              BUILT WITH AI · GOVERNMENT SERVICE DEPENDENCY RESOLVER
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
