function Home() {
  return (
    <div>
      <header className="App-header">
        <h1>LearnLab</h1>
        <p>Welcome to My Application. This is a hero section with a background image.</p>
      </header>
      <h1>Home</h1>
      <div id="home_hero">
        <p>Welcome to the home page!</p>
      </div>
      <div id="home_content" className="Horizontal-list">
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <div>
              <p>Content</p>
            </div>
          </li>
          <li>
            <a href="/community">Community</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;