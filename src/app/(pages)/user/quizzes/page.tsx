"use client";

import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

export default function page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <FiAlertCircle className="text-6xl text-muted-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Quizzes Coming Soon</h1>
            <p className="text-muted-foreground text-center max-w-md">
                The quizzes feature is currently under development. Check back later!
            </p>
        </div>
    )
}
