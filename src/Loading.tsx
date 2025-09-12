export default function Loading() {
  return (
    <div
      className="text-center p-4 flex items-center justify-center gap-2"
    >
      <span className="text-lg font-medium">Loading Users</span>
      <span className="block w-4 h-4 rounded-full animate-spin border-l-2 border-r-2"></span>
    </div>
  );
}
