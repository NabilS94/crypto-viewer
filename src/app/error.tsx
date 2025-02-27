'use client'; // Error boundaries must be Client Components

import { Button } from '@heroui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import pic from '../../public/images/error-illustration.jpg';

const Error = ({ error }: { error: Error & { digest?: string }; reset: () => void }) => {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col mx-auto text-white items-center my-14">
      <Image src={pic} alt="website error" width={250} height={250} loading="lazy" />
      <h1 className="text-4xl font-bold mb-4">Ooups something went wrong!</h1>
      <p className="mb-4">Try to refresh the page or try again later</p>
      <Button
        className="bg-white text-navy-900 px-4 py-2 rounded-xl mt-2"
        onPress={() => router.replace('/')}
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Error;
