import { useState } from 'react';

export default function InputCard({
    userInput,
    setUserInput,
    onAnalyze,
    onSpeak,
    loading,
    speechError,
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative animate-slide-up">
            {/* Outer glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-sm opacity-60"></div>

            <div className="relative glass rounded-2xl p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        Service Lookup
                    </h2>
                    <p className="text-sm text-slate-400">
                        Enter the government service you need assistance with
                    </p>
                </div>

                {/* Input container */}
                <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
                    <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
                    <input
                        id="service-input"
                        type="text"
                        className="relative w-full bg-slate-800/80 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none transition-all duration-300 text-sm"
                        placeholder="e.g., I need to apply for a government pension..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !loading) onAnalyze();
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={loading}
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        id="analyze-btn"
                        onClick={onAnalyze}
                        disabled={loading}
                        className="group relative flex-1 overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {/* Button gradient bg */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:from-blue-500 group-hover:to-indigo-500"></div>
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Analyzing…
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                    Analyze Request
                                </>
                            )}
                        </span>
                    </button>

                    <button
                        id="speak-btn"
                        onClick={onSpeak}
                        disabled={loading}
                        className="group relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-slate-300 border border-slate-600/50 hover:border-blue-500/50 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                            Voice Input
                        </span>
                    </button>
                </div>

                {speechError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {speechError}
                    </div>
                )}
            </div>
        </div>
    );
}
