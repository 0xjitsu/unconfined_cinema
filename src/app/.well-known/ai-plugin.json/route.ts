export function GET() {
  const plugin = {
    schema_version: "v1",
    name_for_human: "The Unconfined Cinema",
    name_for_model: "unconfined_cinema",
    description_for_human:
      "A Filipino art collective designing immersive, unconventional spaces to experience film.",
    description_for_model:
      "Information about The Unconfined Cinema, a Filipino art collective. Access project details, collaborator information, and contact options.",
    api: {
      type: "openapi",
      url: "https://unconfinedcinema.art/llms.txt",
    },
    llms_txt: "https://unconfinedcinema.art/llms.txt",
    logo_url: "https://unconfinedcinema.art/icon.png",
    contact_email: "hello@unconfinedcinema.art",
    legal_info_url: "https://unconfinedcinema.art/about",
  };

  return Response.json(plugin, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
