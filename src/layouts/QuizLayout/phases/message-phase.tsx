export function MessagePhase({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">{message}</p>
    </div>
  );
}
