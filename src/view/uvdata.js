import React, { useState } from 'react';
import styles from './uvdata.module.css'
import uvLow from '../assets/uvLow.jpeg'
import uvMider from '../assets/uvMider.jpeg'
import uvHeight from '../assets/uvHeight.jpeg'
import uvVeryHigh from '../assets/uvVeryHigh.jpeg'
import uvExtreme from '../assets/uvExtreme.jpeg'
import personal1 from '../assets/personal1.jpeg'
import personal2 from '../assets/personal2.jpeg'
import personal3 from '../assets/personal3.jpeg'
import personal4 from '../assets/personal4.jpeg'
import personal5 from '../assets/personal5.jpeg'

const Uvdata = () => {

    const [uvCurrent, setUvCurrent] = useState(0)

    const handleChooseUvIndex = index => {
        setUvCurrent(index)
    }

    return (
        <main className={styles.main}>
            <section className={`just-center align-end`}>
                <img className={styles.uv_img} src={uvLow} alt='uv low' onClick={() => handleChooseUvIndex(0)} />
                <img className={styles.uv_img} src={uvMider} alt='uv Mider' onClick={() => handleChooseUvIndex(1)} />
                <img className={styles.uv_img} src={uvHeight} alt='uv Height' onClick={() => handleChooseUvIndex(2)} />
                <img className={styles.uv_img} src={uvVeryHigh} alt='uv VeryHigh' onClick={() => handleChooseUvIndex(3)} />
                <img className={styles.uv_img} src={uvExtreme} alt='uv Extreme' onClick={() => handleChooseUvIndex(4)} />
            </section>

            {
                uvCurrent === 0 && (
                    <section className={styles.proposal}>
                        <div className={styles.prop_title}> Low (UV Index 1-2) - No Protection Needed</div>
                        <div className={styles.prop_txt}>
                            <p>• Safe for outdoor activities at any time of the day, as UV radiation is minimal.</p>
                            <p> • If you have sensitive skin, consider wearing sunglasses or applying a low SPF sunscreen (SPF 15-30).</p>
                            <p> • Ideal for outdoor sports, walking, cycling, or other activities.</p>
                        </div>
                        <img className={styles.prop_img} src={personal1} alt='' />
                    </section>
                )
            }

            {
                uvCurrent === 1 && (
                    <section className={styles.proposal}>
                        <div className={styles.prop_title}>Moderate (UV Index 3-5) - Some Protection Required</div>
                        <div className={styles.prop_txt}>
                            <p>
                                • Take precautions between 10:00 AM - 4:00 PM, as UV radiation starts to increase.
                            </p>
                            <p>
                                • Wear sunglasses, a hat, and apply SPF 30+ sunscreen, especially on exposed skin.
                            </p>
                            <p>
                                • If you plan to be outdoors for an extended period, seek shade whenever possible to avoid prolonged sun exposure.
                            </p>
                        </div>
                        <img className={styles.prop_img} src={personal2} alt='' />
                    </section>
                )
            }

            {
                uvCurrent === 2 && (
                    <section className={styles.proposal}>
                        <div className={styles.prop_title}>High (UV Index 6-7) - Protection Essential</div>
                        <div className={styles.prop_txt}>
                            <p>
                                • Apply SPF 50+ sunscreen before going outside and reapply every two hours, especially after sweating or swimming.
                            </p>
                            <p>
                                • Wear a wide-brimmed hat, sunglasses, and long-sleeved clothing to minimize UV exposure.
                            </p>
                            <p>
                                • Avoid outdoor activities between 10:00 AM - 4:00 PM or stay in shaded areas as much as possible.
                            </p>
                        </div>
                        <img className={styles.prop_img} src={personal3} alt='' />
                    </section>
                )
            }

            {
                uvCurrent === 3 && (
                    <section className={styles.proposal}>
                        <div className={styles.prop_title}>Very High (UV Index 8-10) - Extra Protection Needed</div>
                        <div className={styles.prop_txt}>
                            <p>
                                • Limit outdoor exposure, especially between 10:00 AM - 4:00 PM, as UV levels are intense and can cause skin damage quickly.
                            </p>
                            <p>
                                • If you must go outside, wear protective clothing, sunglasses, and SPF 50+ sunscreen.
                            </p>
                            <p>
                                • In open environments like beaches or parks, use an umbrella or stay under shaded areas for additional protection.
                            </p>
                        </div>
                        <img className={styles.prop_img} src={personal4} alt='' />
                    </section>
                )
            }

            {
                uvCurrent === 4 && (
                    <section className={styles.proposal}>
                        <div className={styles.prop_title}>Extreme (UV Index 11+) - Stay Inside</div>
                        <div className={styles.prop_txt}>
                            <p>
                                • Avoid going outdoors, as extreme UV radiation can cause sunburn within minutes.
                            </p>
                            <p>
                                • If outdoor activities are necessary, wear full protective gear: long-sleeved clothing, a hat, sunglasses, and SPF 50+ sunscreen.
                            </p>
                            <p>
                                • Consider indoor activities such as visiting a gym, museum, or shopping mall instead.
                            </p>
                            <p>
                                • Use extra protection like sunscreen sprays, umbrellas, or UV-blocking clothing to reduce exposure.
                            </p>
                        </div>
                        <img className={styles.prop_img} src={personal5} alt='' />
                    </section>
                )
            }
            
        </main>
    )
};

export default Uvdata;