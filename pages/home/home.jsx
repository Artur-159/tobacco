import { Link } from "react-router-dom";
import { HOME_LIST_DATA } from "../../constant/home";

import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <ul>
        {HOME_LIST_DATA?.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className={styles.inner_block}>
              <span className={styles.top_block}>
                <span className={styles.title_block}>{item.title}</span>
                <span className={styles.description_block}>
                  {item.description}
                </span>
              </span>
              <span className={styles.img_block}>
                <img src={item.img_src} alt={item.alt} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
