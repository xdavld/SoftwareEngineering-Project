import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";





export async function GET(req) {
  try {
    // Parse cookies
    const cookieHeader = req.headers.get("cookie") || ""
    const cookies = parse(cookieHeader)

    const accessToken = cookies.instagram_access_token
    const userId = cookies.instagram_user_id

    if (!accessToken || !userId) {
      return NextResponse.json(
        { error: "Authentication token or user ID missing" },
        { status: 401 }
      )
    }

    // Step 1: Fetch media list
    const mediaResponse = await fetch(
      `https://graph.instagram.com/v21.0/${userId}/media`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )

    if (!mediaResponse.ok) {
      const errorData = await mediaResponse.json()
      console.error("Failed to fetch media list:", errorData)
      return NextResponse.json(
        { error: "Failed to fetch media list", details: errorData },
        { status: mediaResponse.status }
      )
    }

    const mediaList = await mediaResponse.json()

    // Step 2: Fetch details for each unique media ID
    const uniqueMedia = Array.from(
      new Map(mediaList.data.map((media) => [media.id, media])).values()
    )

    const mediaDetailsPromises = uniqueMedia.map(async (media) => {
      try {
        const mediaDetailsResponse = await fetch(
          `https://graph.instagram.com/v21.0/${media.id}?fields=id,media_type,media_url,timestamp,caption`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        if (!mediaDetailsResponse.ok) {
          console.error("Failed to fetch media details:", mediaDetailsResponse)
          return null
        }

        const mediaDetails = await mediaDetailsResponse.json()
        return {
          id: mediaDetails.id,
          media_type: mediaDetails.media_type,
          media_url: mediaDetails.media_url,
          timestamp: mediaDetails.timestamp,
          caption: mediaDetails.caption,
        }
      } catch (err) {
        console.error("Error fetching media details:", err.message)
        return null
      }
    })

    const mediaDetails = await Promise.all(mediaDetailsPromises)

    // Step 3: Filter out any null results
    const validMediaDetails = mediaDetails.filter((media) => media !== null)

    // Step 4: Return the media details
    return NextResponse.json(validMediaDetails, { status: 200 })
  } catch (error) {
    console.error("Internal server error:", error.message)
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    )
  }
}