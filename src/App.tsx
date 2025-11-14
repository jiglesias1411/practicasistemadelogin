import './App.css';

function App() {
  const statusMessages = [
    'Conectando componentes',
    'Sincronizando datos',
    'Aplicando estilos finales',
  ];
  const lastUpdate = new Date().toLocaleString();

  return (
    <main className="app-shell">
      <section className="status-card">
        <p className="eyebrow">José Iglesias Portafolio - Preview</p>
        <h1>Pagina en desarrollo...</h1>
        <p className="lead">
          Estamos preparando una experiencia completamente nueva. Este espacio
          se mantiene activo mientras cerramos pruebas, contenidos y despliegues.
        </p>

        <div className="spinner-wrapper">
          <div className="spinner" role="status" aria-label="Cargando" />
          <div className="pulse" aria-hidden />
        </div>

        <div className="status-list">
          {statusMessages.map((message) => (
            <span key={message} className="status-pill">
              {message}
            </span>
          ))}
        </div>

        <small className="footer-note">Ultima actualizacion: {lastUpdate}</small>
      </section>
    </main>
  );
}

export default App;
