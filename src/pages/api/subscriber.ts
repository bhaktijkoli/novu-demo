import db from '@/utils/db';
import novu from '@/utils/novu';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, company } = req.body;
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        company
      }
    })

    await novu.subscribers.identify(user.id, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      locale: 'en',
      data: { company },
    });

    await novu.trigger('welcome', {
      to: {
        subscriberId: user.id
      },
      payload: {}
    });

    return res.send({ success: true })
  }
  res.status(404).send("Not Found");
}
