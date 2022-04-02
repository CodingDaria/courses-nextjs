import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
// import styles from './Menu.module.css';

const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  return (
    <div>
      <ul>
        {menu.map((item) => (
          <li key={item._id.secondCategory}>{item._id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
