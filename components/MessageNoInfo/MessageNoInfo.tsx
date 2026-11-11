import css from './MessageNoInfo.module.css';

interface MessageNoInfoProps {
  message: string,
  buttonText: string,
  onClick: () => void,
}



export default function MessageNoInfo({message, buttonText, onClick}: MessageNoInfoProps) {
  return (
    <section>
      <div className={css.messageNoInfo}>
        <p className={css.message}>{message}</p>
        <button className={css.buttonText} onClick={onClick} type='button'>{buttonText}</button>
      </div>
    </section>
  )
}