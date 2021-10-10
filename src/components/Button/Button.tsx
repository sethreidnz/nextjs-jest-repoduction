import { ReactNode } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  type?: 'primary' | 'secondary' | 'link';
};

export const Button = ({
  children,
  onClick,
  href,
  ariaLabel,
  type = 'primary',
}: ButtonProps) => {
  if (!onClick && !href) {
    throw new Error('You must pass an "href" or "onClick" prop to <Button />');
  }
  const buttonClasses = classNames({
    'leading-4 uppercase items-center hover:no-underline': true,
    'bg-primary hover:opacity-90 text-white rounded-full py-1 px-6':
      type === 'primary',
  });
  if (href) {
    return (
      <Link href={href} passHref>
        <a aria-label={ariaLabel} className={buttonClasses}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        aria-label={ariaLabel}
        className={buttonClasses}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
