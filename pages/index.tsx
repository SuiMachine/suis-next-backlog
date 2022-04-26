/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { getSession, signIn } from 'next-auth/react'

import Nav from '../components/Nav'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../lib/mongo'
import { GameTable } from '../components/GameTable'
import { BacklogTable } from '../components/BacklogTable'

type Props = {
  isAdmin: boolean
  games: Array<Game>
}

export default function Home({ isAdmin, games = [] }: Props) {
  const [viewBacklog, setViewBacklog] = useState(false)

  const playedGames = useMemo(() => games.filter((x) => x.finishedDate), [games])
  const backlogGames = useMemo(() => games.filter((x) => !x.finishedDate && x.notPollable !== 'Ehh...'), [games])

  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      if (e.key === 'å') signIn()
    }) // Should clean this up but fuck next is doing a thing so fuck it for now
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav isAdmin={isAdmin} />

      <main>
        <div className={styles.container}>
          <button onClick={() => setViewBacklog(!viewBacklog)}>Toggle played/backlog</button>
          <h1>{viewBacklog ? 'Backlog' : 'Previously played'}</h1>
          {viewBacklog ? ( // TODO: Clean up this mess
            playedGames.length === 0 ? (
              <h2></h2>
            ) : (
              <BacklogTable games={backlogGames} isAdmin={isAdmin} />
            )
          ) : playedGames.length === 0 ? (
            <h2></h2>
          ) : (
            <GameTable games={playedGames} isAdmin={isAdmin} />
          )}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { res } = ctx
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=900')
  const session = await getSession(ctx)
  const isAdmin = process.env.ADMIN_USER_ID === session?.userId
  const { db } = await connectToDatabase()
  const games = await db
    .collection('games')
    .find({
      /* finishedDate: { $ne: null } */
    })
    .toArray()

  return {
    props: {
      isAdmin,
      games: JSON.parse(JSON.stringify(games)), //What the fuck
    },
  }
}
