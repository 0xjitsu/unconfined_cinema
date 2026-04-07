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
      url: "https://unconfinedcinema.com/llms.txt",
    },
    llms_txt: "https://unconfinedcinema.com/llms.txt",
    logo_url: "https://unconfinedcinema.com/icon.png",
    contact_email: "hello@unconfinedcinema.com",
    legal_info_url: "https://unconfinedcinema.com/about",
  };

  return Response.json(plugin);
}
