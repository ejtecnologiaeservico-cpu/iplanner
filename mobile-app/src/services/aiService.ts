import { GoogleGenerativeAI } from "@google/generative-ai";

// O usuário deve fornecer a chave API, mas vou estruturar o serviço
const API_KEY = "YOUR_GEMINI_API_KEY"; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const transcribeImage = async (base64Image: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analise esta imagem de uma planilha de treino ou resultado de performance esportiva.
      Extraia os dados e formate-os como um objeto JSON estruturado com os seguintes campos se disponíveis:
      - nome_atleta
      - data
      - exercicios (lista com nome, series, repeticoes, intensidade, observacoes)
      - vo2_max
      - frequencia_cardiaca
      Retorne APENAS o JSON.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Tenta limpar e parsear o JSON
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erro na transcrição via IA:", error);
    throw error;
  }
};
