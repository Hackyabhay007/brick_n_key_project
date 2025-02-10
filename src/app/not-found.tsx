"use client";

import { Suspense } from 'react';

export default function NotFound() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full h-screen flex items-center justify-center bg-bgColor">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-bgRed mb-4">404</h1>
                    <p className="text-xl">Page not found</p>
                </div>
            </div>
        </Suspense>
    );
}
