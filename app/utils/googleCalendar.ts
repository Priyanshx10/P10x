import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export async function addEventToGoogleCalendar(event: any, accessToken: string) {
  oauth2Client.setCredentials({ access_token: accessToken })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  const { data } = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.startTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: event.endTime,
        timeZone: 'UTC',
      },
    },
  })

  return data.id
}