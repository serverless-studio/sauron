import classNames from 'classnames';

const ROUTES = {
  HOME: '/',
}

export const Header = () => {
  return (
    <header className="p-4">
        <nav className="container mx-auto flex justify-between items-center">
            {/* Navigation links */}
            <a href={ROUTES.HOME} className="font-bold text-xl leading-[0.8]">
                <img src='/sauron-logo.png' alt='sauron-logo' className={classNames('w-20 border-2 border-black border-width-5 rounded-md')}></img>
            </a>
        </nav>
      </header>
  );
};