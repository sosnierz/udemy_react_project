import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../store/StoreProvider';
import { default as AsideMenuStyle } from './AsideMenu.module.scss';
import AdminMenu from './subcomponents/AdminMenu';
import UserMenu from './subcomponents/UserMenu';


const style = bemCssModules(AsideMenuStyle);

const ADMIN_TYPE = 1

const AsideMenu = () => {
const { user } = useContext(StoreContext);

const adminMenuComponent = user?.accessLevel === ADMIN_TYPE
? <AdminMenu /> : null
   
return (  
        <section className={style()}>
            <UserMenu isUserLogged={Boolean(user)} />
            {adminMenuComponent}
        </section>
    );
}
 
export default AsideMenu;