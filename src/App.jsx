import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Ração Premium para cães", category: "Cães", type: "Alimentação", price: 89.9, oldPrice: 109.9, tag: "Mais vendido", emoji: "🥣", color: "peach", description: "Nutrição equilibrada para todos os dias." },
  { id: 2, name: "Caminha aconchego", category: "Cães", type: "Conforto", price: 119.9, oldPrice: null, tag: "Conforto", emoji: "🛏️", color: "lavender", description: "Um cantinho macio para descansar." },
  { id: 3, name: "Brinquedo mordedor", category: "Cães", type: "Brinquedos", price: 29.9, oldPrice: 39.9, tag: "Oferta", emoji: "🦴", color: "mint", description: "Diversão e estímulo para seu melhor amigo." },
  { id: 4, name: "Arranhador para gatos", category: "Gatos", type: "Brinquedos", price: 79.9, oldPrice: null, tag: "Favorito dos gatos", emoji: "🐈", color: "yellow", description: "Mais diversão e cuidado com as unhas." },
  { id: 5, name: "Kit potes de alimentação", category: "Cães e gatos", type: "Acessórios", price: 44.9, oldPrice: null, tag: "Prático", emoji: "🍽️", color: "blue", description: "Praticidade na hora de servir." },
  { id: 6, name: "Bolinha interativa", category: "Gatos", type: "Brinquedos", price: 24.9, oldPrice: 32.9, tag: "Oferta", emoji: "🧶", color: "pink", description: "Uma brincadeira nova a cada movimento." },
];

const categories = [
  { name: "Todos", emoji: "🐾" },
  { name: "Cães", emoji: "🐶" },
  { name: "Gatos", emoji: "🐱" },
  { name: "Alimentação", emoji: "🥣" },
  { name: "Brinquedos", emoji: "🎾" },
  { name: "Acessórios", emoji: "🦮" },
];

const money = (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function App() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "Todos" || product.category === category || product.type === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setNotice(product.name + " adicionado ao carrinho!");
    window.setTimeout(() => setNotice(""), 2600);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  return (
    <div className="site-shell">
      <div className="announcement"><span>🐾</span> Um carinho a mais em cada pedido <span className="announcement-dot">•</span> Frete grátis em compras acima de R$ 199 <span>🐾</span></div>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Pata e Companhia - início">
          <span className="brand-mark">🐾</span>
          <span><strong>pata<span>&</span>companhia</strong><small>amor em cada cuidado</small></span>
        </a>
        <nav className="desktop-nav">
          <a href="#inicio">Início</a><a href="#produtos">Produtos</a><a href="#sobre">Nossa loja</a><a href="#beneficios">Por que comprar?</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => { setSearch(e.target.value); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Buscar produtos..." /></label>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">🛒<span>Carrinho</span><b>{cartCount}</b></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span>✦</span> CUIDADO QUE VEM DO CORAÇÃO</div>
            <h1>Seu pet merece<br />um mundo de <em>carinho.</em></h1>
            <p>Encontre tudo para deixar a vida do seu melhor amigo mais feliz, saudável e cheia de momentos especiais.</p>
            <div className="hero-actions"><a className="primary-button" href="#produtos">Explorar produtos <span>→</span></a><a className="text-link" href="#sobre">Conheça nossa loja <span>↗</span></a></div>
            <div className="hero-social-proof"><div className="avatar-stack"><span>🐶</span><span>🐱</span><span>🐰</span></div><div><strong>Feito para quem ama cuidar</strong><small>Carinho em cada detalhe.</small></div></div>
          </div>
          <div className="hero-art">
            <div className="hero-blob"></div>
            <div className="hero-photo"><img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85" alt="Cachorro feliz olhando para a câmera" /></div>
            <div className="floating-note note-top"><span>💛</span><div><strong>Amor de verdade</strong><small>em cada escolha</small></div></div>
            <div className="floating-note note-bottom"><span>🐾</span><div><strong>Seu pet em primeiro lugar</strong><small>sempre!</small></div></div>
            <span className="decor decor-one">✳</span><span className="decor decor-two">✦</span>
          </div>
        </section>

        <section className="trust-strip" id="beneficios">
          <div><span>🚚</span><p><strong>Entrega para você</strong><small>Consulte as condições</small></p></div>
          <div><span>💳</span><p><strong>Pagamento facilitado</strong><small>Praticidade na compra</small></p></div>
          <div><span>💛</span><p><strong>Amor pelos animais</strong><small>Esse é o nosso propósito</small></p></div>
          <div><span>💬</span><p><strong>Atendimento próximo</strong><small>Conte com a gente</small></p></div>
        </section>

        <section className="categories-section">
          <div className="section-heading"><div><span className="eyebrow">ENCONTRE O QUE PRECISA</span><h2>Um mimo para cada <em>patinha.</em></h2></div><p>Explore nossas categorias<br />e encontre o favorito do seu pet.</p></div>
          <div className="category-grid">
            {categories.slice(1).map((item, index) => <button className={"category-card category-" + index} key={item.name} onClick={() => { setCategory(item.name); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}><span>{item.emoji}</span><strong>{item.name}</strong><small>Ver produtos ↗</small></button>)}
          </div>
        </section>

        <section className="products-section" id="produtos">
          <div className="section-heading products-heading"><div><span className="eyebrow">ESCOLHIDOS COM CARINHO</span><h2>Queridinhos dos <em>pets.</em></h2></div><p>Produtos para cuidar, brincar<br />e mimar quem você ama.</p></div>
          <div className="filter-row"><div className="filter-pills">{categories.map((item) => <button key={item.name} className={category === item.name ? "filter-pill active" : "filter-pill"} onClick={() => setCategory(item.name)}>{item.emoji} {item.name}</button>)}</div><span className="result-count">{filtered.length} produtos</span></div>
          {filtered.length ? <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}>
            <div className={"product-visual " + product.color}><span className="product-tag">{product.tag}</span><span className="product-emoji">{product.emoji}</span><button className="favorite" aria-label="Favoritar produto" onClick={() => setNotice("Adicione seus favoritos quando sua conta estiver configurada.")}>♡</button></div>
            <div className="product-info"><span className="product-category">{product.category} · {product.type}</span><h3>{product.name}</h3><p>{product.description}</p><div className="product-buy"><div>{product.oldPrice && <del>{money(product.oldPrice)}</del>}<strong>{money(product.price)}</strong></div><button onClick={() => addToCart(product)} aria-label={"Adicionar " + product.name + " ao carrinho"}>+ <span>Adicionar</span></button></div></div>
          </article>)}</div> : <div className="empty-state">Não encontramos produtos com essa busca. Tente outro termo. 🐾</div>}
          <p className="demo-note">* Catálogo demonstrativo: produtos, preços, estoque e condições precisam ser confirmados antes de publicar a loja.</p>
        </section>

        <section className="love-banner" id="sobre"><div className="love-illustration">🐕<span>♡</span></div><div><span className="eyebrow">MAIS QUE UMA LOJA, UM JEITO DE CUIDAR</span><h2>Porque eles não são só pets.<br /><em>São família.</em></h2><p>Cada brincadeira, cada passeio e cada carinho merece ser especial. Estamos aqui para fazer parte desses momentos.</p><a href="#produtos" className="primary-button">Escolher com carinho <span>→</span></a></div></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">🐾</span><span><strong>pata<span>&</span>companhia</strong><small>amor em cada cuidado</small></span></a><p>Feito com carinho para quem tem patas e muito amor para dar.</p><div className="footer-bottom"><span>© 2026 Pata & Companhia. Projeto demonstrativo.</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">SUA SACOLINHA</span><h2>Carrinho <em>♡</em></h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar carrinho">✕</button></div>
        {cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className={"cart-item-icon " + item.color}>{item.emoji}</div><div className="cart-item-info"><strong>{item.name}</strong><span>{money(item.price)}</span><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)}>−</button><b>{item.quantity}</b><button onClick={() => changeQuantity(item.id, 1)}>+</button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><button className="checkout-button" onClick={() => setNotice("Checkout ainda não configurado. Conecte um meio de pagamento para receber pedidos.")}>Continuar para pagamento →</button><p className="checkout-note">Checkout demonstrativo. Configure um meio de pagamento antes de vender.</p></> : <div className="cart-empty"><span>🛍️</span><h3>Sua sacolinha está vazia</h3><p>Que tal escolher um carinho para seu pet?</p><button className="primary-button" onClick={() => { setCartOpen(false); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}>Ver produtos →</button></div>}
      </aside></div>}
    </div>
  );
}

export default App;
