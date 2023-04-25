import axios from 'axios'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  console.log('FINGAMES SESSION', session)

  if (session?.userId !== process.env.ADMIN_USER_ID) {
    res.status(401).json({ errorType: 'findGamesSessionError', error: 'Unauthorized' })
  }

  const authToken = req.body.token
  const searchTerm = req.body.searchTerm

  axios({
    url: 'https://api.igdb.com/v4/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${authToken}`,
    },
    data: `
    search "${searchTerm}";
    fields name, id, release_dates.y, url;`,
  })
    .then((response) => {
      console.log('find-games success')
      res.send(response.data)
    })
    .catch((error) => {
      return res.status(500).json({ errorType: 'findGamesError', error })
    })
}
