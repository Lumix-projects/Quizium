import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    message?: string;
}

export default function LoadingSpinner({ size = 'md', className = '', message }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-8 w-8 border-2',
        md: 'h-12 w-12 border-b-2',
        lg: 'h-16 w-16 border-b-2'
    };

    const containerHeights = {
        sm: 'min-h-[200px]',
        md: 'min-h-[400px]',
        lg: 'min-h-[60vh]'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${containerHeights[size]} ${className}`}>
            <div className={`animate-spin rounded-full ${sizeClasses[size]} border-primary`}></div>
            {message && (
                <p className="mt-4 text-muted-foreground text-sm">{message}</p>
            )}
        </div>
    );
}
