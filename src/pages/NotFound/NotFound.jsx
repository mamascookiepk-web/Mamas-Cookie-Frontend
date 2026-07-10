import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-heading text-4xl font-bold text-choco-600">404</h1>
      <p className="mt-2 text-choco-500">Page not found.</p>
      <Link to="/">
        <Button className="mt-6">Back Home</Button>
      </Link>
    </div>
  );
}
