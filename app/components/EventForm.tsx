'use client'

import { useState } from 'react'
import { addEventToGoogleCalendar } from '../utils/googleCalendar'

export default function EventForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [type, setType] = useState('daily')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const event = {
        title,
        description,
        startTime,
        endTime,
        type,
      }
      // TODO: Save event to database
      const googleEventId = await addEventToGoogleCalendar(event, 'user_access_token')
      console.log('Event created with Google Calendar ID:', googleEventId)
      // Reset form
      setTitle('')
      setDescription('')
      setStartTime('')
      setEndTime('')
      setType('daily')
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="startTime" className="block mb-2">Start Time</label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block mb-2">End Time</label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block mb-2">Event Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Create Event
      </button>
    </form>
  )
}