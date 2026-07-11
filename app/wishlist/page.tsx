import WishlistPage from '../../components/WishlistPage';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Your Wishlist',
  description: "Bags you've saved on TheTidbit.",
  path: '/wishlist',
  noindex: true,
});

export default function Page() {
  return <WishlistPage />;
}
