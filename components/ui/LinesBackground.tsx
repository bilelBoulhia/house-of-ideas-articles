'use client'

import {useState, useEffect} from 'react'

export default function LinesBackground() {
    const [dimensions, setDimensions] = useState({width: 0, height: 0})

    useEffect(() => {
        function updateDimensions() {
            setDimensions({width: window.innerWidth, height: window.innerHeight})
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const generateLines = () => {
        const lines = []
        const lineCount = Math.floor(dimensions.width / 100)

        for (let i = 0; i < lineCount; i++) {
            const x1 = (i / lineCount) * dimensions.width
            const y1 = 0
            const x2 = ((i + 1) / lineCount) * dimensions.width
            const y2 = dimensions.height

            lines.push(
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="0.1"
                    strokeOpacity="1"
                >
                    <animate
                        attributeName="strokeOpacity"
                        values="0.1;0.2;0.1"
                        dur={`${Math.random() * 5 + 3}s`}
                        repeatCount="indefinite"
                    />
                </line>
            )
        }

        return lines
    }

    return (
        <div className="fixed inset-0 z-[-10]">
            <svg
                className="w-full h-full text-primary"
                width={dimensions.width}
                height={dimensions.height}
                xmlns="http://www.w3.org/2000/svg"
            >
                {generateLines()}
            </svg>
        </div>
    )
}