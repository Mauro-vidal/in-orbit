import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions) //apaga todas as métas completas
  await db.delete(goals) // apga as metas

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() }, // completou a meta na primeira semana
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() }, // completou a meta na segunda semana
  ])
}

// fecha a conexão com o banco após executar a query
seed().finally(() => {
  client.end()
})
