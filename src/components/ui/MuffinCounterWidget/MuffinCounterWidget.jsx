import { useMuffinCounter } from '../../../hooks/useMuffinCounter';
import muffinIcon from '../../../assets/icons/iconmuffin.png' // ajustar al import real del ícono del logo
import styles from './MuffinCounterWidget.module.css';

export default function MuffinCounterWidget() {
  const { count, visible, bumping } = useMuffinCounter();

  return (
    <div
      className={`${styles.widget} ${visible ? styles.visible : styles.hidden} ${bumping ? styles.bumping : ''}`}
      aria-live="polite"
    >
       <img src={muffinIcon} alt="" className={styles.icon} />
      <span className={styles.badge}>{count.toLocaleString('es-AR')}</span>
    </div>
  );
}