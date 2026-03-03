export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-6 animate-slide-up">
            {/* Orbital spinner */}
            <div className="relative w-20 h-20">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
                {/* Spinning ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>
                {/* Inner ring - counter spin */}
                <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-indigo-400 border-l-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                </div>
            </div>

            <div className="space-y-2 text-center">
                <p className="text-blue-300 font-semibold tracking-wide">Analyzing your eligibility</p>
                <div className="flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>
        </div>
    );
}
