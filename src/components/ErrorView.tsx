'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';

type Props = {
  title?: string;
  subtitle?: string;
  illustration?: boolean;
  backButton?: boolean;
  buttonText?: string;
  link?: string;
};

const ErrorView = ({
  title,
  subtitle,
  illustration = false,
  backButton = false,
  buttonText,
  link,
}: Props) => {
  const router = useRouter();
  const hasHistory = useRef(false);
  const [localizedLink, setLocalizedLink] = useState(link);
  const { lang: locale } = useParams();

  const handleClickBack = () => {
    hasHistory.current ? router.back : router.push('/');
  };

  useEffect(() => {
    hasHistory.current = window.history.length > 1;
  }, []);

  return (
    <div className="flex items-center p-24 flex-col text-center">
      <div className="flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6">
        <h4>{title ?? "Une erreur s'est produite 😓"}</h4>
        <span>{subtitle ?? 'Veuillez réessayer plustard !'}</span>
      </div>
      {backButton && localizedLink && (
        <Button onClick={handleClickBack} variant="destructive">
          {buttonText ? buttonText : 'Back To Home'}
        </Button>
      )}
      {illustration && (
        <img
          alt="under-maintenance-illustration"
          src="/images/error.404.png"
          className="object-cover max-is-full bs-auto max-bs-[400px] sm:bs-[400px] md:bs-[450px] lg:max-bs-[500px] mbs-10 md:mbs-14 lg:mbs-20"
        />
      )}
    </div>
  );
};

export default ErrorView;
