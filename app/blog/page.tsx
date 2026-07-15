import { redirect } from 'next/navigation';

/** Old /blog URLs → stories journal. */
export default function BlogRedirectPage() {
  redirect('/stories');
}
