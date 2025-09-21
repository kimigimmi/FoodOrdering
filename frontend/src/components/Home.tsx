import "../styles/Home.css";

export const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__overlay">
          <div className="hero__container">
            <h1 className="hero__title">
              Welcome to <span>Burger Palace</span>
            </h1>
            <p className="hero__subtitle">
              Delicious burgers, fresh ingredients, and unforgettable taste!
            </p>

            <div className="hero__cta">
              <a href="/menu" className="btn btn--primary">Order Now</a>
              <a href="/menu" className="btn btn--outline">View Menu</a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features__grid">
          <article className="card">
            <h3 className="card__title">Fresh Ingredients</h3>
            <p className="card__text">
              We use only the freshest ingredients for our burgers.
            </p>
          </article>

          <article className="card">
            <h3 className="card__title">Fast Delivery</h3>
            <p className="card__text">
              Get your burgers delivered hot and fresh to your door.
            </p>
          </article>

          <article className="card">
            <h3 className="card__title">Affordable Prices</h3>
            <p className="card__text">
              Delicious food at prices that won't break the bank.
            </p>
          </article>
        </div>
      </section>
    </>
  );
};
