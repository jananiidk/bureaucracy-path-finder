export default function StepItem({ index, text, total }) {
    const progress = ((index) / total) * 100;

    return (
        <div
            className="group relative animate-slide-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
        >
            <div className="relative glass-light rounded-xl p-4 flex items-center gap-4 hover:bg-slate-700/30 transition-all duration-300 hover:scale-[1.01] cursor-default">
                {/* Step number badge */}
                <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                        <span className="text-white text-sm font-bold">{index}</span>
                    </div>
                </div>

                {/* Step content */}
                <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium capitalize text-sm group-hover:text-white transition-colors">
                        {text.replace(/_/g, ' ')}
                    </p>
                </div>

                {/* Arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>

                {/* Bottom progress indicator */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
}
