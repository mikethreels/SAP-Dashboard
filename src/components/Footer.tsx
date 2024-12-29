const Footer = () => {
  return (
    <footer>
      <div style={styles.container}>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div style={styles.links}>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
  },
  container: {
    width: "90%",
    margin: "0 auto",
  },
  links: {
    marginTop: "10px",
  },
};

export default Footer;
