import StepItem from './StepItem';

export default function ResultCard({ result }) {
    if (!result) return null;

    const isMissionSwitched = result.message?.includes('MISSION SWITCHED');
    const noService = result.message === 'Service not found';

    return (
        <div className="mt-8 animate-slide-up">
            {/* Outer glow */}
            <div className={`absolute -inset-[1px] rounded-2xl blur-sm opacity-40 ${isMissionSwitched ? 'bg-gradient-to-r from-amber-500/20 via-red-500/20 to-rose-500/20' : 'bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-indigo-500/20'}`}></div>

            <div className="relative glass rounded-2xl p-6 sm:p-8 space-y-5">
                {/* Status badge */}
                {isMissionSwitched && (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-red-400 font-bold text-sm tracking-wide uppercase">Mission Switched</span>
                        </div>
                    </div>
                )}

                {noService && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                        </svg>
                        <span className="text-amber-400 font-semibold text-sm">Service Not Recognized</span>
                    </div>
                )}

                {/* Message */}
                <p className="text-slate-300 leading-relaxed">
                    {result.message?.replace('MISSION SWITCHED\n', '')}
                </p>

                {/* Steps Section */}
                {result.steps && result.steps.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 pt-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
                            <h3 className="text-blue-300 font-semibold text-sm tracking-wider uppercase flex items-center gap-2 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                Required Steps
                            </h3>
                            <div className="h-px flex-1 bg-gradient-to-l from-blue-500/30 to-transparent"></div>
                        </div>

                        <div className="space-y-2">
                            {result.steps.map((step, i) => (
                                <StepItem key={i} index={i + 1} text={step} total={result.steps.length} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
