import classNames from 'classnames';

import { borderClasses } from '../../../styling';

const disabledClasses = 'cursor-not-allowed opacity-50 transition-none';

const buttonSizes = {
  sm: 'py-1 px-2',
  md: 'py-2 px-4',
  lg: 'py-3 px-6',
};

export const GenericButton = ({
  primary = true,
  text,
  disabled,
  loading,
  destructive,
  size = 'md',
  onClick,
} : {
  text: string;
  primary?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  loading?: boolean,
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className='relative inline-block'>
      <button
        onClick={(e) => {
          if (disabled || loading) {
            e.stopPropagation();
            e.preventDefault();

            return;
          };

          if (onClick) {
            onClick(e);
          }
        }}
        className={classNames(
          `text-${size}`,
          'btn rounded-lg font-medium',
          buttonSizes[size],
          borderClasses,
          {
          'bg-primary-500': !destructive && primary,
          'bg-secondary-500': !destructive && !primary,
          'bg-accent-100': destructive,
          },
          disabled ? disabledClasses : 'transition duration-200 ease-in-out transform hover:-translate-y-1',
          loading? 'opacity-50 cursor-wait' : 'cursor-pointer'
      )}
      >{text}</button>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin text-2xl">߷</div>
        </div>
      )}
    </div>
  );
}