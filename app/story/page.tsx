import { redirect } from 'next/navigation';

/** Legacy journal URL → Stories hub. */
export default function Page() {
  redirect('/stories');
}
