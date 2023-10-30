function Textarea({ ...props }) {
  return (
    <textarea
      rows={1}
      className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      name=""
      id=""
      {...props}
    ></textarea>
  );
}

export default Textarea;
