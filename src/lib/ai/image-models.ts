import "server-only";
import { openai } from "@ai-sdk/openai";

export const imageModels = {
  openai: {
    "gpt-image-1.5": openai.image("gpt-image-1.5"),
  },
};

const hiddenImageModels = new Set<string>([]);

export const imageModelProvider = {
  modelsInfo: Object.entries(imageModels).map(([provider, models]) => ({
    provider,
    models: Object.entries(models)
      .map(([name]) => ({
        name,
        hidden: hiddenImageModels.has(`${provider}/${name}`),
      }))
      .filter(m => !m.hidden),
    hasAPIKey: checkImageProviderAPIKey(provider as keyof typeof imageModels),
  })).filter(p => p.models.length > 0),
  getModel: (provider?: string, model?: string) => {
    if (!provider || !model) return imageModels.openai["gpt-image-1.5"];
    return imageModels[provider as keyof typeof imageModels]?.[model] || imageModels.openai["gpt-image-1.5"];
  },
};

function checkImageProviderAPIKey(provider: keyof typeof imageModels) {
  let key: string | undefined;
  switch (provider) {
    case "openai":
      key = process.env.OPENAI_API_KEY;
      break;
    default:
      return true;
  }
  return !!key && key !== "****";
}
