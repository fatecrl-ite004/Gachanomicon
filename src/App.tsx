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
    genre: "RPG de Ação",
    guides: 124,
    activeUsers: 3421,
    characters: 73,
    rarity: 5,
    status: "Tendência",
    accent: "sunset",
    image: null,
    blurb: "Exploração, combate elemental e comunidade gigante.",
  },
  {
    id: 2,
    name: "Honkai: Star Rail",
    developer: "HoYoverse",
    genre: "RPG de Turnos",
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
    genre: "RPG de Ação",
    guides: 57,
    activeUsers: 1203,
    characters: 31,
    rarity: 5,
    status: "Novo",
    accent: "cyan",
    image: null,
    blurb: "Estilo urbano, combate rápido e identidade forte.",
  },
  {
    id: 4,
    name: "NIKKE",
    developer: "SHIFT UP",
    genre: "Tiro em Terceira Pessoa",
    guides: 84,
    activeUsers: 1742,
    characters: 88,
    rarity: 5,
    status: "Popular",
    accent: "pink",
    image: null,
    blurb: "Ação intensa, personagens marcantes e coleção pesada.",
  },
  {
    id: 5,
    name: "Blue Archive",
    developer: "Nexon",
    genre: "RPG de Estratégia",
    guides: 66,
    activeUsers: 1608,
    characters: 114,
    rarity: 4,
    status: "Ativo",
    accent: "azure",
    image: null,
    blurb: "Tom leve, elenco enorme e muito conteúdo de comunidade.",
  },
  {
    id: 6,
    name: "Arknights",
    developer: "Hypergryph",
    genre: "Defesa de Torres",
    guides: 91,
    activeUsers: 987,
    characters: 102,
    rarity: 5,
    status: "Ativo",
    accent: "amber",
    image: null,
    blurb: "Tática, profundidade e uma base de fãs bem dedicada.",
  },
];

const categories = [
  "Todos",
  "RPG de Ação",
  "RPG de Turnos",
  "RPG de Estratégia",
  "Tiro em Terceira Pessoa",
  "Defesa de Torres",
];

const navItems = ["Início", "Jogos", "Guias", "Eventos", "Comunidade"];

const stats = [
  { label: "Jogos catalogados", value: "42" },
  { label: "Guias na comunidade", value: "1.284" },
  { label: "Usuários ativos", value: "18.620" },
];

const statusClass: Record<string, string> = {
  Tendência: "trending",
  Popular: "popular",
  Novo: "new",
  Ativo: "active",
};

function StarRow({ count }: { count: number }) {
  return (
    <div className="star-row">
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [activeNav, setActiveNav] = useState("Início");

  const filteredGames = useMemo<Game[]>(() => {
    const q = query.trim().toLowerCase();

    return games.filter((game) => {
      const matchesQuery =
        !q ||
        game.name.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q) ||
        game.genre.toLowerCase().includes(q);

      const matchesCategory = category === "Todos" || game.genre === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const featured = filteredGames[0] ?? games[0];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand">GACHANOMICON</div>
          <p className="brand-subtitle">Banco de dados, guias e comunidade.</p>
        </div>

        <div className="topbar-actions">
          <div className="resource-bar">
            <div className="resource-pill cyan">
              <span>Alpha</span>
            </div>
          </div>
          <div className="pill pill-glow">Inscreva-se</div>
        </div>
      </header>

      <nav className="gacha-nav">
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-item ${activeNav === item ? "active" : ""}`}
            onClick={() => setActiveNav(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="section-label">◆ Coleção &middot; Guias &middot; Comunidade</div>
          <h1>
            Tudo de gacha.
            <span>Um só lugar.</span>
          </h1>
          <p className="hero-text">
            Participe da comunidade, crie e avalie guias, e contribua para o
            banco de dados de jogos gacha.
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

        <div className={`featured-card accent-${featured.accent} rarity-${featured.rarity}`}>
          <div className="banner-header">
            <div className="section-label">◆ BANNER ATUAL</div>
            <div className="banner-limited">LIMITADO</div>
          </div>

          <div className="featured-art">
            <div className="art-glow" />
            <div className="art-banner">
              <StarRow count={featured.rarity} />
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

          <div className="banner-pity">
            <span className="pity-label">Pity 43/90</span>
            <div className="pity-bar">
              <div className="pity-fill" style={{ width: "47%" }} />
            </div>
            <span className="pity-label dim">⏱ 28d restantes</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <div className="section-label">◆ BIBLIOTECA</div>
            <h2>Jogos populares</h2>
          </div>

          <label className="search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
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
            <article
              key={game.id}
              className={`game-card accent-${game.accent} rarity-${game.rarity}`}
            >
              <div className="card-top">
                <div className="card-art">
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
                  <div
                    className={`card-status status-${
                      statusClass[game.status] ?? "default"
                    }`}
                  >
                    {game.status}
                  </div>
                  <StarRow count={game.rarity} />
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
                  <span>Jogadores</span>
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
                  Ver guias →
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
