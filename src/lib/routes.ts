import path from 'path';
import { type Routes } from '@/types';

const routes: Routes[] = [
  { path: path.resolve('src/app/(main)/page'), resolved: '/', priority: 1.0 },
  {
    path: path.resolve('src/app/(main)/feedback/page'),
    resolved: '/feedback',
    priority: 0.8,
  },
];

export default routes;
