"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Calendar } from "@/components/calendar/calendar-gui"
import { SiteHeader } from "@/components/layouts/site-header"
import { LoadingSpinner } from "@/components/loading-spinner" // Import the spinner

export default function CalendarPage() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const preview = sessionStorage.getItem("previewMode") === "true"

    if (preview) {
      setIsPreviewMode(true)
      setIsLoading(false)
    } else {
      // Check authentication via API
      fetch("/api/instagram/auth/check-auth")
        .then((res) => res.json())
        .then((data) => {
          if (data.isAuthenticated) {
            setIsAuthenticated(true)
          } else {
            router.push("/login")
          }
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Error checking auth:", err)
          setIsLoading(false)
        })
    }
  }, [router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <SiteHeader />
      <Calendar />
    </>
  )
}
