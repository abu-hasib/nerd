interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
} 
export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="inline-flex mt-2 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:bg-blue-500"
      {...props}
    >
      {children}
    </button>
  );
}
