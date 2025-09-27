"use client"
import React, { useState } from 'react'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Envoi en cours...')
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, technologies })
      })
      if (!res.ok) throw new Error(await res.text())
      setMessage('Projet créé ✔')
      setTitle('')
      setDescription('')
      setTechnologies('')
    } catch (err) {
      setMessage('Erreur: ' + (err instanceof Error ? err.message : ''))
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin - Ajouter un projet</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input value={technologies} onChange={e => setTechnologies(e.target.value)} placeholder="Technologies (CSV)" />
        <button type="submit">Créer</button>
      </form>
      <p>{message}</p>
    </main>
  )
}
