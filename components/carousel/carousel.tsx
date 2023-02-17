import { ReactNode, useEffect, useState } from 'react';

export default function Carousel({ children }: { children: ReactNode | ReactNode[] }) {
  const [variants] = useState([1, 2, 3, 4, 5]);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current + 1 > variants.length ? 1 : current + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [current, variants]);

  return (
    <section className="carousel">
      {/* {
            variants.map((variant, index) => <div key={index} className={`carousel__image carousel__image--${variant} ${index + 1 === current ? 'carousel__image--active' : '' }`}></div>)
        } */}
      <div className={`carousel__image carousel__image--${current}`}>{children}</div>
    </section>
  );
}
