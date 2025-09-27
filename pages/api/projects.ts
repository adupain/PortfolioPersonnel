import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json(projects)
    }

    if (req.method === 'POST') {
      const { title, description, url, repo, technologies } = req.body
      const project = await prisma.project.create({ data: { title, description, url, repo, technologies } })
      return res.status(201).json(project)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
