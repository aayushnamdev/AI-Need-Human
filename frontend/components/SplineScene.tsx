"use client";

import React, { Suspense, lazy } from 'react';

// Use dynamic import for Spline to avoid SSR issues
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
    scene: string;
    className?: string;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ scene, className }) => {
    return (
        <div className={className}>
            <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center animate-pulse bg-zinc-500/10 border border-dashed border-zinc-500/30">
                    <div className="text-[10px] font-mono uppercase opacity-50 tracking-widest">
                        Initializing_Neural_Link...
                    </div>
                </div>
            }>
                <Spline scene={scene} />
            </Suspense>
        </div>
    );
};
