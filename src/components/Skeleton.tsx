export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl ${className}`} />
);

export const ListingSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-[2.2rem] p-4 border border-gray-100 dark:border-gray-700">
    <Skeleton className="aspect-square mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);
