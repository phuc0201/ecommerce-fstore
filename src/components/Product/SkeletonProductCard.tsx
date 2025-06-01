const SkeletonProductCard = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-[383px] bg-zinc-200 rounded-2xl"></div>
      <div className="h-4 bg-zinc-200 rounded-full w-1/2"></div>
      <div className="h-4 bg-zinc-200 rounded-full w-3/4"></div>
      <div className="h-4 bg-zinc-200 rounded-full w-1/3"></div>
    </div>
  );
};

export default SkeletonProductCard;
