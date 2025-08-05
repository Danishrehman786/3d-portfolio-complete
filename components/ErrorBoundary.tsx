"use client"

import React, { useState } from "react"

interface Props {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: Props) {
  const [hasError, setHasError] = useState(false)

  React.useEffect(() => {
    const errorHandler = (error: Error, info: React.ErrorInfo) => {
      console.error("Caught an error: ", error, info)
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)
    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-700">Please refresh the page or try again later.</p>
      </div>
    )
  }

  return children
}
