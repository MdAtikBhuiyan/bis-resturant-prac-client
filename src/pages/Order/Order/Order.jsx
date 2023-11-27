import { useState } from 'react';
import orderBg from '../../../assets/order/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../../components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const Order = () => {


    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams()

    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category.toLowerCase() === 'dessert');
    const soup = menu.filter(item => item.category.toLowerCase() === 'soup');
    const salad = menu.filter(item => item.category.toLowerCase() === 'salad');
    const pizza = menu.filter(item => item.category.toLowerCase() === 'pizza');
    const drinks = menu.filter(item => item.category.toLowerCase() === 'drinks');

    return (
        <div>

            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>

            <Cover bgImg={orderBg} title={"order food"} />

            <Tabs className={'mt-8'} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>

                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>

                </TabList>

                <TabPanel>
                    <OrderTab items={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default Order;