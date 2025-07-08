interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-20 text-olive/70">
      <p className="text-lg">{message}</p>
    </div>
  );
}
