type NoteHeaderProps = {
  heading: string;
  text?: string;
  children?: React.ReactNode;
};

const NoteHeader = ({ heading, text, children }: NoteHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="gap-1 font-raley">
        <h1 className="text-3xl md:text-4xl font-bold">{heading}</h1>
        {text && <p className="text-lg text-gray-500">{text}</p>}
      </div>
      {children}
    </div>
  );
};

export default NoteHeader;
