interface Props {
  title: string;
  titleAccent?: string;
  hintMessage?: string;
}

function Title({ title, titleAccent }: Props) {
  return (
    <h1>
      {title}
      {titleAccent && <span> {titleAccent}</span>}
      {/* {hintMessage && <icon>{titleAccent}</icon>} */}
    </h1>
  );
}

export default Title;
