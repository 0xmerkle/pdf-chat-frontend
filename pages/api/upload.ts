import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = req.body.file as File;
  console.log(file.name)
  res.status(200).json({ name: 'John Doe' })
}
