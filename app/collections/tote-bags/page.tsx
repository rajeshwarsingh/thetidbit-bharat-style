import { redirect } from 'next/navigation';

/** Pretty URL for office/tote collection CTAs → filtered collections. */
export default function ToteBagsCollectionRedirectPage() {
  redirect('/collections?filter=office');
}
