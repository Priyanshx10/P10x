'use client'

import { useState } from 'react'

export default function HabitForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('daily')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const habit = {
        title,
        description,
        frequency,
      }
      // TODO: Save habit to database
      console.log('Habit created:', habit)
      // Reset form
      setTitle('')
      setDescription('')
      setFrequency('daily')
    } catch (error) {
      console.error('Error creating habit:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Habit</h2>
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
        <label htmlFor="frequency" className="block mb-2">Frequency</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Create Habit
      </button>
    </form>
  )
}