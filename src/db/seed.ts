import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions) //apaga todas as métas completas
  await db.delete(goals) // apga as metas

  await db.insert(goals).values([
    { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
    { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
    { title: 'Meditar', desiredWeeklyFrequency: 1 },
  ])
}

// fecha a conexão com o banco após executar a query
seed().finally(() => {
  client.end()
})
