import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import DashboardContent from '@/components/DashboardContent';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <DashboardContent isAuthenticated={!!session} />;
}
