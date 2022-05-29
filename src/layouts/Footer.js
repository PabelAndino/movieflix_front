const Footer = () => {
  let year = new Date()

  return (
    <div className="footer">
      <div className="copyright">
        <p>
          NicaSource © Diseñado &amp; Desarrollado por{" "}
          <a href="mailto:pabelandino@gmail.com" target="_blank">
            Pabel J A
          </a>{" "}
          {year.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
