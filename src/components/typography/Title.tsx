interface Props {
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
  icon?: string;
}

function Title({ title, titleAccent, icon }: Props) {
  return (
    <h1>
      {title}
      {titleAccent && <span> {titleAccent}</span>}
      {icon && <img
          src={icon}
          alt={'icon'}
          className="icon"
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: '8px'
          }}/> }
      {/* {hintMessage && <icon>{titleAccent}</icon>} */}
    </h1>
  );
}

export default Title;
