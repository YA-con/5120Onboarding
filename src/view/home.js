import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css'
import imageOutdoor from '../assets/img2.jpeg'
import home1 from '../assets/home1.jpeg'
import home2 from '../assets/home2.jpeg'

const Home = () => {
    return (
        <div className={styles.main}>
            <h1 className={ `text-center f_bold ${ styles.title }` }> About Us</h1>
            <p className={`text-center ${styles.copywriting}`}>
                This page is dedicated to raising awareness about UV protection and helping people understand how to prevent sunburn and skin damage while outdoors. Whether it’s a sunny or cloudy day, UV radiation can still affect your skin, making proper sun protection essential!
            </p>
            <div className={`just-center ${ styles.link_to }`}>
                <Link to="/uvdata">
                    <button className=''>Get it!</button>
                </Link>
            </div>
            <img className={styles.home_img} src={home1} alt="img home" />

            <h2 className={ `text-center f_bold ${ styles.title }` }> Who Should Be Aware?</h2>
            <p className={`text-center ${styles.copywriting}`}>
                <p> Outdoor Workers – Prolonged sun exposure increases the risk of UV damage.</p>
                <p> Sports Enthusiasts – Runners, cyclists, hikers, and other outdoor athletes need effective sun protection.</p>
                <p> Parents & Children – Young skin is more delicate and requires extra sun care.</p>
                <p> Beauty-Conscious Individuals – Prevent sunspots, pigmentation, and premature aging.</p>
                <p> People with Sensitive Skin – Extra precautions are needed for those prone to UV irritation.</p>
            </p>

            <div className={`just-center ${ styles.link_to }`}>
                <Link to="/uvindex">
                    <button className=''>Get it!</button>
                </Link>
            </div>
            <img className={styles.home_img} src={home2} alt="img home" />

            <p className={ `text-center f_bold ${ styles.title }` }>Outdoor UV exposure</p>
            <p className={ `text-center ${ styles.desc }` }>How to protect yourself from Sun</p>
            <img className={ styles.img_outdoor } src={imageOutdoor} alt="img Uv" />
        </div>
    )
};

export default Home;