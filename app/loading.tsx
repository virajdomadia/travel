export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Logo Pulse */}
                <div className="w-16 h-16 mb-4 relative">
                    <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    <div className="absolute inset-2 border-4 border-t-transparent border-r-sky-400 border-b-transparent border-l-transparent rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
                <span className="text-white font-bold tracking-widest text-sm animate-pulse">LOADING</span>
            </div>
        </div>
    );
}
