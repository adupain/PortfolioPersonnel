import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = [
    {
      title: 'Portfolio Personnel',
      description: 'Mon site portfolio construit avec Next.js et Prisma.',
      url: 'https://example.com',
      repo: 'https://github.com/monuser/portfolio',
      technologies: 'Next.js,TypeScript,Prisma'
    },
    {
      title: 'Projet API',
      description: 'Une API REST pour gérer des projets.',
      url: null,
      repo: null,
      technologies: 'Node,Express,Postgres'
    }
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }

  await prisma.contactMessage.create({ data: { name: 'Alice', email: 'alice@example.com', message: 'Bonjour !' } })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
