
export default function Blog() {
    return (
        <>
            <div className="container" id="casos">
                <div className="blog-header text-center my-4 my-md-5">
                    <h1>Nuestro Blog</h1>
                    <p className="lead text-muted">
                        Descubre las últimas noticias, promociones especiales y
                        historias fascinantes de El Italiano
                    </p>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4" id="caso1">
                        <div className="card blog-card">
                            <div className="blog-image">
                                <img src="" alt="Sorteo cena gratis" className="card-img-top" />
                                <span className="badge text-bg-primary blog-badge">
                                    Próximamente
                                </span>
                            </div>
                            <div className="card-body blog-content">
                                <h4 className="card-title blog-title">
                                    Proximamente sorteo de cena gratis
                                </h4>
                                <div className="blog-meta text-muted mb-2">
                                    <span className="blog-date">Próximamente</span> |
                                    <span className="blog-author"> El Italiano</span>
                                </div>
                                <p className="card-text blog-excerpt">
                                    En unos días anunciaremos las bases de nuestro concurso.
                                    ¡Una oportunidad única para disfrutar de una cena
                                    completamente gratis en nuestro restaurante!
                                    No te pierdas esta increíble promoción.
                                </p>
                                <button type="button" className="btn btn-primary blog-btn" id="BOT_sorte">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4" id="caso2">
                        <div className="card blog-card">
                            <div className="blog-image">
                                <img src="" alt="Plato Anthony Bourdain" className="card-img-top" />
                                <span className="badge text-bg-danger blog-badge featured-badge">
                                    Destacado
                                </span>
                            </div>
                            <div className="card-body blog-content">
                                <h4 className="card-title blog-title">
                                    El plato mejor calificado por Anthony Bourdain
                                </h4>
                                <div className="blog-meta text-muted mb-2">
                                    <span className="blog-date">Artículo especial</span> |
                                    <span className="blog-author"> El Italiano</span>
                                </div>
                                <p className="card-text blog-excerpt">
                                    Te contamos sobre el plato que enamoró al chef mundialmente
                                    conocido, Anthony Bourdain. Una historia fascinante sobre
                                    tradición culinaria, ingredientes únicos y la pasión por
                                    la auténtica cocina italiana.
                                </p>
                                <button type="button" className="btn btn-primary blog-btn" id="BOT_recal">
                                    Leer Historia
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};