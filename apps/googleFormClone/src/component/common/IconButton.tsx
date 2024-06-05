import classMerge from '../../utils/classMerge';

type IconButtonProps = React.ComponentPropsWithRef<'button'>;

const IconButton = ({
  children,
  className,
  type = 'button',
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={classMerge([
        'flex',
        'justify-center',
        'items-center',
        'p-3',
        'rounded-full',
        'hover:bg-gray-100',
        'active:bg-gray-200',
        className,
      ])}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
