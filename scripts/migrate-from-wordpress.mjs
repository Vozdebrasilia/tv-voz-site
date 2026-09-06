#!/usr/bin/env node

/**
 * Migração WordPress -> Supabase
 * Portal TV Voz de Brasília
 *
 * Uso:
 *   1) Preencha SUPABASE_URL e SUPABASE_SERVICE_KEY abaixo,
 *      ou defina as variáveis de ambiente:
 *        SUPABASE_URL=...
 *        SUPABASE_SERVICE_KEY=...
 *
 *   2) Execute:
 *        node scripts/migrate-from-wordpress.mjs
 *
 * Requer Node.js 18+ (fetch nativo).
 */

const WP_BASE_URL =
  process.env.WP_BASE_URL || "https://vozdebrasilia.com.br";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://xxxx.supabase.co";

const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_KEY || "sua-service-role-key";

const COLORS = [
  "#15803d",
  "#b45309",
  "#1d4ed8",
  "#7c3aed",
  "#be123c",
  "#0f766e",
];

function assertConfig() {
  if (
    !SUPABASE_URL ||
    SUPABASE_URL.includes("xxxx.supabase.co") ||
    !SUPABASE_SERVICE_KEY ||
    SUPABASE_SERVICE_KEY.includes("sua-service-role-key")
  ) {
    throw new Error(
      "Preencha SUPABASE_URL e SUPABASE_SERVICE_KEY antes de executar."
    );
  }
}

function decodeHtml(text = "") {
  return String(text)
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html = "") {
  return decodeHtml(
    String(html)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function makeSummary(post) {
  const excerpt = stripHtml(post?.excerpt?.rendered || "");
  if (excerpt) return excerpt.slice(0, 500);

  return stripHtml(post?.content?.rendered || "").slice(0, 500);
}

function extractYoutubeUrl(html = "") {
  const patterns = [
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
    /https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = String(html).match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
  }

  return null;
}

function getFeaturedImage(post) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
      ?.source_url ||
    null
  );
}

function getEmbeddedAuthor(post) {
  return post?._embedded?.author?.[0] || null;
}

function getEmbeddedCategories(post) {
  const groups = post?._embedded?.["wp:term"];
  if (!Array.isArray(groups)) return [];

  return groups
    .flat()
    .filter((term) => term?.taxonomy === "category");
}

function isInterview(post, categoryNames = []) {
  const haystack = [
    post?.title?.rendered,
    post?.content?.rendered,
    post?.excerpt?.rendered,
    ...categoryNames,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    haystack.includes("entrevista") ||
    haystack.includes("entrevistas") ||
    haystack.includes("youtube.com/") ||
    haystack.includes("youtu.be/")
  );
}

async function wpFetch(path) {
  const url = `${WP_BASE_URL.replace(/\/$/, "")}${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "TV-Voz-Migrator/1.0",
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `WordPress ${response.status} em ${url}: ${body.slice(0, 300)}`
    );
  }

  return response;
}

async function fetchAllWp(endpoint, extraParams = {}) {
  const rows = [];
  let page = 1;

  while (true) {
    const params = new URLSearchParams({
      per_page: "100",
      page: String(page),
      ...Object.fromEntries(
        Object.entries(extraParams).map(([k, v]) => [k, String(v)])
      ),
    });

    let response;
    try {
      response = await wpFetch(`${endpoint}?${params.toString()}`);
    } catch (error) {
      if (String(error.message).includes("rest_post_invalid_page_number")) {
        break;
      }
      throw error;
    }

    const batch = await response.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    rows.push(...batch);

    const totalPages = Number(
      response.headers.get("x-wp-totalpages") || page
    );

    if (page >= totalPages) break;
    page += 1;
  }

  return rows;
}

async function supabaseRequest(path, options = {}) {
  const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let body = null;

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    throw new Error(
      `Supabase ${response.status} em ${path}: ${
        typeof body === "string" ? body : JSON.stringify(body)
      }`
    );
  }

  return body;
}

async function upsert(table, rows, onConflict) {
  if (!rows?.length) return [];

  const query = new URLSearchParams();
  if (onConflict) query.set("on_conflict", onConflict);

  return supabaseRequest(
    `${table}${query.toString() ? `?${query.toString()}` : ""}`,
    {
      method: "POST",
      body: JSON.stringify(rows),
      prefer: "resolution=merge-duplicates,return=representation",
    }
  );
}

async function getByColumn(table, column, value) {
  const params = new URLSearchParams({
    select: "*",
    [column]: `eq.${value}`,
    limit: "1",
  });

  const result = await supabaseRequest(`${table}?${params.toString()}`, {
    method: "GET",
  });

  return Array.isArray(result) ? result[0] || null : null;
}

async function migrateCategories(wpCategories) {
  console.log(`\nCategorias: ${wpCategories.length}`);

  const categoryMap = new Map();

  for (let i = 0; i < wpCategories.length; i++) {
    const c = wpCategories[i];

    const payload = {
      nome: decodeHtml(c.name || c.slug || "Sem categoria"),
      slug: c.slug || `categoria-${c.id}`,
      cor: COLORS[i % COLORS.length],
      ordem: i + 1,
    };

    const result = await upsert("categorias", [payload], "slug");
    const saved =
      result?.[0] ||
      (await getByColumn("categorias", "slug", payload.slug));

    if (saved?.id) {
      categoryMap.set(c.id, saved.id);
    }

    console.log(`  ✓ ${payload.nome}`);
  }

  return categoryMap;
}

async function migrateAuthors(wpUsers) {
  console.log(`\nAutores: ${wpUsers.length}`);

  const authorMap = new Map();

  for (const user of wpUsers) {
    const emailFallback = `wp-${user.id}@vozdebrasilia.local`;

    const payload = {
      nome: decodeHtml(user.name || `Autor ${user.id}`),
      email: user.email || emailFallback,
      avatar:
        user?.avatar_urls?.["96"] ||
        user?.avatar_urls?.["48"] ||
        null,
      bio: stripHtml(user.description || ""),
      cargo: "Jornalista",
    };

    const result = await upsert("autores", [payload], "email");
    const saved =
      result?.[0] ||
      (await getByColumn("autores", "email", payload.email));

    if (saved?.id) {
      authorMap.set(user.id, saved.id);
    }

    console.log(`  ✓ ${payload.nome}`);
  }

  return authorMap;
}

async function ensureEmbeddedAuthor(post, authorMap) {
  if (authorMap.has(post.author)) return authorMap.get(post.author);

  const embedded = getEmbeddedAuthor(post);
  if (!embedded) return null;

  const email = `wp-${embedded.id || post.author}@vozdebrasilia.local`;

  const payload = {
    nome: decodeHtml(embedded.name || "TV Voz de Brasília"),
    email,
    avatar:
      embedded?.avatar_urls?.["96"] ||
      embedded?.avatar_urls?.["48"] ||
      null,
    bio: stripHtml(embedded.description || ""),
    cargo: "Jornalista",
  };

  const result = await upsert("autores", [payload], "email");
  const saved =
    result?.[0] || (await getByColumn("autores", "email", email));

  if (saved?.id) {
    authorMap.set(post.author, saved.id);
    return saved.id;
  }

  return null;
}

async function ensureEmbeddedCategory(post, categoryMap) {
  const categories = getEmbeddedCategories(post);

  for (const category of categories) {
    if (categoryMap.has(category.id)) {
      return categoryMap.get(category.id);
    }

    const payload = {
      nome: decodeHtml(category.name || "Sem categoria"),
      slug: category.slug || `categoria-${category.id}`,
      cor: COLORS[categoryMap.size % COLORS.length],
      ordem: categoryMap.size + 1,
    };

    const result = await upsert("categorias", [payload], "slug");
    const saved =
      result?.[0] ||
      (await getByColumn("categorias", "slug", payload.slug));

    if (saved?.id) {
      categoryMap.set(category.id, saved.id);
      return saved.id;
    }
  }

  return null;
}

async function migratePosts(posts, categoryMap, authorMap) {
  console.log(`\nPosts: ${posts.length}`);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  );

  let imported = 0;
  let errors = 0;

  for (let index = 0; index < sorted.length; index++) {
    const post = sorted[index];

    try {
      const embeddedCategories = getEmbeddedCategories(post);
      const categoryNames = embeddedCategories.map((x) => x.name);

      let categoryId = null;
      for (const wpCategoryId of post.categories || []) {
        if (categoryMap.has(wpCategoryId)) {
          categoryId = categoryMap.get(wpCategoryId);
          break;
        }
      }

      if (!categoryId) {
        categoryId = await ensureEmbeddedCategory(post, categoryMap);
      }

      const authorId = await ensureEmbeddedAuthor(post, authorMap);

      const tipo = isInterview(post, categoryNames)
        ? "entrevista"
        : "noticia";

      const payload = {
        titulo: decodeHtml(stripHtml(post?.title?.rendered || "")),
        slug: post.slug || `wp-${post.id}`,
        resumo: makeSummary(post),
        conteudo: post?.content?.rendered || "",
        imagem_capa: getFeaturedImage(post),
        categoria_id: categoryId,
        autor_id: authorId,
        destaque: index < 5,
        principal: index === 0,
        tipo,
        video_url: extractYoutubeUrl(post?.content?.rendered || ""),
        publicado_em: post.date_gmt
          ? `${post.date_gmt}Z`
          : post.date || new Date().toISOString(),
        criado_em: post.date_gmt
          ? `${post.date_gmt}Z`
          : post.date || new Date().toISOString(),
        atualizado_em: post.modified_gmt
          ? `${post.modified_gmt}Z`
          : post.modified || new Date().toISOString(),
      };

      await upsert("noticias", [payload], "slug");

      imported += 1;
      console.log(
        `  ✓ [${imported}/${posts.length}] ${payload.tipo}: ${payload.titulo}`
      );
    } catch (error) {
      errors += 1;
      console.error(
        `  ✗ Post ${post?.id || "?"}: ${error?.message || error}`
      );
    }
  }

  return { imported, errors };
}

async function tryFetchUsers() {
  try {
    return await fetchAllWp("/wp-json/wp/v2/users", {
      context: "view",
    });
  } catch (error) {
    console.warn(
      `Aviso: não foi possível listar /users. Vou usar os autores embutidos nos posts.\n${error.message}`
    );
    return [];
  }
}

async function tryFetchInterviewCpt() {
  try {
    const rows = await fetchAllWp("/wp-json/wp/v2/entrevistas", {
      _embed: "true",
    });
    return rows;
  } catch {
    return [];
  }
}

async function main() {
  assertConfig();

  console.log("==============================================");
  console.log(" MIGRAÇÃO WORDPRESS -> SUPABASE");
  console.log(" TV Voz de Brasília");
  console.log("==============================================");
  console.log(`WordPress: ${WP_BASE_URL}`);
  console.log(`Supabase:  ${SUPABASE_URL}`);

  console.log("\nBuscando dados do WordPress...");

  const [categories, users, posts, interviewCpt] =
    await Promise.all([
      fetchAllWp("/wp-json/wp/v2/categories"),
      tryFetchUsers(),
      fetchAllWp("/wp-json/wp/v2/posts", { _embed: "true" }),
      tryFetchInterviewCpt(),
    ]);

  const postById = new Map();
  for (const post of [...posts, ...interviewCpt]) {
    postById.set(`${post.type || "post"}:${post.id}`, post);
  }

  const allPosts = [...postById.values()];

  console.log(`Categorias encontradas: ${categories.length}`);
  console.log(`Autores encontrados:    ${users.length}`);
  console.log(`Posts encontrados:      ${posts.length}`);
  console.log(`Entrevistas CPT:        ${interviewCpt.length}`);
  console.log(`Total para migrar:      ${allPosts.length}`);

  const categoryMap = await migrateCategories(categories);
  const authorMap = await migrateAuthors(users);

  const result = await migratePosts(
    allPosts,
    categoryMap,
    authorMap
  );

  console.log("\n==============================================");
  console.log(" MIGRAÇÃO CONCLUÍDA");
  console.log("==============================================");
  console.log(`Importados: ${result.imported}`);
  console.log(`Erros:      ${result.errors}`);

  if (result.errors > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("\nERRO FATAL:");
  console.error(error);
  process.exit(1);
});
