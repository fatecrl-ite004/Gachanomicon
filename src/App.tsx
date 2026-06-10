import { useMemo, useState } from "react";
import "./App.css";

type Game = {
  id: number;
  name: string;
  developer: string;
  genre: string;
  guides: number;
  activeUsers: number;
  characters: number;
  rarity: number;
  status: string;
  accent: string;
  image: string | null;
  blurb: string;
};

const games: Game[] = [
  {
    id: 1,
    name: "Genshin Impact",
    developer: "HoYoverse",
    genre: "Action RPG",
    guides: 124,
    activeUsers: 3421,
    characters: 73,
    rarity: 5,
    status: "Trending",
    accent: "sunset",
    image: null,
    blurb: "Exploração, combate elemental e comunidade gigante.",
  },
  {
    id: 2,
    name: "Honkai: Star Rail",
    developer: "HoYoverse",
    genre: "Turn-Based RPG",
    guides: 98,
    activeUsers: 2104,
    characters: 56,
    rarity: 5,
    status: "Popular",
    accent: "violet",
    image: null,
    blurb: "Combate tático com forte foco em elenco e lore.",
  },
  {
    id: 3,
    name: "Zenless Zone Zero",
    developer: "HoYoverse",
    genre: "Action RPG",
    guides: 57,
    activeUsers: 1203,
    characters: 31,
    rarity: 5,
    status: "New",
    accent: "cyan",
    image: null,
    blurb: "Estilo urbano, combate rápido e identidade forte.",
  },
  {
    id: 4,
    name: "NIKKE",
    developer: "SHIFT UP",
    genre: "Third-Person Shooter",
    guides: 84,
    activeUsers: 1742,
    characters: 88,
    rarity: 5,
    status: "Hot",
    accent: "pink",
    image: null,
    blurb: "Ação intensa, personagens marcantes e coleção pesada.",
  },
  {
    id: 5,
    name: "Blue Archive",
    developer: "Nexon",
    genre: "Strategy RPG",
    guides: 66,
    activeUsers: 1608,
    characters: 114,
    rarity: 4,
    status: "Active",
    accent: "azure",
    image: null,
    blurb: "Tom leve, elenco enorme e muito conteúdo de comunidade.",
  },
  {
    id: 6,
    name: "Arknights",
    developer: "Hypergryph",
    genre: "Tower Defense",
    guides: 91,
    activeUsers: 987,
    characters: 102,
    rarity: 5,
    status: "Classic",
    accent: "amber",
    image: null,
    blurb: "Tática, profundidade e uma base de fãs bem dedicada.",
  },
];

const categories = ["All", "Action RPG", "Turn-Based RPG", "Strategy RPG", "Third-Person Shooter", "Tower Defense"];

const stats = [
  { label: "Jogos catalogados", value: "42" },
  { label: "Guias na comunidade", value: "1.284" },
  { label: "Usuários ativos", value: "18.620" },
];

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredGames = useMemo<Game[]>(() => {
    const q = query.trim().toLowerCase();

    return games.filter((game) => {
      const matchesQuery =
        !q ||
        game.name.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q) ||
        game.genre.toLowerCase().includes(q);

      const matchesCategory = category === "All" || game.genre === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const featured = filteredGames[0] ?? games[0];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand">GACHANOMICON</div>
          <p className="brand-subtitle">
            Banco de dados, guias e comunidades com alma de banner de gacha.
          </p>
        </div>

        <div className="topbar-actions">
          <div className="pill">Beta / TCC</div>
          <div className="pill pill-glow">Community-powered</div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">Coleção. Guias. Comunidade.</span>
          <h1>
            Um catálogo de gachas com cara de
            <span> tela de summon</span>.
          </h1>
          <p className="hero-text">
            A proposta é organizar jogos, guias e atividade da comunidade em uma
            experiência visual que já fala a língua do público.
          </p>

          <div className="hero-stats">
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`featured-card accent-${featured.accent}`}>
          <div className="featured-badge">{featured.status}</div>
          <div className="featured-art">
            <div className="art-glow" />
            <div className="art-banner">
              <span>{featured.rarity}★</span>
              <strong>{featured.name}</strong>
              <p>{featured.genre}</p>
            </div>
          </div>

          <div className="featured-meta">
            <div>
              <span>Desenvolvedora</span>
              <strong>{featured.developer}</strong>
            </div>
            <div>
              <span>Guias</span>
              <strong>{featured.guides}</strong>
            </div>
            <div>
              <span>Ativos</span>
              <strong>{featured.activeUsers}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h2>Jogos populares</h2>
            <p>Cards com dados falsos para demonstrar a estrutura do produto.</p>
          </div>

          <label className="search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)}
              placeholder="Pesquisar jogo, gênero ou desenvolvedora"
            />
          </label>
        </div>

        <div className="chips">
          {categories.map((item) => (
            <button
              key={item}
              className={`chip ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid">
          {filteredGames.map((game) => (
            <article key={game.id} className={`game-card accent-${game.accent}`}>
              <div className="card-top">
                <div className="card-art">
                  <div className="card-rarity">{game.rarity}★</div>
                  <div className="card-image">
                    {game.image ? (
                      <img src={game.image} alt={game.name} />
                    ) : (
                      <div className="image-placeholder">
                        <span>{game.name.slice(0, 1)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-info">
                  <div className="card-status">{game.status}</div>
                  <h3>{game.name}</h3>
                  <p className="card-blurb">{game.blurb}</p>

                  <div className="meta-row">
                    <span>{game.developer}</span>
                    <span>{game.genre}</span>
                  </div>
                </div>
              </div>

              <div className="card-stats">
                <div>
                  <strong>{game.guides}</strong>
                  <span>Guias</span>
                </div>
                <div>
                  <strong>{game.activeUsers}</strong>
                  <span>Ativos</span>
                </div>
                <div>
                  <strong>{game.characters}</strong>
                  <span>Personagens</span>
                </div>
              </div>

              <div className="card-footer">
                <button type="button" className="ghost-btn">
                  Ver detalhes
                </button>
                <button type="button" className="primary-btn">
                  Abrir comunidade
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;