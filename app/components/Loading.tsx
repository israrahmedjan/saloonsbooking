export default function Loading() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-secondary opacity-30"></div>

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-secondary"></div>
      </div>

      <p className="animate-pulse text-lg font-medium text-primary">
        Please wait...
      </p>
    </div>
  );
}