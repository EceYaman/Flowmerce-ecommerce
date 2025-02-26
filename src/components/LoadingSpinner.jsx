import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}