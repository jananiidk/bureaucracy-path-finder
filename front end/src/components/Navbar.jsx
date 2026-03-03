export default function Navbar() {
    return (
        <nav className="relative w-full py-4 px-8 glass border-b border-white/5 z-50">
            {/* Accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Logo icon */}
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6M4.5 10.5v8.25a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V10.5" />
                            </svg>
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0e1a] animate-pulse"></div>
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            Bureaucracy Pathfinder
                        </h1>
                        <p className="text-xs text-blue-400/70 font-medium tracking-widest uppercase">
                            AI-Powered Government Navigator
                        </p>
                    </div>
                </div>

                {/* Status badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-light text-xs text-blue-300">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    System Online
                </div>
            </div>
        </nav>
    );
}
