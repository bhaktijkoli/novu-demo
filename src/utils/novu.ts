import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_API_KEY as string, {
  backendUrl: process.env.NOVU_BACKEND_URL as string
});

export default novu