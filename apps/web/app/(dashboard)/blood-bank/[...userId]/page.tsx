interface BloodBankDashboardParams {
  params: Promise<{
    userId: string;
  }>;
}

export default async function BloodBankDashboard({ params }: BloodBankDashboardParams) {
  const { userId } = await params;
  return (
    <main>
      Blood Bank for user {userId}
    </main>
  )
}