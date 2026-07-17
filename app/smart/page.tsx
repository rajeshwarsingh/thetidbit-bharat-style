import { redirect } from 'next/navigation';

/** Smart is the default home — keep /smart as a friendly alias. */
export default function Page() {
  redirect('/');
}
